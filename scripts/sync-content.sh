#!/usr/bin/env bash
# Sync docs/scripts from source repos into content/.
# Usage: pnpm sync            -- skip topics whose git HEAD hasn't changed
#        FORCE=1 pnpm sync   -- resync everything regardless
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTENT_DIR="$SCRIPT_DIR/../content"
STATE_FILE="$SCRIPT_DIR/../.sync-state"
PROJECTS_DIR="${PROJECTS_DIR:-$HOME/Projects}"
FORCE="${FORCE:-0}"

declare -A SOURCES=(
  [ansible]="Ansible-playbook"
  [cloud]="Cloud"
  [database]="Database"
  [docker]="Docker"
  [kubernetes]="Kubernetes"
  [linux]="Linux"
  [virtualization]="Virtualization"
  [windows]="Windows"
)

TEXT_NAMES=(-iname "*.md" -o -iname "*.sh" -o -iname "*.bash" -o -iname "*.yaml"
  -o -iname "*.yml" -o -iname "*.json" -o -iname "*.toml" -o -iname "*.conf")
IMAGE_NAMES=(-iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg"
  -o -iname "*.gif" -o -iname "*.svg" -o -iname "*.webp")

# text renders inline as prose/code blocks and must stay small; images are served as-is
TEXT_MAX_SIZE="200k"
IMAGE_MAX_SIZE="5M"

RSYNC_INCLUDES=(
  --include="*/"
  --include="*.md"
  --include="*.sh" --include="*.bash"
  --include="*.yaml" --include="*.yml"
  --include="*.json"
  --include="*.toml"
  --include="*.conf"
  --include="*.png" --include="*.jpg" --include="*.jpeg"
  --include="*.gif" --include="*.svg" --include="*.webp"
  --exclude="*"
)

declare -A LAST=()
if [[ -f "$STATE_FILE" ]]; then
  while read -r t h; do LAST[$t]="$h"; done < "$STATE_FILE"
fi
declare -A NEXT=()

synced=0

for topic in $(printf '%s\n' "${!SOURCES[@]}" | sort); do
  src="$PROJECTS_DIR/${SOURCES[$topic]}"
  dst="$CONTENT_DIR/$topic"

  if [[ ! -d "$src" ]]; then
    printf "skip  %-16s not found: %s\n" "$topic" "$src"
    continue
  fi

  head=$(git -C "$src" rev-parse HEAD 2>/dev/null || true)
  NEXT[$topic]="${head}"
  last="${LAST[$topic]:-}"

  if [[ "$FORCE" == "0" && -n "$last" && "$last" == "$head" ]]; then
    printf "ok    %-16s up to date\n" "$topic"
    continue
  fi

  if [[ -n "$last" && -n "$head" && "$last" != "$head" ]]; then
    n=$(git -C "$src" rev-list --count "$last..$head" 2>/dev/null || echo "?")
    printf "sync  %-16s %s new commit(s)\n" "$topic" "$n"
    git -C "$src" diff --name-status "$last" "$head" -- . \
      | awk '/^[AMDR]/{
          if ($1~/^R/) print "       "$1" "$2" -> "$3
          else         print "       "$1" "$2
        }' || true
  else
    printf "sync  %-16s\n" "$topic"
  fi

  if git -C "$src" status --porcelain 2>/dev/null | grep -q .; then
    printf "warn  %-16s uncommitted changes not included\n" "$topic"
  fi

  mkdir -p "$dst"

  # --delete removes files gone from source (handles renames: old gone, new added)
  rsync -a --delete --prune-empty-dirs \
    --exclude=".git/" --exclude="node_modules/" \
    "${RSYNC_INCLUDES[@]}" \
    "$src/" "$dst/"

  # rsync can't filter by extension+size together, so prune oversize files after the fact
  find "$dst" -type f \( "${TEXT_NAMES[@]}" \) -size "+${TEXT_MAX_SIZE}" -delete
  find "$dst" -type f \( "${IMAGE_NAMES[@]}" \) -size "+${IMAGE_MAX_SIZE}" -delete
  find "$dst" -depth -type d -empty -delete

  # README.md -> index.md: rename if no index.md exists, else drop the README
  while IFS= read -r -d '' readme; do
    index="$(dirname "$readme")/index.md"
    if [[ -f "$index" ]]; then
      rm "$readme"
    else
      mv "$readme" "$index"
    fi
  done < <(find "$dst" -name "README.md" -print0)

  synced=$((synced + 1))
done

{
  for t in "${!NEXT[@]}"; do
    [[ -n "${NEXT[$t]:-}" ]] && printf '%s %s\n' "$t" "${NEXT[$t]}"
  done
} | sort > "$STATE_FILE"

printf '\n%d/%d topic(s) synced\n' "$synced" "${#SOURCES[@]}"

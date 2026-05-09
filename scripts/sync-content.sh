#!/usr/bin/env bash
# Sync markdown docs from Projects repos into content/
# Run: ./scripts/sync-content.sh
# Add to CI/CD: run before `next build`

set -e

PROJECTS_DIR="${PROJECTS_DIR:-/home/mdrony/Projects}"
CONTENT_DIR="$(dirname "$0")/../content"

declare -A TOPICS=(
  ["linux"]="Linux"
  ["docker"]="Docker"
  ["kubernetes"]="Kubernetes"
  ["database"]="Database"
  ["cloud"]="Cloud"
  ["windows"]="Windows"
  ["virtualization"]="Virtualization"
  ["ansible"]="Ansible-playbook"
  ["islam"]="Islam"
)

sync_topic() {
  local slug="$1"
  local src_dir="$PROJECTS_DIR/$2"
  local dest_dir="$CONTENT_DIR/$slug"

  if [ ! -d "$src_dir" ]; then
    echo "  [skip] $src_dir not found"
    return
  fi

  rm -rf "$dest_dir"
  mkdir -p "$dest_dir"

  rsync -a --exclude=".git" --exclude=".git/**" --include="*/" --include="*.md" --exclude="*" "$src_dir/" "$dest_dir/"

  # Remove any .git dirs that slipped through
  find "$dest_dir" -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true

  # Rename README.md → index.md at every level
  find "$dest_dir" -name "README.md" | while read f; do
    mv "$f" "$(dirname "$f")/index.md"
  done

  echo "  [ok] $slug ($(find "$dest_dir" -name '*.md' | wc -l) files)"
}

echo "Syncing content..."
mkdir -p "$CONTENT_DIR"

for slug in "${!TOPICS[@]}"; do
  sync_topic "$slug" "${TOPICS[$slug]}"
done

echo "Done."

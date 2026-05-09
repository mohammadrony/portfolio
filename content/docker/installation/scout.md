# Docker Scout

Installation

```bash
curl -LO https://raw.githubusercontent.com/docker/scout-cli/main/install.sh

sh install.sh
rm -f install.sh
```

## Commands

Quick view

```bash
docker scout quickview IMAGE:TAG
```

Vulnerabilities

```bash
docker scout cves IMAGE:TAG
```

Recommendation

```bash
docker scout recommendations IMAGE:TAG
```

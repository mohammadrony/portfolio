# Client Setup

## UI (Compass)

Installation

```bash
version=$(curl https://api.github.com/repos/mongodb-js/compass/releases/latest | jq -r .tag_name)
curl -LO https://downloads.mongodb.com/compass/mongodb-compass_${version}_amd64.deb
```

```bash
sudo apt install -y mongodb-compass_*_amd64.deb
```

Commands

```bash
mongodb-compass
```

## CLI

Installation

```bash
version=$(curl https://api.github.com/repos/mongodb-js/mongosh/releases/latest | jq -r .tag_name)
curl -LO https://downloads.mongodb.com/compass/mongodb-mongosh_${version}_amd64.deb

```bash
sudo apt install -y mongodb-mongosh_*_amd64.deb
```

Commands

```bash
mongosh
```

```bash
mongosh mongodb://127.0.0.1:27017/
```

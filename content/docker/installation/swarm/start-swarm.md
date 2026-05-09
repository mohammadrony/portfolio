# Start Swarm

## Installation

```bash
curl -L https://get.docker.com -o install.sh

sh install.sh
rm -f install.sh
sudo usermod -aG docker $USER
newgrp docker
```

## Start Manager

```bash
docker swarm init --advertise-addr <manager-ip>
```

```bash
docker swarm join-token manager
```

## Join Manager

```bash
docker swarm join --token <token> <manager-ip>:2377
```

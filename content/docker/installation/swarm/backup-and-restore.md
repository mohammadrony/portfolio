# Backup and Restore

## Backup

Backup swarm state and related files

```bash
cd /var/lib/docker/
sudo tar -cvzf swarm.tar.gz swarm
```

## Restore

Stop service

```bash
sudo systemctl stop docker.socket
sudo systemctl stop docker
```

Backup folder

```bash
sudo mv /var/lib/docker/swarm /var/lib/docker/swarm-bak
```

Restore files

```bash
sudo mkdir /var/lib/docker/swarm
sudo tar -xvzf swarm.tar.gz -C /var/lib/docker/swarm --strip-components=1
```

Start docker service

```bash
sudo systemctl start docker
```

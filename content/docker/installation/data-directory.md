# Data Directory

Check root directory

```bash
docker info | grep -i "root dir"
```

Create directory

```bash
sudo mkdir -p /appdata/docker
```

Copy files

```bash
sudo rsync -aP /var/lib/docker/ /appdata/docker/
```

Update configuration

```bash
sudo vi /etc/docker/daemon.json
```

```json
{
  "data-root": "/appdata/docker"
}
```

Restart service

```bash
sudo systemctl restart docker.socket
sudo systemctl restart docker.service
```

Check status

```bash
sudo systemctl status docker.socket
sudo systemctl status docker.service
```

Check root directory

```bash
docker info | grep -i "root dir"
```

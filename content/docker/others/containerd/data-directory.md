# Data Directory

Create directory

```bash
sudo mkdir -p /appdata/containerd/
```

Copy files

```bash
sudo rsync -aP /var/lib/containerd/ /appdata/containerd/
```

Update configuration

```bash
sudo sed -i 's/^\(root = \)".*"/\1"\/appdata\/containerd"/' /etc/containerd/config.toml
```

```bash
cat /etc/containerd/config.toml | grep "/appdata/containerd"
```

Restart service

```bash
sudo systemctl restart containerd
```

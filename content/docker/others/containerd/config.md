# Containerd Config

```bash
sudo crictl config --list
```

```bash
sudo vi /etc/crictl.yaml
```

```yaml
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
```

```bash
sudo systemctl restart containerd
```

```bash
sudo crictl config --list
```

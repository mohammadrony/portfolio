# CRI-O Config

```bash
sudo crictl config --list
```

```bash
sudo vi /etc/crictl.yaml
```

```yaml
runtime-endpoint: unix:///run/crio/crio.sock
image-endpoint: unix:///run/crio/crio.sock
```

```bash
sudo crictl config --list
```

# Clear Space

## cri-purge

[github reference](https://github.com/reefland/cri-purge)

```bash
wget https://raw.githubusercontent.com/reefland/cri-purge/master/cri-purge.sh
chmod 750 cri-purge.sh
./cri-purge.sh -h
```

Purge image

```bash
sudo ./cri-purge.sh -dp
sudo ./cri-purge.sh -p
```

Purge dangling

```bash
sudo ./cri-purge.sh -dpd
sudo ./cri-purge.sh -pd
```

Check space

```bash
df -h | head
```

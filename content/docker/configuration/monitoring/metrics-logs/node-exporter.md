# Node Exporter

```bash
version=1.8.0 # https://github.com/prometheus/node_exporter/releases
wget https://github.com/prometheus/node_exporter/releases/download/v${version}/node_exporter-${version}.linux-amd64.tar.gz

tar -xvzf node_exporter-${version}.linux-amd64.tar.gz
sudo mv node_exporter-${version}.linux-amd64/node_exporter /usr/local/bin/
rm node_exporter-${version}.linux-amd64.tar.gz
rm node_exporter-${version}.linux-amd64 -rf
```

```bash
sudo useradd -rs /bin/false node_exporter
```

Start service

```bash
sudo tee /etc/systemd/system/node_exporter.service<<EOF
[Unit]
Description=Node Exporter
After=network.target
 
[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --path.procfs=/proc --path.sysfs=/sys --collector.filesystem.ignored-mount-points="^/(sys|proc|dev|host|etc)($|/)"

[Install]
WantedBy=multi-user.target
EOF
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now node_exporter
```

```bash
sudo systemctl status node_exporter
```

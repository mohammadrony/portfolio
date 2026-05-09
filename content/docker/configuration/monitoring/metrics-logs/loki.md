# Loki

- [Docker Log Monitoring](https://gist.github.com/ruanbekker/c6fa9bc6882e6f324b4319c5e3622460)

Install log driver

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

```bash
docker plugin ls
```

```bash
sudo tee -a /etc/docker/daemon.json << EOF
{
  "log-driver": "loki",
  "log-opts": {
    "loki-url": "http://loki:3100/loki/api/v1/push",
    "loki-batch-size": "400",
    "loki-retries": "5",
    "max-file": "5",
    "max-size": "10m"
  }
}
EOF

sudo systemctl restart docker
```

Check log driver

```bash
docker info --format '{{.LoggingDriver}}'
```

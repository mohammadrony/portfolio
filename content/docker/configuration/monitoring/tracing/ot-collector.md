# Opentelemetry Collector

[Install the Collector](https://opentelemetry.io/docs/collector/installation/)

```bash
sudo apt-get update
sudo apt-get -y install wget systemctl
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.104.0/otelcol_0.104.0_linux_amd64.deb
sudo dpkg -i otelcol_0.104.0_linux_amd64.deb
```

```bash
sudo systemctl enable --now otelcol
```

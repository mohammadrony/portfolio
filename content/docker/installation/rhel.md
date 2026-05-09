# Redhat Linux

[Installation guide](https://docs.docker.com/engine/install/centos/)

## TL;DR

```bash
curl -L https://get.docker.com -o install.sh

sh install.sh
rm -f install.sh
sudo usermod -aG docker $USER
newgrp docker
```

## Uninstall old versions

```bash
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

## Install with RPM package manager

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Start Docker

```bash
sudo systemctl enable --now docker
```

Check docker installation

```bash
sudo systemctl status docker
docker -v
```

Update user group to run commands

```bash
sudo usermod -aG docker $USER
```

```bash
newgrp docker
```

Test installation

```bash
docker run hello-world
```

## Install using script

```bash
curl -L https://get.docker.com -o install.sh

sh install.sh
rm -f install.sh
sudo usermod -aG docker $USER
newgrp docker
```

## Uninstall Docker Engine

```bash
sudo yum remove docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

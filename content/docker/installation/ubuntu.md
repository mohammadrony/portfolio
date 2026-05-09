# Ubuntu

[Installation guide](https://docs.docker.com/engine/install/ubuntu/)

## TL;DR

```bash
curl -L https://get.docker.com -o install.sh

sh install.sh
rm -f install.sh
sudo usermod -aG docker $USER
newgrp docker
```

```bash
sudo apt-mark hold docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

## Uninstall old versions

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

## Install with APT package manager

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor --yes -o /etc/apt/trusted.gpg.d/docker.gpg
sudo add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

```bash
sudo apt update
```

Install docker

```bash
apt-cache policy docker-ce
sudo apt install -y docker-ce
```

Start docker

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
sudo apt-mark unhold docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

```bash
sudo apt purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

```bash
sudo rm -rf /etc/docker
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

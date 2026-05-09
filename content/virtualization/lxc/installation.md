# Linux Containers Installation

## Insall package

```bash
sudo snap install lxd
```

```bash
sudo usermod -aG lxd $USER
sudo chmod 777 /var/snap/lxd/common/lxd/unix.socket
```

## Initial setup

```bash
lxd init
lxd init --minimal
cat lxd-config.yaml | sudo lxd init --preseed
```

Images

```bash
lxc remote list
```

```bash
lxc image info ubuntu:lts
```

```bash
lxc image list ubuntu:22.04
lxc image list ubuntu:24.04
lxc image list images:centos
```

## Launch container

```bash
sudo lxc launch images:centos/9-Stream centos-9
```

```bash
sudo lxc launch ubuntu:24.04 ubuntu-24
```

Container Info

```bash
lxc list
```

```bash
lxc info ubuntu-24
```

```bash
lxc stop
```

## Login to container

Shell login

```bash
lxc shell ubuntu-24
```

Run commands

```bash
lxc exec ubuntu-24 -- bash
```

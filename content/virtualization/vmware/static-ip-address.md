# Static IP Address

Configure static IP address using Netplan.

## Ubuntu

Edit netplan configuration

```bash
sudo vi /etc/netplan/50-cloud-init.yaml
```

```yaml
network:
  version: 2
  ethernets:
    ens160:
      dhcp4: false
      addresses: 
        - 192.168.1.101/24
      nameservers:
        addresses: 
          - 8.8.8.8
          - 8.8.4.4
      routes:
        - to: default
          via: 192.168.1.1
```

Apply changes

```bash
sudo netplan apply
```

Verify configuration

```bash
ip addr show ens160
```

```bash
ip route
```

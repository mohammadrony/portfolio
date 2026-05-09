# Troubleshoot

## Service failed

Stop service and process

```bash
sudo /etc/init.d/mysql stop
sudo systemctl stop mysql
sudo killall -KILL mysql mysqld_safe mysqld
```

Start service

```bash
sudo /etc/init.d/mysql start
sudo systemctl start mysql
```

## Clean Install

Backup database before cleanup

```bash
sudo apt autoremove --purge mysql-server\* mariadb-server\*
sudo rm -rf /var/lib/mysql
sudo rm -rf /etc/mysql/
```

Re-install

```bash
sudo mkdir -p /etc/mysql/conf.d
sudo apt install -y mysql-server
```

# Restore Database Files

## Setup Postgres in Ubuntu

Install Postgres 16 and 17

```bash
sudo sh -c 'echo "deb [arch=amd64] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo wget -O /etc/apt/trusted.gpg.d/postgresql.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo apt update; sudo apt upgrade -y
sudo apt install -y postgresql-16 postgresql-17
```

## Restore Database From Archive

Download database archive file

```bash
scp user@host:~/mydb-data.tar.gz ./
```

Copy database file

```bash
tar -xvzf mydb-data.tar.gz
cd ./postgresql
sudo cp 16 /var/lib/postgresql/ -r
sudo cp 17 /var/lib/postgresql/ -r
```

Update file permissions

```bash
cd /var/lib/postgresql/
sudo chown postgres:postgres -R ./
```

Restart database service

```bash
sudo systemctl restart postgresql
sudo systemctl status postgresql
```

## Merge Multiple Cluster

List available cluster

```bash
pg_ctlcluster 16 main start
```

```bash
sudo pg_lsclusters
```

Upgrade cluster version

```bash
sudo pg_dropcluster 17 main --stop
sudo pg_upgradecluster 16 main
sudo pg_dropcluster 16 main
```

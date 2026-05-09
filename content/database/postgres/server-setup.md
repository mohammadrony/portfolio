# Server Setup

Update following values:

- Username: `user_name`
- Password: `strong_password`
- Database: `database_name`
- Schema: `schema_name`

## Database setup

```bash
sudo sh -c 'echo "deb [arch=amd64] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo wget -O /etc/apt/trusted.gpg.d/postgresql.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo apt update; sudo apt -y upgrade
sudo apt install -y postgresql-17
```

```bash
sudo apt-mark hold postgresql-17 postgresql-client-17 postgresql-client-common postgresql-common
```

### Update configuration

Allow external application connection

```bash
sudo cp /etc/postgresql/17/main/postgresql.conf /etc/postgresql/17/main/postgresql.conf.orig
sudo vi /etc/postgresql/17/main/postgresql.conf
```

```conf
data_directory = '/var/lib/postgresql/17/main'
listen_addresses = '*'
max_connections = 100
port = 5432
```

Or

```bash
sudo sed -i "s/#listen_addresses.*/listen_addresses = '*'/" /etc/postgresql/17/main/postgresql.conf
```

Allow other external clients

```bash
sudo cp /etc/postgresql/17/main/pg_hba.conf /etc/postgresql/17/main/pg_hba.conf.orig
sudo vi /etc/postgresql/17/main/pg_hba.conf
```

```conf
host    all             all             0.0.0.0/0               md5
```

Or

```bash
sudo tee -a /etc/postgresql/17/main/pg_hba.conf << EOF
host    all             all             0.0.0.0/0               md5
EOF
```

Update firewall

```bash
sudo ufw allow 5432/tcp
# sudo systemctl disable --now ufw
```

Restart service

```bash
sudo systemctl restart postgresql
sudo systemctl status postgresql
```

```bash
sudo pg_lsclusters
```

```bash
sudo -i -u postgres psql
```

```sql
CREATE USER user_name WITH PASSWORD 'strong_password';
ALTER USER user_name WITH SUPERUSER CREATEROLE CREATEDB;
```

```sql
CREATE DATABASE database_name
  WITH
  OWNER = user_name
  ENCODING = 'UTF8'
  LOCALE_PROVIDER = 'libc'
  CONNECTION LIMIT = -1
  IS_TEMPLATE = False;
```

```sql
ALTER DATABASE database_name OWNER TO user_name;
GRANT ALL PRIVILEGES ON DATABASE database_name TO user_name;
GRANT ALL PRIVILEGES ON SCHEMA schema_name TO user_name;
\q
```

### Remove postgresql packages

```bash
sudo apt purge -y postgresql-17 postgresql-client-17
```

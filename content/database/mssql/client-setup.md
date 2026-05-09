# MSSQL Client Setup

- [Install the SQL Server command-line tools](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools)

## Install sqlcmd

CentOS 8

```bash
# sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
```

```bash
sudo yum install sqlcmd
```

Ubuntu 22

```bash
sudo curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/22.04/prod.list)"
```

```bash
sudo apt update
sudo apt install -y sqlcmd
```

## Install mssql-tools

CentOS 8

```bash
# sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
```

```bash
sudo yum install -y mssql-tools18 unixODBC-devel
```

```bash
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
source ~/.bashrc
```

Ubuntu 22

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

```bash
sudo apt update
sudo apt install -y mssql-tools18 unixodbc-dev
```

```bash
# Update ~/.bashrc and ~/.zshrc file.
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.zshrc
```

```bash
source ~/.zshrc
```

Docker

```bash
docker run -it --rm --name mssql-tools mcr.microsoft.com/mssql-tools bash
```

## Connect Database Server

```bash
sqlcmd -C -S IP_ADDRESS -U USER -P 'PASSWORD'
```

*Update `IP_ADDRESS`, `USER` and `PASSWORD` with real value.*

See database version

```sql
SELECT @@VERSION;
GO
```

Backup database

```sql
sqlcmd -S localhost -U 'user' -P 'password' -d master \
   -Q "BACKUP DATABASE dbname TO DISK = N'/data/path/' WITH NOFORMAT, INIT, COMPRESSION, NAME = 'dbname-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
```

Restore database

```sql
sqlcmd -S localhost -U 'user' -P 'password' -d master \
   -Q "RESTORE DATABASE dbname FROM DISK='/data/path/dbname.bak' WITH MOVE 'dbname' TO '/.../mssql/data/dbname.mdf', MOVE 'dbname_log' TO '/.../mssql/data/dbname_log.ldf'"

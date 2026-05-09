# Postgres Client Setup

## Installation

Ubuntu

```bash
sudo apt install -y postgresql-client
```

Amazon EC2 2023

```bash
sudo yum install -y postgresql15.x86_64
```

## PSQL Commands

Running as postgres user

```bash
sudo -i -u postgres
# sudo --login --user postgres
```

Command format

```bash
PGPASSWORD=PASSWORD psql -h HOST -p PORT -U USERNAME -d DATABASE --no-password
```

```bash
psql -h HOST -p PORT -U USERNAME -d DATABASE --password
# Password:
```

```bash
psql postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

## Usage

Connect to shell

```bash
psql -h localhost -p 5432 -U postgres -d postgres --password
# Password:
```

Run query command

```bash
psql -h localhost -p 5432 -U postgres -d postgres -c 'QUERY'
psql -h localhost -p 5432 -U postgres -d postgres --command='QUERY'
```

Run query file

```bash
psql -h localhost -p 5432 -U postgres -d postgres -f FILENAME
```

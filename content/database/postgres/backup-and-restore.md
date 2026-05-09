# Backup and Restore

## Backup Database

```bash
PGPASSWORD=PASSWORD pg_dump -h HOST -p PORT -U USERNAME -f FILENAME DATABASE --no-password -Fc
```

```bash
pg_dump -h HOST -p PORT -U USERNAME -f FILENAME DATABASE -Fc --password
# Password:
```

Example

```bash
# sql format
pg_dump -U postgres -f FILENAME.sql DATABASE
```

```bash
# custom format
pg_dump -U postgres -f FILENAME.dump DATABASE -Fc
```

```bash
# tar format
pg_dump -U postgres -f FILENAME.tar DATABASE -Ft
```

```bash
# no password
pg_dump -U postgres -f FILENAME.tar DATABASE -w -Ft
```

Backup command

```bash
HOST=127.0.0.1
PORT=5432
DATABASE=mydb
USERNAME=postgres
PASSWORD='your_password'
FILENAME=${DATABASE}.tar

PGPASSWORD=${PASSWORD} pg_dump -h ${HOST} -p ${PORT} -U ${USERNAME} -f ${FILENAME} ${DATABASE} --no-password -Ft
```

Backup script

```bash
DATABASE=mydb
USERNAME=postgres
BACKUP_DIR=/backups/db
POSTGRES_HOME=/var/lib/postgresql
TIMESTAMP=`date +%d%m%y_%H%M`
FILENAME=${DATABASE}-${TIMESTAMP}.tar

su ${USERNAME} bash -c "pg_dump -f ${POSTGRES_HOME}/${FILENAME} ${DATABASE} --no-password -Ft"
mv ${POSTGRES_HOME}/${FILENAME} $BACKUP_DIR
```

## Restore Database

```bash
PGPASSWORD=PASSWORD pg_restore -h HOST -p PORT -U USERNAME -d DATABASE --no-password FILENAME
PGPASSWORD=PASSWORD pg_restore -h HOST -p PORT -U USERNAME -d DATABASE --no-password FILENAME -C # create database
PGPASSWORD=PASSWORD pg_restore -h HOST -p PORT -U USERNAME -d DATABASE --no-password FILENAME -c # clear existing tables first
```

```bash
pg_restore -h HOST -p PORT -U USERNAME -d DATABASE --password
# Password:
```

```bash
pg_restore --help
```

Example

```bash
# sql file
psql -d DATABASE -U postgres < FILENAME.sql
```

```bash
# tar file
pg_restore -d DATABASE -U postgres -C FILENAME.tar
```

Restore command

```bash
HOST=127.0.0.1
PORT=5432
DATABASE=mydb
USERNAME=postgres
PASSWORD='your_password'
FILENAME=${DATABASE}.tar

PGPASSWORD=${PASSWORD} pg_restore -h ${HOST} -p ${PORT} -U ${USERNAME} -d ${DATABASE} -C ${FILENAME} --no-password
```

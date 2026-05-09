# Backup and Restore

## Options

mysqldump

- `-h 127.0.0.1`
- `-P 3306`
- `-u root`
- `-p`
- `dbname`
- `table`

mysql

- `-h 127.0.0.1`
- `-P 3306`
- `-u root`
- `-p`
- `dbname`
- `-t table`

## Backup Database

All database

```bash
mysqldump -u username -p --all-databases > alldb.sql
```

Single database

```bash
mysqldump -u username -p dbname > dbname.sql
```

Table of database

```bash
mysqldump -u username -p dbname table1 table2 > table_backup.sql
```

Gzip backup

```bash
mysqldump -u username -p dbname | gzip > backup.sql.gz
```

## Restore Database

All database

```bash
mysql -u username -p < alldb.sql
```

Single database

```bash
mysql -u username -p dbname < dbname.sql
```

Gzip restore

```bash
gunzip backup.sql.gz
```

```bash
mysql -u username -p dbname < backup.sql
```

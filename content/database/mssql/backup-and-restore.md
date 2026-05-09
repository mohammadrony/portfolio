# Database Backup and Restore

- [Restore database from database files](./db-location.md#change-location).

## Commonly Used Values

Data Directory

- Linux: `/var/opt/mssql/data`

## Backup Database

Backup cronjob

```bash
db_host=127.0.0.1
db_user=sa
db_pass=password
databases=(foo bar)

DAY=`date +%A`
HOUR=$(( $(date +%H) % 2 ))
TIMESTAMP=`date +%d-%b-%Y`

for database in ${databases[@]}; do
  /usr/bin/sqlcmd -C -S ${db_host} -U ${db_user} -P "${db_pass}" -d master \
  -Q "BACKUP DATABASE ${database} TO DISK = N'${database}-${DAY}.BAK' WITH NOFORMAT, INIT, COMPRESSION, NAME = '${database}-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
done
```

Backup command

```bash
db_host=127.0.0.1
db_user=sa
db_pass=password
database=foo

sqlcmd -C -S ${db_host} -U ${db_user} -P "${db_pass}" -d master \
  -Q "BACKUP DATABASE ${database} TO DISK = N'${database}.BAK' WITH NOFORMAT, INIT, COMPRESSION, NAME = '${database}-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
```

## Restore Database

Linux

```bash
db_host=127.0.0.1
database=foo
db_user=sa
db_pass=password
db_path=/var/opt/mssql/data
backup_path=/var/opt/mssql/backups

sqlcmd -C -S ${db_host} -U ${db_user} -P "${db_pass}" -d master \
-Q "ALTER DATABASE ${database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE
RESTORE DATABASE ${database} FROM  DISK = N'${backup_path}/${database}.BAK' WITH  FILE = 1,  MOVE N'${database}' TO N'${db_path}/${database}.mdf',  MOVE N'${database}_log' TO N'${db_path}/${database}_log.ldf',  NOUNLOAD,  REPLACE,  STATS = 5
ALTER DATABASE ${database} SET MULTI_USER"
```

Windows

```sql
DECLARE @BasePath NVARCHAR(255) = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\' -- sql server 22
DECLARE @BackupPath NVARCHAR(255) = @BasePath + N'Backup\'
DECLARE @DataPath NVARCHAR(255) = @BasePath + N'DATA\'
DECLARE @DatabaseName NVARCHAR(255)
DECLARE @SQL NVARCHAR(MAX)

DECLARE db_cursor CURSOR FOR
SELECT name 
FROM sys.databases 
WHERE name IN ('mydb1', 'mydb2')

OPEN db_cursor
FETCH NEXT FROM db_cursor INTO @DatabaseName

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @SQL = '
    USE [master];
    ALTER DATABASE [' + @DatabaseName + '] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    
    RESTORE DATABASE [' + @DatabaseName + ']
    FROM DISK = N''' + @BackupPath + @DatabaseName + '.BAK'' WITH RESTRICTED_USER, FILE = 1,
    MOVE N''' + @DatabaseName + ''' TO N''' + @DataPath + @DatabaseName + '.mdf'',
    MOVE N''' + @DatabaseName + '_log'' TO N''' + @DataPath + @DatabaseName + '_log.ldf'',
    NOUNLOAD, REPLACE, STATS = 5;
    
    ALTER DATABASE [' + @DatabaseName + '] SET MULTI_USER;'

    EXEC sp_executesql @SQL
    PRINT 'Restored database: ' + @DatabaseName
    FETCH NEXT FROM db_cursor INTO @DatabaseName
END

CLOSE db_cursor
DEALLOCATE db_cursor
GO
```

## Monitor Progress

Backup and restore progress

```sql
SELECT 
   session_id as SPID, command, a.text AS Query, start_time, percent_complete,
   dateadd(second,estimated_completion_time/1000, getdate()) as estimated_completion_time
FROM sys.dm_exec_requests r 
   CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) a 
WHERE r.command in ('BACKUP DATABASE','RESTORE DATABASE') 
```

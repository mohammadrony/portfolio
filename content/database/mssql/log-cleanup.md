# Cleanup Database logs

```sql
sqlcmd -H host -U user -P 'password'
```

Find recovery model

```sql
select NAME, RECOVERY_MODEL_DESC FROM sys.databases
GO
```

```sql
SELECT NAME, LOG_REUSE_WAIT_DESC FROM sys.databases
GO
```

```sql
DBCC SQLPERF(LOGSPACE)
DBCC LOGINFO
GO
```

```sql
SELECT NAME FROM SYS.MASTER_FILES WHERE type_desc = 'LOG'
GO
```

For SIMPLE recovery model

```sql
-- optional
BACKUP LOG dbname TO mypath
go
```

```sql
USE dbname
DBCC SHRINKFILE (dbname_log, 1)
GO
```

For FULL recovery model

```sql
USE dbname
ALTER DATABASE dbname SET RECOVERY SIMPLE
DBCC SHRINKFILE (dbname_log, 1)
ALTER DATABASE dbname SET RECOVERY FULL
GO
```

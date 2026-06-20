# Database Connections

Connection number

```sql
SELECT
    DB_NAME(dbid) as DBName,
    COUNT(dbid) as NumberOfConnections,
    loginame as LoginName
FROM
    sys.sysprocesses
WHERE
    dbid > 0
GROUP BY
    dbid, loginame;
```

Close connections

```sql
USE master;
GO
DECLARE @kill varchar(8000) = '';
SELECT @kill = @kill + 'kill ' + CONVERT(varchar(5), session_id) + ';'
FROM sys.dm_exec_sessions
WHERE database_id  = db_id('mydb')

EXEC(@kill);
```

```sql
ALTER DATABASE mydb SET SINGLE_USER WITH ROLLBACK IMMEDIATE
```

Allow connections

```sql
ALTER DATABASE mydb SET MULTI_USER
```

```sql
SELECT DATABASEPROPERTYEX('mydb','UserAccess')
```

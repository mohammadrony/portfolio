# User Management

## Create User and Schema

## Update Password

Change password for `sa` user

```sql
ALTER LOGIN [sa] WITH DEFAULT_DATABASE=[master]
GO
USE [master]
GO
ALTER LOGIN [sa] WITH PASSWORD=N'newpassword'
GO
```

## Reset Password

Reset password for `sa` user

```bash
sudo systemctl stop mssql-server
```

```bash
sudo /opt/mssql/bin/mssql-conf set-sa-password
# Enter password:
```

```bash
sudo systemctl start mssql-server
```

## Backup User

```sql
USE [master]
GO
CREATE LOGIN [backup] WITH PASSWORD=N'password', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON
GO


DECLARE @DatabaseName NVARCHAR(255)
DECLARE @SQL NVARCHAR(MAX)

DECLARE db_cursor CURSOR FOR
SELECT name FROM sys.databases
WHERE name IN ('mydb1', 'mydb2')

OPEN db_cursor
FETCH NEXT FROM db_cursor INTO @DatabaseName

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @SQL = '
    USE [' + @DatabaseName + ']
    CREATE USER [backup] FOR LOGIN [backup]
    ALTER ROLE [db_backupoperator] ADD MEMBER [backup]
    ALTER ROLE [db_denydatareader] ADD MEMBER [backup]
    ALTER ROLE [db_denydatawriter] ADD MEMBER [backup]'

    EXEC sp_executesql @SQL
    FETCH NEXT FROM db_cursor INTO @DatabaseName
END

CLOSE db_cursor
DEALLOCATE db_cursor
```

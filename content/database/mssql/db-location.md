# Database Location

[Listing information about all database files in SQL Server](https://stackoverflow.com/questions/9630279/listing-information-about-all-database-files-in-sql-server)

## Get File Status

```sql
SELECT
    db.name AS DBName,
    type_desc AS FileType,
    Physical_Name AS Location
FROM
    sys.master_files mf
INNER JOIN
    sys.databases db ON db.database_id = mf.database_id
```

List database location and size

```sql
SELECT
    db.name AS                                   [Database Name],
    mf.name AS                                   [Logical Name],
    mf.type_desc AS                              [File Type],
    mf.physical_name AS                          [Path],
    CAST(
        (mf.Size * 8
        ) / 1024.0 AS DECIMAL(18, 1)) AS         [Initial Size (MB)],
    'By '+IIF(
            mf.is_percent_growth = 1, CAST(mf.growth AS VARCHAR(10))+'%', CONVERT(VARCHAR(30), CAST(
        (mf.growth * 8
        ) / 1024.0 AS DECIMAL(18, 1)))+' MB') AS [Autogrowth],
    IIF(mf.max_size = 0, 'No growth is allowed', IIF(mf.max_size = -1, 'Unlimited', CAST(
        (
                CAST(mf.max_size AS BIGINT) * 8
        ) / 1024 AS VARCHAR(30))+' MB')) AS      [MaximumSize]
FROM
     sys.master_files AS mf
     INNER JOIN sys.databases AS db ON
            db.database_id = mf.database_id
```

## Change Location

detach database files

```sql
USE master;
GO
EXEC sp_detach_db 'mydb', 'true';
GO
```

Using available files

```sql
USE master;
GO
CREATE DATABASE mydb ON
(FILENAME = '/var/opt/mssql/data/mydb.mdf'),
(FILENAME = '/var/opt/mssql/data/mydb_log.ldf')
FOR ATTACH;
GO
```

Without log file

```sql
USE master;
GO
CREATE DATABASE mydb ON
(FILENAME = '/var/opt/mssql/data/mydb.mdf')
FOR ATTACH;
GO

ALTER DATABASE mydb
MODIFY FILE (NAME = mydb, FILENAME = '/var/opt/mssql/data/mydb.ldf');
GO
```

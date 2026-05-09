# Database and Schema

Create Database

```sql
CREATE DATABASE <dbname>;
GO
```

```sql
USE master;
GO

-- Create database with custom file locations
-- Default: /var/opt/mssql/data/
CREATE DATABASE <dbname>
ON PRIMARY
(
    NAME = <dbname>_dat,
    FILENAME = '/var/opt/mssql/data/<dbname>.mdf',
    SIZE = 10MB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 5MB
)
LOG ON
(
    NAME = <dbname>_log,
    FILENAME = '/var/opt/mssql/log/<dbname>_log.ldf',
    SIZE = 5MB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 1MB
);
GO
```

# Database Mirroring

Guides

- [SQL server mirroring](https://stackoverflow.com/questions/11032937/how-to-resolve-error-1418-in-sql-server-while-mirroring/11049634)
- [MS SQL Server Database mirroring](https://www.youtube.com/watch?v=unufO3gBXVg)

Steps

- Change Database Port from SQL server configuration manager.
  - SQL Server Network Configuration
  - Protocols for MSSQLSERVER
  - TCP/IP Properties
  - IP Addresses > IPAll
  - TCP Port > 1434 > Apply
  - SQL Server Services
  - SQL Server > Restart

- Take backup from main database.

  ```sql
  BACKUP DATABASE [dbname] TO DISK='dbname.bak' -- WITH NOFORMAT, INIT, COMPRESSION, NAME = 'dbname', SKIP, NOREWIND, NOUNLOAD, STATS = 10
  BACKUP LOG [dbname] TO DISK='dbname.trn' -- WITH FORMAT, INIT, SKIP, NAME = 'dbname-log', NOREWIND, NOUNLOAD, STATS = 10
  ```

- Copy file to mirror server

  ```bash
  scp dbname.bak Administrator@vm.ip.addr:.\
  ```

- Take database offline.

  ```sql
  ALTER DATABASE [dbname] SET OFFLINE
  ```

- Restore database in mirror database with **no recovery**.

  ```sql
  USE [master]
  GO
  ALTER DATABASE [dbname] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
  RESTORE DATABASE [dbname] FROM DISK = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Backup\dbname\dbname.bak' WITH  FILE = 1, NORECOVERY, NOUNLOAD,  REPLACE, STATS = 5
  RESTORE LOG [dbname] FROM DISK = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Backup\dbname\dbname.trn' WITH  FILE = 1, NORECOVERY, NOUNLOAD,  STATS = 5
  ```

- Configure mirroring from principal database server.
  - Bring Database Online
  - Database > Tasks > Mirror
  - Configure Security
    - Witness server instance: 'No'.
    - Select Principal server port.
    - Connect Mirror server and select listener port.
    - Finish and Start Mirroring
  - Select Operating mode (Select any of following 2 mode)
    - High performance (asynchronous).
    - Select High safety without automatic failover (synchronous).
  - Complete.

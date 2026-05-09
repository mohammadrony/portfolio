# Database Configuration

## Create Container Database

[DBCA guide](https://docs.oracle.com/cd/B16254_01/doc/server.102/b14196/install003.htm)
[guide 2](https://docs.oracle.com/en/database/oracle/oracle-database/19/racpd/create-oracle-rac-database-dbca.html)

Using ORACLE_HOME variable

```bash
version=19 #21 23
export ORACLE_HOME=/u01/app/oracle/product/${version}.0.0/dbhome_1
```

Create Container Database using following steps:

- Open Database Configuration Assistant (DBCA)
  - Available command: `dbca`
- Database Operation: Create a database
- Creation Mode: Advanced configuration
- Deployment Type:
  - Database type: Oracle Single Instance database
  - Template name: General Purpose or Transaction Processing
- Database Identification:
  - Global database name: `database_name`
  - SID: `database_sid`
  - Create as Container database
  - Number of PDBs: 1
  - PDB name: `database_pdb`
- Storage Option: Use template file for database storage attribute
- Fast Recovery (FRA) Option:
  - Recommendation:
    - Size: **2-10 times of database size**
    - Location: Separate Storage disk.
  - Check FRA size:
    - `SHOW PARAMETER db_recovery_file_dest;`
    - `SELECT name, space_limit , space_used FROM v$recovery_file_dest`
  - Set FRA:
    - Set Destination size: `ALTER SYSTEM SET db_recovery_file_dest_size = 10G SCOPE = BOTH`
    - Set Location: `ALTER SYSTEM SET db_recovery_file_dest = '/db_backup' SCOPE = BOTH`
  - Disale FRA:
    - Destination: `ALTER SYSTEM SET db_recovery_file_dest = '' SCOPE = BOTH`
    - Size: `ALTER SYSTEM SET db_recovery_file_dest_size = 1 SCOPE = BOTH`
- Network Configuration: Select a Listener
- Data Vault Option: Select none.
- Configuration Options:
  - Memory: 60% of Full memory
  - Sizing:
    - Processes:
      - Current usage: `SELECT * FROM v$resource_limit WHERE resource_name IN ('processes','sessions');`
      - Change if MAX_UTILIZATION is near LIMIT_VALUE.
  - Character sets: Defaults
  - Connection mode: Select Shared server mode.
    - Dedicated server mode: Small number of users and requests are long running mode.
    - Shared server mode: Large number of users and efficiently utilize system resource.
- Management Options: Configure Enterprise Manager database express
- User Credentials: Create same administrative password for all accounts
- Creation Option:
  - Create database
  - Generate database creation scripts

## Create Pluggable Database

Create Database using following steps:

- Open Database Configuration Assistant (DBCA)
  - Available command: `dbca`
- Database Operation: Manage Pluggable databases
- Manage Pluggable Databases: Create a Pluggable database
- Select Database:
  - Select a Container database
  - Enter Username: `system`
  - Enter Password: `your_password`
- Create Pluggable Database: Create a new PDB from another PDB
- PDB Identification:
  - Pluggable database name: `database_name`
  - Admin Username: `admin`
  - Admin Password: `admin_password`
- Pluggable Database Options: Select PDB storage options
- Summary Check
- Monitor Progress Page.

## Database Status

Check database

```bash
oraenv
```

```bash
sqlplus / as sysdba
```

```sql
SHOW PDBS;
```

```sql
SELECT NAME, OPEN_MODE, LOG_MODE FROM V$DATABASE;
```

### Update Database Service Name

```sql
ALTER PLUGGABLE DATABASE dbname OPEN;
```

Change Service name

```sql
ALTER SYSTEM SET service_names = 'mydb.example.com' SCOPE=both;
```

Change Database domain name

```sql
ALTER SYSTEM SET db_domain='example.com' scope=spfile;
```

Add Database service name in tnsnames

```bash
vi $ORACLE_HOME/network/admin/tnsnames.ora
```

```ora
PROD_DB =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 10.0.0.101)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = prod_db)
    )
  )
```

Reload changes

```sql
ALTER SYSTEM REGISTER
```

Restart Database commands

```sql
SHUTDOWN IMMEDIATE
STARTUP
```

```bash
tnsping PROD_DB
```

Check Updated values

```sql
SELECT NAME FROM V$ACTIVE_SERVICES;
```

```sql
SHOW PARAMETER NAME
```

```sql
SELECT count(*) FROM v$session WHERE service_name = 'mydb.example.com';
```

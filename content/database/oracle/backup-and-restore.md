# Backup and Restore

## Backup Database

### Using expdp command

Set Environment variables

```bash
export version=19 #21 23
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/${version}.0.0/dbhome_1
export ORACLE_SID=orcl
export PATH=/usr/sbin:$PATH
export PATH=$ORACLE_HOME/bin:$PATH
export TIMESTAMP=`date +%a%d%b%Y`
```

```sql
CREATE DIRECTORY BACKUP_DIR AS '/backups';
GRANT READ, WRITE ON DIRECTORY BACKUP_DIR TO username;
```

```bash
sudo mkdir /backups
sudo chown oracle:oracle /backups
```

```bash
expdp 'user/password@sid' dumpfile=expdp_database_${TIMESTAMP}.dmp logfile=expdp_database_${TIMESTAMP}.log schemas=database_schemas compression=all exclude=table:"in ('table_name')"
# Might need to escape ' " and () with \
```

### Using SQL Developer

Setting Export Environment

1. Open SQL developer
1. Go to Tools
1. Preferences
1. Expand Database
1. Expand Utilities
1. Select the Export option
1. Set it for 'insert'
1. Select Save As 'Single File' to export data into a single file
1. Save.

Exporting the Database

1. Open SQL developer
1. Click Tools
1. Database Export
1. Select the database you want to Export from the connection dropdown
1. Click next
1. Select all the object types
1. Click next
1. Review the information in the Summary
1. Click Finish.

## Restore Database

### Oracle Enterprise Manager

Download software

```bash
wget -O em13300_linux64.bin https://download.oracle.com/otn/linux/oem/13300/em13300_linux64.bin
```

### Using impdp command

Create Backup directory

```sql
CREATE DIRECTORY BACKUP_DIR AS '/backups';
GRANT READ, WRITE ON DIRECTORY BACKUP_DIR TO username;
```

Grant Permissions to User

```sql
GRANT CREATE SESSION TO username;
ALTER USER username QUOTA UNLIMITED ON USERS;
GRANT DBA TO username;
```

#### Table spaces

```sql
SELECT TABLESPACE_NAME, STATUS, CONTENTS FROM USER_TABLESPACES;
SELECT FILE_NAME FROM DBA_DATA_FILES WHERE TABLESPACE_NAME = 'MYDATA';
```

Create data tables

```sql
CREATE TABLESPACE MYDATA DATAFILE 'MYDATA_01.dbf' SIZE 1M AUTOEXTEND ON, 'MYDATA_02.dbf' SIZE 1M AUTOEXTEND ON;
CREATE TABLESPACE MYIDX DATAFILE 'MYIDX.dbf' SIZE 1M AUTOEXTEND ON;
```

Add data files

```sql
ALTER TABLESPACE MYDATA ADD DATAFILE 'MYDATA_03.dbf' SIZE 1M AUTOEXTEND ON, 'MYDATA_04.dbf' SIZE 1M AUTOEXTEND ON;
```

Delete tablespaces

```sql
DROP TABLESPACE MYDATA INCLUDING CONTENTS AND DATAFILES;
```

Import data from file

```bash
impdp username/password@MYDB DIRECTORY=BACKUP_DIR DUMPFILE=MYDB.dmp LOGFILE=MYDB.log SCHEMAS=SCHEMA_NAME

impdp username/password@MYDB DIRECTORY=BACKUP_DIR DUMPFILE=MYDB.dmp LOGFILE=MYDB.log REMAP_SCHEMA=SOURCE_SCHEMA:DEST_SCHEMA
```

# User Management

## SQLPlus

```bash
sqlplus / as sysdba
```

```sql
sqlplus username/password@database
```

## SQL Developer

Login as admin

- Open Oracle SQL Developer
- New Database Connection
- Name: `My Oracle DB`
- Username: `sys`
- Role: `SYSDBA`
- Password: *password*
- Hostname: *host address*
- Port: `1521`
- Service name: `orclpdb`
- Test and Connect

Login as user

- Open Oracle SQL Developer
- New Database Connection
- Name: `My Oracle DB`
- Username: *username*
- Role: `Default`
- Password: *password*
- Hostname: *host address*
- Port: `1521`
- Service name: `orclpdb`
- Test and Connect

## Commands

### List Users

```sql
SELECT * FROM DBA_USERS;
-- SELECT * FROM DBA_USERS ORDER BY CREATED;
```

```sql
SELECT * FROM ALL_USERS;
-- SELECT * FROM ALL_USERS ORDER BY CREATED;
```

Current User

```sql
SELECT * FROM USER_USERS;
```

### Create User

CDB user

```sql
ALTER SESSION SET CONTAINER = CDB$ROOT;
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
CREATE USER username IDENTIFIED BY "password";
```

PDB list

```sql
SHOW PDBS;
```

PDB user

```sql
ALTER SESSION SET CONTAINER = pdb_name;
CREATE USER username IDENTIFIED BY "password";
```

### Update User

User password

```sql
ALTER USER username IDENTIFIED BY "password";
```

Grant permission

```sql
GRANT CREATE SESSION TO username;
GRANT ALL PRIVILEGES TO username;
```

### Change Password

SYS user

```sql
ALTER USER SYS IDENTIFIED BY "password";
-- ALTER USER SYSTEM IDENTIFIED BY "password";
```

Other user

```sql
ALTER USER username IDENTIFIED BY "password";
```

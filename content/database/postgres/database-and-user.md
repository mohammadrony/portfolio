# Database and User

Update following values:

- Username: `user_name`
- Password: `strong_password`
- Database: `database_name`
- Schema: `schema_name`

## Database

### Create database

```sql
CREATE DATABASE database_name
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  LOCALE_PROVIDER = 'libc'
  CONNECTION LIMIT = -1
  IS_TEMPLATE = False;
```

List database

```sql
\l
\list
```

## User

### New User

Create user

```sql
CREATE USER user_name WITH PASSWORD 'strong_password';
ALTER USER user_name WITH PASSWORD 'strong_password';
-- ALTER USER user_name WITH SUPERUSER CREATEROLE CREATEDB;
```

Update permission

```sql
ALTER DATABASE database_name OWNER TO user_name;
GRANT ALL PRIVILEGES ON DATABASE database_name TO user_name;
GRANT ALL PRIVILEGES ON SCHEMA schema_name TO user_name;
-- GRANT ALL PRIVILEGES ON SCHEMA public TO user_name;
```

### Delete User

Revoke permission

```sql
ALTER USER user_name WITH NOSUPERUSER;
REVOKE ALL PRIVILEGES ON DATABASE database_name FROM user_name;
REVOKE ALL PRIVILEGES ON SCHEMA schema_name FROM user_name;
-- REVOKE ALL PRIVILEGES ON SCHEMA public FROM user_name;
```

Delete user

```sql
DROP DATABASE IF EXISTS database_name;
DROP USER IF EXISTS user_name;
```

## Queries

List of roles

```psql
\du+
```

Connect to database

```psql
\c database_name;
```

List of schemas

```bash
\dn+
```

List tables

```psql
\dt
```

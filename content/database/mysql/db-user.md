# Database and User

## Create Database

```sql
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Create User

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password_here';
-- CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password_here';
```

```sql
ALTER USER 'username'@'localhost' IDENTIFIED BY 'password_here';
-- ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password_here';
```

Update permission

```sql
GRANT ALL PRIVILEGES ON mydb.* TO 'username'@'localhost';
-- GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';
```

With grant option

```sql
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
-- GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'username'@'localhost' WITH GRANT OPTION;
```

Free up memory

```sql
FLUSH PRIVILEGES;
```

## Reset Password

- [Reset Root Password](https://dev.mysql.com/doc/refman/9.1/en/resetting-permissions.html)

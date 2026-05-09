# Drop Database

Update following values:

- Database: `database_name`

Revoke Connections

```sql
REVOKE CONNECT ON DATABASE database_name FROM public;
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'database_name';
```

Drop Database

```sql
DROP DATABASE database_name;
```

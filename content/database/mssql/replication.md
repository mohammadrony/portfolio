# Database Replication

## Unmark Replication

Check publisher database

```sql
select * from sys.databases where is_published = 1;
```

Unmark publisher

```sql
EXEC sp_removedbreplication 'database_name';
```

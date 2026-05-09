# Update Database Files

## Increase Recovery File Size

```bash
sqlplus / as sysdba
```

```sql
show parameter db_recovery_file_dest_size
```

```sql
select name, floor(space_limit / 1024 / 1024) "Size MB",ceil(space_used/ 1024 / 1024) "Used MB"
from v$recovery_file_dest;
```

```sql
ALTER SYSTEM SET DB_RECOVERY_FILE_DEST_SIZE=100G SCOPE=BOTH;
```

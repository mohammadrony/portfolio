# Cleanup Space

## Delete Obsolete Backups

```bash
rman target /
```

Crosscheck the actual status of backups and archived logs to update the RMAN repository

```sql
CROSSCHECK BACKUP;
CROSSCHECK ARCHIVELOG ALL;
```

Delete expired backups and archived logs

```sql
DELETE EXPIRED BACKUP;
DELETE EXPIRED ARCHIVELOG ALL;
DELETE ARCHIVELOG ALL COMPLETED BEFORE 'SYSDATE-7';
```

Delete obsolete backups and archived logs based on the retention policy

```sql
DELETE OBSOLETE;
```

Catalog recovery

```sql
CATALOG RECOVERY AREA;
```

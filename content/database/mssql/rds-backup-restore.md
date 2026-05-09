# RDS Backup and Restore

- [Importing and exporting SQL Server databases](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.Procedural.Importing.html)
- [Backing up a database](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.Procedural.Importing.Native.Using.html#SQLServer.Procedural.Importing.Native.Using.Backup)
- [Restoring a database](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.Procedural.Importing.Native.Using.html#SQLServer.Procedural.Importing.Native.Using.Restore)

## Backup

Backup database with file overwrite

```sql
exec msdb.dbo.rds_backup_database
@source_db_name='mydatabase',
@s3_arn_to_backup_to='arn:aws:s3:::mybucket/backup1.BAK',
@overwrite_s3_backup_file=1,
@type='FULL';
```

Backup command

```bash
db_host=database.xxx.xxx.rds.amazonaws.com
db_user=admin
db_pass=password
database=foo
bucket=mybucket
TIMESTAMP=`date +%d-%b-%Y`

sqlcmd -C -S ${db_host} -U ${db_user} -P "${db_pass}" -d master \
  -Q "exec msdb.dbo.rds_backup_database @source_db_name='${database}', @s3_arn_to_backup_to='arn:aws:s3:::${bucket}/${database}-${TIMESTAMP}.BAK', @overwrite_s3_backup_file=1, @type='FULL'"
```

## Restore

Restore from single file backup

```sql
exec msdb.dbo.rds_restore_database
@restore_db_name='mydatabase',
@s3_arn_to_restore_from='arn:aws:s3:::mybucket/backup1.BAK';
```

Restore command

```bash
db_host=database.xxx.xxx.rds.amazonaws.com
db_user=admin
db_pass=password
database=foo
bucket=mybucket

sqlcmd -C -S ${db_host} -U ${db_user} -P "${db_pass}" -d master \
  -Q "exec msdb.dbo.rds_restore_database @restore_db_name='${database}', @s3_arn_to_restore_from='arn:aws:s3:::${bucket}/${database}.BAK'"
```

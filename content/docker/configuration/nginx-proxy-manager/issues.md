# Issues

## Cannot create table - Permission denied

1. Update database file permission

   ```bash
   docker exec mysql chown -R mysql:mysql /var/lib/mysql/npm
   ```

2. Restart database container

   ```bash
   docker restart mysql
   ```

3. Recreate database container

   - Backup database

     ```bash
     docker exec -it mysql sh
     mysqldump -u root -pnpm --all-databases > alldb.sql
     ```

   - Delete container and volume

     ```bash
     docker rm -f mysql
     docker volume rm mysql
     ```

   - Recreate container

     ```bash
     docker compose up mysql -d
     ```

   - Restore database

     ```bash
     docker exec -it mysql sh
     mysql -u root -pnpm < alldb.sql
     ```

## owner is null

```bash
mysql -u root -pnpm npm
```

User id status

```sql
select id,email from npm.user;

-- related tables
update npm.certificate set owner_user_id = '<id>';
update npm.proxy_host set owner_user_id = '<id>';
```

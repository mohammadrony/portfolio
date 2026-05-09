# Delete Session Lock

```bash
sqlplus / as sysdba
```

## Find sessions

Find locked session

```sql
SELECT SID, SERIAL# FROM V$SESSION WHERE SID IN (SELECT SESSION_ID FROM DBA_DML_LOCKS);
```

For a tables session. Update **TABLE_NAME** with real value.

```sql
SELECT SID, SERIAL# FROM V$SESSION WHERE SID IN (
    SELECT SESSION_ID FROM DBA_DML_LOCKS WHERE NAME = 'TABLE_NAME'
);
```

```sql
select
   c.owner,
   c.object_name,
   c.object_type,
   b.sid,
   b.serial#,
   b.status,
   b.osuser,
   b.machine
from
   v$locked_object a,
   v$session b,
   dba_objects c
where
   b.sid = a.session_id
and
   a.object_id = c.object_id;
```

## Kill sessions

Kill sessions. Update **SID, SERIAL#** with real value.

```sql
ALTER SYSTEM KILL SESSION 'SID, SERIAL#';
```

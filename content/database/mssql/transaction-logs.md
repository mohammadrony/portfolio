# Transaction Logs

Tools

- [ApexSQL](https://www.apexsql.com/sql-tools-log/)
- [dbForge](https://www.devart.com/dbforge/sql/transaction-log/)

## Events

[sp_readerrorlog](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-readerrorlog-transact-sql)

```sql
exec sp_readerrorlog 1, 2;
```

```sql
exec sp_readerrorlog 0, 1, 'database', 'start'
```

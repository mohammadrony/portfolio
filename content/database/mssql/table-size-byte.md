# Find Size of Tables

[How to get the size of all tables in a SQL Server database](https://sentry.io/answers/how-to-get-the-size-of-all-tables-in-a-sql-server-database/)

Find tables and schema size

```sql
SELECT
    s.Name AS SchemaName,
    t.Name AS TableName,
    p.rows AS NumRows,
    CAST(ROUND((SUM(a.total_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Total_MB,
    CAST(ROUND((SUM(a.used_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Used_MB,
    CAST(ROUND((SUM(a.total_pages) - SUM(a.used_pages)) / 128.00, 2) AS NUMERIC(36, 2)) AS Unused_MB
FROM
    sys.tables t
    JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
    JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
    JOIN sys.allocation_units a ON p.partition_id = a.container_id
    LEFT OUTER JOIN sys.schemas s ON t.schema_id = s.schema_id
WHERE
    t.name NOT LIKE 'dt%'
    AND t.is_ms_shipped = 0
    AND i.object_id > 255
GROUP BY
    t.Name, s.Name, p.Rows
ORDER BY
    Total_MB DESC, t.Name
```

Find schema size

```sql
SELECT
    s.Name AS SchemaName,
    CAST(ROUND((SUM(a.total_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Total_MB,
    CAST(ROUND((SUM(a.used_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Used_MB,
    CAST(ROUND((SUM(a.total_pages) - SUM(a.used_pages)) / 128.00, 2) AS NUMERIC(36, 2)) AS Unused_MB
FROM
    sys.tables t
    JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
    JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
    JOIN sys.allocation_units a ON p.partition_id = a.container_id
    LEFT OUTER JOIN sys.schemas s ON t.schema_id = s.schema_id
WHERE
    t.name NOT LIKE 'dt%'
    AND t.is_ms_shipped = 0
    AND i.object_id > 255
GROUP BY
    s.Name
ORDER BY
    Total_MB DESC;
```

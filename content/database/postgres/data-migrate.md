# Data Migrate

## Maven - Flyway

Migrate

```bash
mvn flyway:migrate
```

```bash
mvn flyway:migrate -Dflyway.url=jdbc:postgresql://localhost:5432/database_name -Dflyway.user=user_name -Dflyway.password=your_password
```

Repair

```bash
mvn flyway:clean
```

```bash
mvn flyway:repair
```

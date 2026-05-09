# Grafana Query

## Loki logs

```logql
{container_name=~".+"}
```

```logql
count_over_time({container_name=~".+"}|=`error` [1h])
```

```logql
count_over_time({container_name=~"mycontainer.*"}|=`error` [1h])
```

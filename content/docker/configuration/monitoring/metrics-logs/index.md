# Metrics and Logs

## Prometheus Grafana

`docker compose up prometheus grafana -d`

## Node Exporter

Complete setup guide from [this file](./node-exporter.md).

## Cadvisor

`docker compose up cadvisor -d`

## Loki

Container's vm configuration from [this file](./loki.md).

Start loki application

  `docker compose up loki -d`

## Dashboard

Grafana Login

- URL: <http://grafana:3000>
- Username: admin
- Password: admin
- Change Password

Datasource

1. Prometheus
   - Goto [Add new connection](https://grafana.example.com/connections/add-new-connection) page.
   - Select Prometheus
   - Select Name and URL: `http://prometheus:9090`
   - Save and Test

2. Loki
   - Goto [Add new connection](https://grafana.example.com/connections/add-new-connection) page.
   - Select Loki
   - Select Name and URL: `http://loki:3100`
   - Save and Test

Create Dashboard

- Goto [Import Dashboard](https://grafana.example.com/dashboard/import) page.
- Select Dashboard ID

  | ID    | Name                          |
  |-------|-------------------------------|
  | 193   | Docker monitoring             |
  | 1860  | Node Exporter Full            |
  | 18702 | Simple Loki Log Dashboard     |
  | 893   | Docker and system monitoring  |

- Select datasource and Import
- Visit [Dashboards](https://grafana.example.com/dashboards) page for details view.

Also [explore](https://grafana.example.com/explore) in grafana dashboard with some example query in grafana query [file](./grafana-query.md).

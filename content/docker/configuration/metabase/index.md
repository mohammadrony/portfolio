# Metabase Dashboard with PostgreSQL database

[Installation guide](https://www.metabase.com/docs/latest/installation-and-operation/running-metabase-on-docker)

## Initial Host setup

```bash
sudo apt update; sudo apt -y upgrade
sudo echo "metabase" > /etc/hostname
sudo timedatectl set-timezone Asia/Dhaka
sudo reboot now
```

Install some basic package

```bash
sudo apt install -y tree btop net-tools
```

## Add Maps for Dashboard

### Get Bangladesh GeoJSON files from GitHub

- [GitHub GeoJSON Shapefiles of Bangladesh](https://github.com/yasserius/bangladesh_geojson_shapefile)

Save GeoJSON files into `Bangladesh-GeoJSON` directory.

## Deploy Docker Compose

Update values in

- [docker-compose.yaml](./docker-compose.yaml)
- [metabase.conf](./metabase.conf)

Apply docker compose manifest

```bash
cd 
docker compose -f docker-compose.yaml up -d
```

Delete deployment

```bash
docker compose -f docker-compose.yaml down
```

## Management

### Browse the application

Goto <http://example.com> from your browser.

### Database Connection String

MongoDB

- `mongodb://metabase:mongo1234@mongo:27017/dashboard_db`

# Compose Template

## Image and Container

Service

```yaml
services:
  <name>:
    image: <image>:<tag>
    container_name: <container_name>
    build:
      context: ./
      dockerfile: Dockerfile
      args:
        <key>: <value>
```

Restart policy

```yaml
services:
  <name>:
    restart: unless-stopped
```

```yaml
services:
  <name>:
    restart: always
```

## Extra Hosts

```yaml
services:
  <name>:
    extra_hosts:
      - "host:127.0.0.1"
```

## Resource

```yaml
services:
  <name>:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: '2G'
        reservations:
          cpus: '0.25'
          memory: '512M'
```

## Network

Internal container network

```yaml
services:
  <name>:
    ports:
      - "<port>:<container_port>"
    networks:
      - <network>

networks:
  <network>:
    name: <network>
    driver: bridge
```

Host network

```yaml
services:
  <name>:
    network_mode: 'host'
```

## Environment

Key value

```yaml
services:
  <name>:
    environment:
      <key>: <value>
```

Env file

```yaml
services:
  <name>:
    env_file:
      - .env
```

# RabbitMQ

[Installation Guide](https://www.rabbitmq.com/docs/download)

Port Info

| Port  | Protocol          |
|-------|-------------------|
| 5672  | amqp              |
| 15672 | http / management |
| 25672 | clustering        |
| 15692 | http / prometheus |

## Installation

Update Hosts

```bash
sudo tee -a /etc/hosts << EOF
192.168.0.2 rabbitmq-1
192.168.0.3 rabbitmq-2
EOF
```

Cluster prerequisites

```bash
cd files
echo 1 > erlang.cookie
chmod 600 erlang.cookie
```

```bash
cd files
chmod +x cluster-entrypoint.sh
```

Install RabbitMQ

```bash
cd files
docker compose -f docker-compose.yaml up -d
```

Status

```bash
rabbitmq-diagnostics -q cluster_status
```

## Nginx Config

Update `IP_ADDRESS` with real IP in [rabbitmq-nginx.conf](./rabbitmq-nginx.conf) file.

```bash
cat rabbitmq-nginx.conf | sudo tee -a /etc/nginx/nginx.conf 
sudo systemctl restart nginx
```

## Rabbitmq Management Console

Administrator console

- Website: <http://127.0.0.1:15672>
- Username: admin
- Password: admin

## Cluster Commands

Join cluster

```bash
rabbitmqctl stop_app
rabbitmqctl join_cluster rabbit@rabbitmq-1
rabbitmqctl start_app
```

Remove node from cluster

```bash
docker exec -it rabbitmq-1 bash
```

```bash
rabbitmqctl -n rabbit@rabbitmq-2 stop_app
rabbitmqctl forget_cluster_node rabbit@rabbitmq-2
```

Node reset

```bash
docker exec -it rabbitmq-1 bash
```

```bash
rabbitmqctl -n rabbit@rabbitmq-1 stop_app
rabbitmqctl -n rabbit@rabbitmq-1 reset
rabbitmqctl -n rabbit@rabbitmq-1 start_app
```

## Container Management

Restart container

```bash
docker restart rabbitmq-1
```

Stop container

```bash
docker stop rabbitmq-1
```

Delete deployment

```bash
docker compose -f docker-compose.yaml down
```

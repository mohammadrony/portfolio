# Docker Cleanup

## Remove container and image

```bash
docker rmi IMAGE
```

```bash
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -aq)
```

```bash
docker rm -vf $(docker ps -aq)
```

```bash
sudo docker rm -v $(sudo docker ps -a -q -f status=exited)
sudo docker rmi -f  $(sudo docker images -f "dangling=true" -q)
```

## Cleanup docker volume

```bash
sudo docker volume prune -f
```

```bash
sudo docker system prune -a -f
```

```bash
# sudo docker volume rm $(docker volume ls -qf dangling=true)
docker volume ls -qf dangling=true | xargs -r docker volume rm
```

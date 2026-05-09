# Docker cp

[Documentation](https://docs.docker.com/reference/cli/docker/container/cp/)

```bash
docker cp foo.txt CONTAINER:/etc/
```

```bash
docker cp CONTAINER:/var/logs/ /tmp/logs
```

```bash
docker cp CONTAINER:/var/logs/app.log - | tar x -O | grep "ERROR"
```

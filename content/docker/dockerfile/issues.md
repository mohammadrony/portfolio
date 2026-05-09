# Known Issues

## SSL Validation

Debian base image

```Dockerfile
USER root
RUN apt update && apt install -y ca-certificates \
    && apt clean && rm -rf /var/lib/apt/lists/*
```

Alpine base image

```Dockerfile
USER root
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
```

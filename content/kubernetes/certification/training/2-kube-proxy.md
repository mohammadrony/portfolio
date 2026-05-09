# Kube Proxy

## Pod service setup

Switch context

```bash
kubectl config use-context k8s-c1-H
```

Create nginx yaml

```bash
kubectl run p2-pod --image=nginx:1.21.3-alpine $do > p2.yaml
```

Update `p2.yaml` namespace and container

```yaml
metadata:
  namespace: project-hamster             # add
spec:
  containers:
  - image: nginx:1.21.3-alpine
    name: p2-pod
  - image: busybox:1.31                  # add
    name: c2                             # add
    command: ["sh", "-c", "sleep 1d"]    # add
```

Create pod

```bash
kubectl apply -f p2.yaml
```

Create service

```bash
kubectl -n project-hamster expose pod p2-pod --name p2-service --port 3000 --target-port 80
```

Confirm service endpoints

```bash
kubectl -n project-hamster get pod,svc,ep
```

## Check kubeproxy is using iptables

```bash
k get node
```

Login to **all vm** and check pod log by `crictl`

```bash
ssh cluster1-controlplane1

# root@cluster1-controlplane1
$ crictl ps | grep kube-proxy
$ crictl logs <id>
# Output: Using iptables Proxier
```

Check created iptables rules by kube-proxy

```bash
ssh cluster1-controlplane1 iptables-save | grep p2-service >> /opt/course/p2/iptables.txt
ssh cluster1-node1 iptables-save | grep p2-service >> /opt/course/p2/iptables.txt
ssh cluster1-node2 iptables-save | grep p2-service >> /opt/course/p2/iptables.txt
```

## Cleanup

Delete service

```bash
k -n project-hamster delete svc p2-service
```

iptables rules should be deleted

```bash
ssh cluster1-controlplane1 iptables-save | grep p2-service
ssh cluster1-node1 iptables-save | grep p2-service
ssh cluster1-node2 iptables-save | grep p2-service
```

# IP CIDR

Switch context

```bash
kubectl config use-context k8s-c2-AC
```

Run pod and expose service

```bash
k run check-ip --image=httpd:2.4.41-alpine
k expose pod check-ip --name check-ip-service --port 80
```

Check ip address

```bash
k get svc,ep -l run=check-ip
```

Change service CIDR in kube-apiserver

```bash
ssh cluster2-controlplane1
```

Update `/etc/kubernetes/manifests/kube-apiserver.yaml`

```yaml
spec:
  containers:
  - command:
    - --service-cluster-ip-range=11.96.0.0/12             # change
```

Check pod

```bash
kubectl -n kube-system get pod | grep api
```

Update `/etc/kubernetes/manifests/kube-controller-manager.yaml`

```yaml
spec:
  containers:
  - command:
    - --service-cluster-ip-range=11.96.0.0/12         # change
```

```bash
# root@cluster2-controlplane1
$ crictl ps | grep scheduler
```

Check ip address

```bash
k get pod,svc -l run=check-ip # same as before
```

Create new service

```bash
k expose pod check-ip --name check-ip-service2 --port 80
```

Check ip address again

```bash
k get svc,ep -l run=check-ip
```

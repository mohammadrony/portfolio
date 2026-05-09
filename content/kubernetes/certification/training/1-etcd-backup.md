# ETCD Backup

Switch context

```bash
kubectl config use-context k8s-c2-AC
```

Check etcd config

```bash
cat /etc/kubernetes/manifests/etcd.yaml
```

Check certificate expiry date

```bash
openssl x509  -noout -text -in /etc/kubernetes/pki/etcd/server.crt | grep Validity -A2
```

Create etcd snapshot

```bash
ETCDCTL_API=3 etcdctl snapshot save /etc/etcd-snapshot.db \
--cacert /etc/kubernetes/pki/etcd/ca.crt \
--cert /etc/kubernetes/pki/etcd/server.crt \
--key /etc/kubernetes/pki/etcd/server.key
```

Backup status

```bash
ETCDCTL_API=3 etcdctl snapshot status /etc/etcd-snapshot.db
```

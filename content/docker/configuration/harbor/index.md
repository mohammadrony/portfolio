# Harbor Registry

## Host setup

Set hostname

```bash
sudo hostnamectl set-hostname registryserver.local
```

Update hosts

```bash
sudo tee -a /etc/hosts << EOF
192.168.1.101 registryserver.local
EOF
```

Generate certificate

```bash
openssl genrsa -out server.key 2048
```

```bash
sudo tee -a openssl.cnf << EOF
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = BD
ST = BD
L = Dhaka
OU = Software
CN = registryserver.local
emailAddress = admin@registryserver.local

[v3_req]
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = registryserver.local
DNS.2 = registry.local
IP.1 = 192.168.1.101
EOF
```

```bash
openssl req -new -key server.key -out server.csr -config openssl.cnf
```

```bash
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt -extfile openssl.cnf -extensions v3_req
```

```bash
openssl x509 -in server.crt -text -noout
```

```bash
sudo cp server.crt /etc/ssl/certs
sudo cp server.key /etc/ssl/private
```

- `server.crt` is also known as `ca.crt`.

## Installation

[Harbor Installation and Configuration](https://goharbor.io/docs/1.10/install-config/)

Get [version](https://github.com/goharbor/harbor/releases)

```bash
cd ~
VERSION=v2.11.0
wget https://github.com/goharbor/harbor/releases/download/v2.11.0/harbor-online-installer-$VERSION.tgz
tar -xzf harbor-online-installer-$VERSION.tgz
```

Custom configuration

```bash
cd ~/harbor
cp harbor.yml.tmpl harbor.yml
vi harbor.yml
```

```yml
hostname: registryserver.local

https:
  port: 443
  certificate: /etc/ssl/certs/registryserver.local.crt
  private_key: /etc/ssl/certs/registryserver.local.key

# upload_purging:
#   enabled: true
#   age: 24h
```

```bash
cd ~/harbor
sudo ./install.sh
```

## Login Management

Default user

- Username: `admin`
- Password: `Harbor12345`

Create project

[Managing Users](https://goharbor.io/docs/1.10/administration/managing-users/)

- Create User > Create Project

- Add Member (User) to Project

- Add User to project as Developer, Maintainer or Project Admin for **push image** permission.

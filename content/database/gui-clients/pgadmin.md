# PostgreSQL - pgAdmin

- [Download page](https://www.pgadmin.org/download/)

Install the public key for the repository

```bash
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
```

```bash
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
```

```bash
sudo apt update
```

Install pgAdmin

```bash
sudo apt install -y pgadmin4
```

Install for desktop mode

```bash
sudo apt install -y pgadmin4-desktop
```

Install for web mode

```bash
sudo apt install -y pgadmin4-web
sudo /usr/pgadmin4/bin/setup-web.sh
```

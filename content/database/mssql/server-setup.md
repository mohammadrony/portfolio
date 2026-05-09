# Database Server Setup

- [Microsoft SQL Server for Windows](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Install SQL Server configuration for Ubuntu](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu)

## Windows

### Install Package

- Download MSSQL [developer version](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Start SQL...-Dev.exe file > Select Basic > Install

### Open Database Port

Enable connecting ip address

- Start Menu > SQL Server Configuration Manager
- SQL Server Network Configuration > Protocols for MSSQLSERVER > Enable TCP/IP Protocol
- SQL Server Services > SQL Server > Restart Service

Create firewall rule

- Open Windows Firewall > Advanced Settings > Inbound Rules
- New Rule to allow TCP Port 1433

Enable user authentication

- Start Menu > Open SSMS > Server Properties > Security
- SQL Server and Windows Authentication mode (Enable)
- Server Properties > Connections > Allow Remote Connections
- Security > Create login > User Mapping > Permissions

## Ubuntu

- [How to install SQL Server 2022 on Ubuntu Server 24.04 LTS](https://learn.microsoft.com/en-us/answers/questions/1693491/how-to-install-sql-server-2022-on-ubuntu-server-24)

### SQL Server Quickstart

Add repository

```bash
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
```

```bash
curl -fsSL https://packages.microsoft.com/config/ubuntu/22.04/mssql-server-2022.list | sudo tee /etc/apt/sources.list.d/mssql-server-2022.list
```

```bash
# Ubuntu 24
curl -LO http://archive.ubuntu.com/ubuntu/pool/main/o/openldap/libldap-2.5-0_2.5.18+dfsg-0ubuntu0.22.04.1_amd64.deb
sudo apt install -y ./libldap-2.5-0_2.5.18+dfsg-0ubuntu0.22.04.1_amd64.deb
```

Install mssql server

```bash
sudo apt update
sudo apt install -y mssql-server
```

Configure sa user

```bash
sudo /opt/mssql/bin/mssql-conf setup

# Enter your edition(1-10):
# Do you accept the license terms? [Yes/No]:
# Enter the SQL Server system administrator password:
# Confirm the SQL Server system administrator password:
```

Restart service

```bash
sudo systemctl status mssql-server
```

Check version

```bash
dpkg -l | grep -i mssql-server
```

[Disable the sa account as a best practice](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16&tabs=ubuntu2204#disable-the-sa-account-as-a-best-practice)

# Oracle DB Client Setup

## SQL Developer

Download Installer file.

- [Oracle SQL Developer](https://www.oracle.com/database/sqldeveloper/technologies/download/)

### VS Code Extension

Open [Oracle SQL Developer Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=Oracle.sql-developer) > Install > Add Connections > Save.

### Install in Windows

[Download](https://download.oracle.com/otn_software/java/sqldeveloper/sqldeveloper-23.1.1.345.2114-x64.zip) and Extract installation file.

Run `sqldeveloper/sqldeveloper.exe` for installation.

### Install in Ubuntu

Use Java 11 and SQL Developer 23

```bash
sudo apt install -y openjdk-11-jdk
sudo update-alternatives --config java
# Select java 11
```

```bash
# Update ~/.bashrc and ~/.zshrc
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export PATH=$PATH:$JAVA_HOME/bin
```

Setup installation file.

```bash
unzip sqldeveloper-...no-jre.zip
```

```bash
sudo mv sqldeveloper /opt
```

Applications menu entry

```bash
sudo vi /usr/share/applications/sqldeveloper.desktop
```

```desktop
[Desktop Entry]
Name=Oracle SQL Developer
Comment=SQL Developer from Oracle
GenericName=SQL Tool
Exec=/opt/sqldeveloper/sqldeveloper.sh
Icon=/opt/sqldeveloper/icon.png
Type=Application
StartupNotify=true
Categories=Utility;Oracle;Development;SQL;
```

### Connect Oracle Database

1. Open SQL Developer
1. Create a Connection Manually
1. Enter Name: `My Oracle DB`
1. Username: `sys`
1. Role: `SYSDBA`
1. Password: `your-password`
1. Connection type: Basic
1. Hostname: `localhost`
1. Port: `1521`
1. SID: `orcl`
1. Test and Connect

## SQL Plus

Download [Oracle Database Client](https://www.oracle.com/database/technologies/oracle19c-linux-downloads.html)

[Installation guide](https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/running-oui-instant-client.html)

Extract Downloaded file

```bash
unzip LINUX...._client.zip
```

Run Installer file with UI

```bash
cd client && ./runInstaller
```

Update path environment variable

```bash
export PATH=/u01/app/oracle/product/.../client_1:$PATH
```

### Uninstall SQL Plus

```bash
./runInstaller -deinstall -home /u01/app/oracle/product/.../client_1
```

## Useful Commands

Test connection

```sql
SELECT USERNAME FROM ALL_USERS ORDER BY USERNAME;
```

```sql
SELECT TABLESPACE_NAME FROM USER_TABLESPACES;
```

```sql
SELECT * FROM dba_pdbs;
```

```sql
SELECT name, con_id, open_mode FROM v$pdbs;
```

```sql
SELECT * FROM V$VERSION;
```

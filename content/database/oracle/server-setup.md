# Database Server Setup

## Install Latest Database Server

Download Installer file.

- [Linux](https://www.oracle.com/database/technologies/oracle21c-linux-downloads.html)
- [Windows](https://www.oracle.com/database/technologies/oracle21c-windows-downloads.html)

## Oracle OS

### Archive Installation

```bash
version=19.0.0 # 21.0.0 23.0.0
```

```bash
# Update ~/.bashrc and ~/.zshrc
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/$version/dbhome_1
export ORACLE_SID=orcl
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
export CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib
export PATH=$PATH:$ORACLE_HOME/bin
```

Extract Zip file

```bash
cd $ORACLE_HOME
unzip -qo LINUX...db_home.zip
```

```bash
./runInstaller
```

Start listener

```bash
lsnrctl start
```

Stop listener

```bash
lsnrctl stop
```

### RPM-based Installation

Installation

```bash
version=19 #21 23
```

```bash
sudo yum install -y oracle-database-preinstall-${version}c
```

```bash
sudo yum install -y bc binutils compat-libcap1 compat-libstdc++-33 dtrace-utils elfutils-libelf elfutils-libelf-devel fontconfig-devel glibc glibc-devel ksh libaio libaio-devel libdtrace-ctf-devel libXrender libXrender-devel libX11 libXau libXi libXtst libgcc librdmacm-devel libstdc++ libstdc++-devel libxcb make net-tools nfs-utils python python-configshell python-rtslib python-six targetcli smartmontools sysstat
```

```bash
wget https://download.oracle.com/otn/linux/oracle19c/190000/oracle-database-ee-...x86_64.rpm?AuthParam=xxx -O oracle-database-ee-...x86_64.rpm
```

```bash
# Update ~/.bashrc and ~/.zshrc
export ORACLE_HOME=/opt/oracle/product/${version}c/dbhome_1
```

```bash
sudo yum -y localinstall oracle-database-ee-...x86_64.rpm
```

Create Database

```bash
sudo /etc/init.d/oracledb_ORCLCDB-${version}c configure
```

Remove Installation

```bash
sudo yum -y remove oracle-database-preinstall-${version}c
```

```bash
cd $ORACLE_HOME/bin
./dbca
./netca
```

```bash
sudo yum -y remove oracle-database-ee-${version}c
```

```bash
sudo /etc/init.d/oracledb_ORCLCDB-${version}c delete
```

### Auto Start in System boot

- [Stopping and Starting Oracle Software](https://docs.oracle.com/en/database/oracle/oracle-database/19/unxar/stopping-and-starting-oracle-software.html)
- [Automating Database Startup and Shutdown on Linux](https://oracle-base.com/articles/linux/automating-database-startup-and-shutdown-on-linux)

```bash
sudo vi /etc/oratab
```

Update

```bash
version=19 # 21 23
ORACLE_SID=orcl
ORACLE_HOME=/u01/app/oracle/product/$version.0.0/dbhome_1
sudo sed -i "s#$ORACLE_SID:$ORACLE_HOME:N#$ORACLE_SID:$ORACLE_HOME:Y#" /etc/oratab
```

```bash
# Update ~/.bashrc and ~/.zshrc
export TMP=/tmp
export TMPDIR=$TMP

version=19 # 21 23
export ORACLE_HOSTNAME=crvsdb
export ORACLE_UNQNAME=orcl
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/$version.0.0/dbhome_1
export ORACLE_SID=orcl

export PATH=/usr/sbin:/usr/local/bin:$PATH
export PATH=$ORACLE_HOME/bin:$PATH

export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
export CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib
```

Save database state

```bash
sqlplus / as sysdba
```

```sql
ALTER PLUGGABLE DATABASE PDB_NAME OPEN;
ALTER PLUGGABLE DATABASE PDB_NAME SAVE STATE;
```

```sql
ALTER PLUGGABLE DATABASE ALL OPEN;
```

```sql
ALTER PLUGGABLE DATABASE PDB_NAME CLOSE IMMEDIATE;
```

```sql
ALTER PLUGGABLE DATABASE ALL CLOSE IMMEDIATE;
```

```sql
ALTER PLUGGABLE DATABASE ALL SAVE STATE;
```

## Windows

### Download Installer file

Extract Downloaded file.

Run `..._db_home/setup.exe` as Administrator with these steps:

1. Configuration Option
1. System Class
1. Oracle Home User
1. Typical Installation
1. Prerequisite Checks
1. Summary
1. Install Product
1. Finish

### Test Connection

SQL Plus commands

```bash
sqlplus /nolog
```

```sql
CONNECT / AS SYSDBA
```

```sql
STARTUP
```

```sql
SHUTDOWN
```

### Uninstall Database

Run the deinstall script

```bash
ORACLE_HOME=..._db_home
cd $ORACLE_HOME/deinstall
./deinstall
```

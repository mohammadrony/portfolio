# Database Availability Group

Alternative to Database Mirroring

## Create Cluster

- Installation
  - Server Manager > Manage > Feature > Install Failover Clustering
- Open
  - Start > Windows Administrative tools > Failover Cluster Manager Or
  - Server Manager configuration > Tools > Failover Cluster Manager
- Failover Cluster Manager
  - Install Updates
  - Setup Hostnames
  - Permission denied
    - CMD: `New-ItemProperty -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -Name LocalAccountTokenFilterPolicy -Value 1`
  - Update hosts in `C:\Windows\system32\drivers\etc\hosts`
  - Common issues (here)[RPC server is unavailable](https://learn.microsoft.com/en-us/troubleshoot/windows-server/user-profiles-and-logon/not-log-on-error-rpc-server-unavailable)
    - Enable `TCP/IP NetBIOS Helper` service
    - Enable `Remote Registry` service
  - Create Static IP for cluster group. [guide](https://www.ge.com/digital/documentation/cimplicity/version10/oxy_ex-2/networking/topics/t_cimplicity_networking_step4_makean_ip_address_availablefora_cluster.html)
    - Cluster Core Resources
    - Server Name
    - Set Static IP
    - Bring Online
  - **Configure Cluster Quorum Settings**
- Restart Server

## SQL Server Configuration Manager

- Select SQL Server Services > SQL Server
- SQL Server > Properties > Always On Availability Groups > Enable Alway On ...
- Restart Service

## Database High Availability

Update permission for Administrator Login

- SSMS > Create login > `admin`
- Set Server Roles: `dbcreator`, `public`, `serveradmin`, `sysadmin`
- User Mapping: `master`

SSMS configuration

- Always On High Availability
- New Availability Group Wizard
  - Specify Options
    - Group name
    - Select Database Level Health Detection
  - Select Database
    - Prerequisites check
  - Specify Replicas
    - Replicas
    - Primary, Secondary
    - Synchronous commit
    - Read-intent only
      - SSMS > Connect > Options > Additional Connection Parameters > `ApplicationIntent=ReadOnly`
    - [Other connectivity options](https://www.mssqltips.com/sqlservertip/4511/connect-to-sql-server-availability-group-replica-with-ssms-when-readable-secondary-is-readintent-only/)
    - Listener
      - DNS Name
      - Port
      - Add IP Address
      - Set subnet mask
  - Data Synchronization
    - Automatic seeding
  - Validation
  - Finish

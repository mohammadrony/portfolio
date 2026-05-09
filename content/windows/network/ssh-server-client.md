# OpenSSH Server and Client

## Install feature

1. Open Settings, select System, then select Optional Features.
2. Select Add a feature if not installed:
   - Find OpenSSH Client, then select Install
   - Find OpenSSH Server, then select Install

## Add Public key authentication

[Setting up OpenSSH for Windows using public key authentication](https://stackoverflow.com/questions/16212816/setting-up-openssh-for-windows-using-public-key-authentication)

- Update permission in `$env:USERPROFILE\.ssh\authorized_keys` file.

   1. Properties > Security > Advanced > `Disable inheritance` > Save.
   2. Create Full Access permission for `SYSTEM` and `Administrator` User.

- Update config in `C:\ProgramData\ssh\sshd_config` file.

   1. **Uncomment** `PubkeyAuthentication yes`
   2. **Comment** following segment

      ```sshd_config
      Match Group administrators
      AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
      ```

- Restart OpenSSH Server service.

   1. Start Menu > Run > `services.msc`
   2. Restart OpenSSH Server.
   3. Change Startup type to Automatic.

## Create Connection

Username

```shell
$env:USERNAME
```

Server name

```shell
ipconfig | select-string  ('(\s)+IPv4.+\s(?<IP>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(\s)*') -AllMatches | %{ $_.Matches } | % { $_.Groups["IP"]} | %{ $_.Value }
```

Connect VM

```bash
ssh user@host
```

SCP from windows

```bash
scp -T 'user@host:"C:\path to file\file.txt"' ./
```

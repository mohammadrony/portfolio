# Dual Boot

BIOS configuration

- Use `GPT` format disk and filesystem.
- Use `UEFI` Boot option for Secure Boot configuration.
- Disable `Secure Boot` in Boot menu for multiple boot option.

Boot repair

```bash
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt update
sudo apt install -y boot-repair
sudo boot-repair
```

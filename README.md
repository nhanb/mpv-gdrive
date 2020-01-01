# WIP Google Drive video support for mpv

```sh
# This script shells out to `curl` for properly verified https requests.
sudo pacman -S curl

mkdir -p ~/.config/mpv/scripts ~/.config/mpv/script-opts
ln -s "$PWD/gdrive.lua" "$HOME/.config/mpv/scripts/gdrive.lua"
cp ./gdrive.conf ~/.config/mpv/script-opts/gdrive.conf

export FILE_ID='<gdrive file ID>'
mpv "gdrive://$FILE_ID"
```

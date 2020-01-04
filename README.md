# Google Drive video support for mpv

Demo: https://youtu.be/sPP34dKCZik

Usage:

```sh
# This script shells out to `curl` for properly verified https requests.
sudo pacman -S curl

mkdir -p ~/.config/mpv/scripts ~/.config/mpv/script-opts
ln -s "$PWD/gdrive.lua" "$HOME/.config/mpv/scripts/gdrive.lua"
cp ./gdrive.conf ~/.config/mpv/script-opts/gdrive.conf

mpv 'https://drive.google.com/file/d/abCDef/view'
# or
mpv 'gdrive://abCDef'
# where abCDef is the file id
```

I'm still trying to figure out a reasonably convenient UX for this.

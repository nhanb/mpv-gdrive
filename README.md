# Google Drive video support for mpv

Demo: https://junk.imnhan.com/mpv-gdrive.mp4

Usage:

```sh
# This script shells out to `curl` for properly verified https requests.
sudo pacman -S curl

mkdir -p ~/.config/mpv/scripts ~/.config/mpv/script-opts
ln -s "$PWD/gdrive.lua" "$HOME/.config/mpv/scripts/gdrive.lua"
cp ./gdrive.conf ~/.config/mpv/script-opts/gdrive.conf
# Now fill out your google credentials in gdrive.conf

mpv 'https://drive.google.com/file/d/abCDef/view'
# or
mpv 'gdrive://abCDef'
# where abCDef is the file id
```

I'm still trying to figure out a reasonably convenient UX for this.

## Helper userscript

- Install a userscript extension for your browser (I use ViolentMonkey)
- Add script by URL:
  https://raw.githubusercontent.com/nhanb/mpv-gdrive/master/userscript/gdrive-id.js

Now when browsing Google Drive you should have something like this on the
bottom left:

![](https://user-images.githubusercontent.com/1446315/79535328-4c868700-80a7-11ea-9750-77175d2928c8.png)

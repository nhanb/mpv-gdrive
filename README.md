# WIP Google Drive video support for mpv

```sh
ln -s "$PWD/gdrive.lua" "$HOME/.config/mpv/scripts/gdrive.lua"
TOKEN='<gdrive API token>'
FILE_ID='<gdrive file ID>'
mpv "gdrive://$FILE_ID"
```

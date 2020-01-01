# WIP Google Drive video support for mpv

```sh
ln -s "$PWD/gdrive_hook.lua" "$HOME/.config/mpv/scripts/gdrive_hook.lua"
TOKEN='<gdrive API token>'
FILE_ID='<gdrive file ID>'
mpv "https://www.googleapis.com/drive/v3/files/$FILE_ID?alt=media"
```

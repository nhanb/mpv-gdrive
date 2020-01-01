TOKEN = os.getenv("TOKEN")

function set_auth_headers(access_token)
    print("Setting GDrive authorization headers")
    headers = {}
    headers[1] = "Authorization: Bearer " .. access_token
    mp.set_property_native("file-local-options/http-header-fields", headers)
end



function load_gdrive()
    print("Loading GDrive script")

    local url = mp.get_property("path", "")
    if (url:find("gdrive://") == 1) then

        print("Detected gdrive:// protocol, rewriting url")
        url = "https://www.googleapis.com/drive/v3/files/" .. url:sub(10) .. "?alt=media"
        mp.set_property("stream-open-filename", url)

        set_auth_headers(TOKEN)
    else
        print("Not gdrive:// protocol, doing nothing.")
    end

end

function handle_load_fail()
    -- In case token expires, refresh it (TODO)
    print('failed, resetting...', TOKEN)
    set_auth_headers(TOKEN)
end

-- Apparently hooks are bad and unsupported but ytdl_hook uses them.
-- The alternative, register_event('start-file'), seems to be non-blocking
-- which may cause race conditions e.g. mpv trying to load a non-existent
-- gdrive:// protocol before this script sets the correct url.
mp.add_hook("on_load", 50, load_gdrive)
mp.add_hook("on_load_fail", 50, handle_load_fail)

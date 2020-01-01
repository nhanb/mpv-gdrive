TOKEN = ""
OPTIONS = {}

-----------------------------
-- This script registers 2 hooks:
--   + on_load as the main entrypoint
--   + on_load_fail in case current access token expires and needs refreshing
-----------------------------

function on_load_hook()
    print("Loading GDrive script")
    local url = mp.get_property("path", "")
    if (url:find("gdrive://") == 1) then

        print("Detected gdrive:// protocol, rewriting url")
        url = "https://www.googleapis.com/drive/v3/files/" .. url:sub(10) .. "?alt=media"
        mp.set_property("stream-open-filename", url)

        OPTIONS = load_options()
        TOKEN = get_access_token(OPTIONS)
        set_auth_headers(TOKEN)

        mp.add_hook("on_load_fail", 50, on_load_fail_hook)
    else
        print("Not gdrive:// protocol, doing nothing.")
    end

end

function on_load_fail_hook()
    -- In case token expires, refresh it
    print('Token failed, refreshing...')
    TOKEN = get_access_token(OPTIONS)
    set_auth_headers(TOKEN)
end

-- Apparently hooks are bad and unsupported but ytdl_hook uses them.
-- The alternative, register_event('start-file'), seems to be non-blocking
-- which may cause race conditions e.g. mpv trying to load a non-existent
-- gdrive:// protocol before this script sets the correct url.
mp.add_hook("on_load", 50, on_load_hook)



-----------------------------
-- GNARLY INTERNALS FOLLOW
-----------------------------


function set_auth_headers(access_token)
    print("Setting GDrive authorization headers")
    headers = {}
    headers[1] = "Authorization: Bearer " .. access_token
    mp.set_property_native("file-local-options/http-header-fields", headers)
end


function load_options()
    local options = require 'mp.options'
    local o = {
        gdrive_client_id = "",
        gdrive_client_secret = "",
        gdrive_refresh_token = "",
    }
    options.read_options(o, "gdrive")
    return o
end


function get_access_token(o)
    local utils = require 'mp.utils'

    request_body = (
        "client_id=" .. o.gdrive_client_id ..
        "&client_secret=" .. o.gdrive_client_secret ..
        "&refresh_token=" .. o.gdrive_refresh_token ..
        "&grant_type=refresh_token"
    )
    print("Requesting token for client_id", o.gdrive_client_id:sub(1, 10) .. "[...]")

    -- Shelling out to curl instead of using the luasec library because by
    -- default luasec doesn't verify CA cert, and the non-default API is messy.
    -- Also requiring curl as a dependency is probably an easier sell than
    -- telling end-users to install some lua package.
    ret = mp.command_native({
        name = "subprocess",
        args = {
            "curl", "-s", "-X", "POST",
            "https://www.googleapis.com/oauth2/v4/token",
            "-H", "Accept: application/json",
            "-H", "Content-Type: application/x-www-form-urlencoded",
            "-d", request_body
        },
        capture_stdout=true
    })
    local resp_json, err = utils.parse_json(ret.stdout)
    access_token = resp_json["access_token"]
    print("Received access_token", access_token:sub(1, 10) .. "[...]")
    return access_token
end

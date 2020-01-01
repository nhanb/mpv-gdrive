TOKEN = os.getenv("TOKEN")

function load_gdrive()
    print("heeey")
    headers = mp.get_property_native("file-local-options/http-header-fields")
    headers[#headers + 1] = "Authorization: Bearer " .. TOKEN
    mp.set_property_native("file-local-options/http-header-fields", headers)
end

mp.register_event("start-file", load_gdrive)

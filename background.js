//tmdb api key stored in api-keys.js in  as const tmdb_api_key


chrome.runtime.onMessage.addListener(async (response, sender, callBack) => {
    if ("get" in response) {
        switch (response.get) {
            case "api":
                const key_list = {
                    tmdb: tmdb_api_key
                }
                callBack({ keys: key_list }); break;
            case "estimate":
                if (!("tt" in response)) {
                    callBack({ error: "missing tt" }); break;
                }
                const estimate = await estimate_full_size(response.tt);
                console.log(estimate);
                callBack({ estimation: estimate }); break;
            default:
                callBack({}); break;

        }
    }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, current_tab) => {
    if (/^https:\/\/www\.imdb\.com/.test(current_tab.url)) {
        const url_changed = "url" in changeInfo;
        if (url_changed) {
            chrome.tabs.sendMessage(tabId,{url:changeInfo.url});
        }
    }
});

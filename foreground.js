async function get_api_keys() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ get: "api" }, response => {
            resolve(response);
        });
    });
}

//set reciving end
chrome.runtime.onMessage.addListener((request, sender, senResponse) => {
    console.log(request);
});

console.log("frontend fully loaded");
get_api_keys().then(r => {
    //console.log(r);
    var tmdb_api_key = r.keys.tmdb;
    estimate_full_size(get_imdb_tt_id(window.location.href), tmdb_api_key).then(r => {
        render(r);
    })
});

/* investigate why this doesn't work
TODO
chrome.runtime.sendMessage({
    get:"estimate",
    tt:get_imdb_tt_id(window.location.href)
},response=>{
    console.log(response);
    //render(response.min);
})*/

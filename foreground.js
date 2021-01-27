function render(mins = 2650 /* mock value*/) {

    const box = document.querySelector(".title_wrapper .subtext");
    if (box === null)
        return;
    const separator = document.querySelector(".title_wrapper .subtext .ghost");

    const point_of_interest = document.querySelectorAll(".title_wrapper .subtext .ghost")[0];
    box.insertBefore(separator.cloneNode(true), point_of_interest);
    box.insertBefore(box.querySelector("time").cloneNode(true), point_of_interest);

    const time = document.querySelectorAll(".title_wrapper .subtext time")[1];;
    time.dateTime = "PT" + mins + "M";
    const hours = Math.floor(mins / 60);
    const remainder = mins - 60 * hours;
    time.innerText = `~ ${hours}h ${remainder != 0 ? `${remainder} min` : ""} full`;
}

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

function get_imdb_tt_id(url) {
    const res = url.match(/(tt[0-9]{5,9})/);
    return res === null ? null : res[0];
}

async function tmdb_type(imdb_tt_id = "tt2661044"/*test_value*/,tmdb_api_key) {
    if(imdb_tt_id === null)
        return {raw:null};
    const test_url = `https://api.themoviedb.org/3/find/${imdb_tt_id}?api_key=${tmdb_api_key}&language=en-US&external_source=imdb_id`
    let tmdb_response = await JSON_request(test_url);
    const r = {
        is_tv: false,
        raw: tmdb_response
    }
    if (tmdb_response.tv_results.length != 0) {
        r.is_tv = true;
        r.tv_raw = tmdb_response.tv_results[0];
    }
    return r;
}


async function JSON_request(url) {
    let promise = new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                resolve(JSON.parse(this.response));
            } else {
                // We reached our target server, but it returned an error
                console.log(this);
                reject(this.status);
            }
        };
        request.onerror = function () {
            // There was a connection error of some sort
            throw "Error. :( TODO";
        };

        request.send();
    });
    return promise;
}


async function estimate_full_size(imdb_tt_id,tmdb_api_key) {
    const data = await tmdb_type(imdb_tt_id,tmdb_api_key);
    if (data.is_tv) {
        const detail = await JSON_request(`https://api.themoviedb.org/3/tv/${data.tv_raw.id}?api_key=${tmdb_api_key}&language=en-US`);
        const t = detail.episode_run_time[0];
        let full = 0;
        if (detail.episode_run_time.length != 1)
            console.log(detail);
        detail.seasons.forEach((season) => {
            full += season.episode_count * t;
        });
        return full;
    }
    else {
        return data.raw;
    }
}
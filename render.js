function render(mins = 2650 /* mock value*/) {

    if(isNaN(mins))
        return;

    const box = document.querySelector(".title_wrapper .subtext");
    if (box === null) {
        render_new_layout(mins);
        return;
    }
    const separator = document.querySelector(".title_wrapper .subtext .ghost");

    const point_of_interest = document.querySelectorAll(".title_wrapper .subtext .ghost")[0];
    box.insertBefore(separator.cloneNode(true), point_of_interest);
    box.insertBefore(box.querySelector("time").cloneNode(true), point_of_interest);

    const time = document.querySelectorAll(".title_wrapper .subtext time")[1];;
    time.dateTime = "PT" + mins + "M";
    const hours = Math.floor(mins / 60);
    const remainder = mins - 60 * hours;
    time.innerText = `~ ${hours}h ${remainder != 0 ? `${remainder}min` : ""} full`;
}

function render_new_layout(mins = 2650 /* mock value*/) {

    const box = document.querySelector("ul[class*='ipc-inline-list ipc-inline-list--show-dividers']");
    if (box === null)
        return;

    box.appendChild(box.lastChild.cloneNode(true));

    const time = box.lastChild;
    const hours = Math.floor(mins / 60);
    const remainder = mins - 60 * hours;
    time.innerText = `~ ${hours}h ${remainder != 0 ? `${remainder}min` : ""} to watch all`;
}
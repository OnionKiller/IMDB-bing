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
    time.innerText = `${hours}h ${remainder != 0 ? `${remainder}m` : ""} full`;
}

function render_new_layout(mins = 2650 /* mock value*/) {

    const boxes = document.querySelectorAll("ul[class*=ipc-inline-list--show-dividers]");
    let box;
    boxes.forEach(n=>{
        if(n.childNodes[0].innerHTML == 'TV Series')
            box = n;
    })
    
    if (box === null)
    {
        console.log("ERROR IN NEW LAYOUT RENDER. Please check if selectors are borken.")
        return;
    }

    box.appendChild(box.lastChild.cloneNode(true));

    const time = box.lastChild;
    const hours = Math.floor(mins / 60);
    const remainder = mins - 60 * hours;
    time.innerText = `Full watch: ${hours}h ${remainder != 0 ? `${remainder}m` : ""} (~)`;
}
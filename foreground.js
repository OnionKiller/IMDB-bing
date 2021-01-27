function render() {
    const mock_mins = 2581;

    const box = document.querySelector(".title_wrapper .subtext");
    const separator = document.querySelector(".title_wrapper .subtext .ghost");

    box.appendChild(separator.cloneNode(true));
    box.appendChild(box.children[0].cloneNode(true));

    const time = box.lastChild;
    time.dateTime = "PT" + mock_mins + "M";
    time.innerText = "" + (mock_mins / 60).toFixed(2) + "h";

    console.log("frontend hello");
}
chrome.runtime.onMessage.addListener((request, sender, senResponse) => {
    console.log(request);
});
console.log("frontend fully loaded");
render();

const wsUrl = "wss://echo.websocket.org/"

const output = document.querySelector(".data-output-wrapper");
const btnSend = document.querySelector('.msg-send');
const btnGeo = document.querySelector('.get-geo');
const inputText =document.querySelector('.data-entry__input');

let websocket;

btnSend.addEventListener('click',  () => {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt) {
         const message = inputText.value;
         if(message !== "" && message.trim() !== "") {
             writeToScreenMyMsg(message);
             websocket.send(message)
         }else{
             alert("Значение не должно быть пустым")
         }
    };
    websocket.onmessage = function(evt) {
        writeToScreenRespMsg(evt.data);
    };

});

/*btnGeo.addEventListener('click',  () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let link = document.createElement("a");
            link.classList.add('my-geo');
            link.innerHTML = 'Гео-локация'
            link.href =`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`
            link.target="_blank"
            output.appendChild(link);
        });
    }
});*/

btnGeo.addEventListener('click',  () => {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt){
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let link = document.createElement("a");
            link.classList.add('my-geo');
            link.innerHTML = 'Гео-локация'
            link.href =`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`
            link.target="_blank"
            output.appendChild(link);
            websocket.send(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`)
        });
    }}

});




function writeToScreenMyMsg(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.classList.add('my-msg');
    pre.innerHTML = message;
    output.appendChild(pre);
    return pre
}

function writeToScreenRespMsg(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.classList.add('resp-msg');
    pre.innerHTML = message;
    output.appendChild(pre);
    return pre
}



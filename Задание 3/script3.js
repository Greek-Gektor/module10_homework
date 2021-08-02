
const wsUri = "wss://echo.websocket.org/"

const output = document.querySelector(".data-output-wrapper");
/*const btnOpen = document.querySelector('.j-btn-open');*/
const btnSend = document.querySelector('.msg-send');
const inputText =document.querySelector('.data-entry__input');

let websocket;

btnSend.addEventListener('click',  () => {
    websocket = new WebSocket(wsUri);
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



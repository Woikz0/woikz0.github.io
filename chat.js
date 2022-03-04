const sendBtn = document.getElementById("send-btn");
const names = [];
currentcolor = null;
currentnick = null;

function sendMessage() {
    nickname = document.getElementById("nickname-box").value;
    msg = document.getElementById("message-box").value;

    if (nickname !== "") {
        currentnick = nickname;
        write(nickname, msg);
    }
}

function write(nick, msg) {
    chatArea = document.getElementById("chat-area").textContent
        += "\n[" + nick + "]: " + msg;
}


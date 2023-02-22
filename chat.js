import database from './database.js'


const sendBtn = document.getElementById("send-btn");
const names = [];
var currentcolor = null;


document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

document.getElementById("send-btn").addEventListener("click", (e) => {
    sendMessage();
})

document.onload = OnDocLoad();

function OnDocLoad() {
    getMessages();
    window.setInterval(getMessages, 1000);
}

function sendMessage() {
    var nickname = document.getElementById("nickname-box").value;
    var msg = document.getElementById("message-box").value;

    if (nickname !== "") {
        write(nickname, msg);

        sendToDatabase(nickname, msg);
    }
}

function write(nick, msg) {
    document.getElementById("chat-area").textContent
        += "\n[" + nick + "]: " + msg;

}

function clearChat()
{
    document.getElementById("chat-area").textContent = "";
}


function getMessages() {
    const dbref = database.ref(database.db);

    const msgsRef = database.child(dbref, "Msgs/");

    database.get(dbref, msgsRef).then((snapshot) => {
        var msgs = Object.entries(snapshot.val());

        clearChat();
        Object.entries(msgs[0][1]).forEach(element => {
            const message = element[1];

            write(message.UserName, message.Content);
        });
    })

}


function sendToDatabase(nickname, msg) {
    const random = Math.floor(Math.random() * 10000) + 1;

    database.set(database.push(database.ref(database.db, "Msgs/")), {
        UserName: nickname,
        Content: msg
    });

    
    document.getElementById("message-box").value = '';
}



import database from './database.js'
import ChatEvents from './ChatEvents.js'

const sendBtn = document.getElementById("send-btn");
const names = [];
var currentcolor = null;

var timerr = 0;

var banned = false;

var previusMsgTime = 0;
var spamCount = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        var nickname = document.getElementById("nickname-box").value;
        var msg = document.getElementById("message-box").value;
        sendMessage(nickname, msg);
    }
});

document.getElementById("send-btn").addEventListener("click", (e) => {

    var nickname = document.getElementById("nickname-box").value;
    var msg = document.getElementById("message-box").value;
    sendMessage(nickname, msg);
})

document.onload = OnDocLoad();

function OnDocLoad() {
    getMessages();
    window.setInterval(getMessages, 1000);
    window.setInterval(timer, 100);
}

function timer() {
    timerr = timerr + 0.1;
}

function sendMessage(nickname, msg) {
    var diff = timerr - previusMsgTime;

    if (diff < 1) {
        spamCount++;
        console.log(spamCount);
        if (spamCount > 5) {
            banned = true;
            sendToDatabase("Client", "User " + nickname + " kicked.");

        }

    }

    if (nickname !== "" && banned === false) {
        write(nickname, msg);

        sendToDatabase(nickname, msg);
    }
    previusMsgTime = timerr;
    console.log(previusMsgTime);
}

function write(nick, msg) {
    document.getElementById("chat-area").textContent
        += "\n[" + nick + "]: " + msg;

}

function clearChat() {
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

        var lastIndex = Object.entries(msgs[0][1]).length - 1;

        if (ChatEvents((Object.entries(msgs[0][1])[lastIndex][1].Content)) == false) {

            document.getElementById("chat-area").style.backgroundImage = "none";
        }
    })
}

function setBgDefault() {
}

function sendToDatabase(nickname, msg) {
    const random = Math.floor(Math.random() * 10000) + 1;

    database.set(database.push(database.ref(database.db, "Msgs/")), {
        UserName: nickname,
        Content: msg
    });


    document.getElementById("message-box").value = '';
}



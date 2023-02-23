import database from './database.js'
import ChatEvents from './ChatEvents.js'
import Messager from './Messager.js'


const sendBtn = document.getElementById("send-btn");
const names = [];
var currentcolor = null;
var color;
var ip;

var timerr = 0;
var banned = false;
var previusMsgTime = 0;
var spamCount = 0;
var firstLoad = false;

document.onload = OnDocLoad();

function OnDocLoad() {
    getMessages();
    window.setInterval(getMessages, 1000);
    window.setInterval(timer, 100);

    color = Messager.GetRandomColor();

    $.getJSON("https://api.ipify.org?format=json", function(data) {
    ip = data.ip;
})
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        var nickname = document.getElementById("nickname-box").value;
        var msg = document.getElementById("message-box").value;
        sendMessage(nickname, msg, color);

        setScrollEnd();

        var msg = document.getElementById("message-box").value = '';
    }
});

document.getElementById("send-btn").addEventListener("click", (e) => {

    var nickname = document.getElementById("nickname-box").value;
    var msg = document.getElementById("message-box").value;
    sendMessage(nickname, msg, color);

    setScrollEnd();

    var msg = document.getElementById("message-box").value = '';
})

function setScrollEnd() {
    document.getElementById("chat-area").scrollTop = document.getElementById("chat-area").scrollHeight;
}

function timer() {
    timerr = timerr + 0.1;
}

function sendMessage(nickname, msg, color) {

    if (nickname == '' || banned === true) return

    var diff = timerr - previusMsgTime;

    if (diff < 1) {
        spamCount++;
        console.log(spamCount);
        if (spamCount > 5 && banned == false) {
            banned = true;
            alert("mal");
            sendToDatabase("Client", "User " + nickname + " kicked.");
        }
    }

    Messager.AddMessageSpan(nickname, msg, color);
    sendToDatabase(nickname, msg, color);

    previusMsgTime = timerr;
    console.log(previusMsgTime);
}

function getMessages() {
    const dbref = database.ref(database.db);

    const msgsRef = database.child(dbref, "Msgs/");

    database.get(dbref, msgsRef).then((snapshot) => {
        var msgs = Object.entries(snapshot.val());

        Messager.ClearChat();
        Object.entries(msgs[0][1]).forEach(element => {
            const message = element[1];

            Messager.AddMessageSpan(message.UserName, message.Content, message.Color);
        });

        if (firstLoad == false) {
            firstLoad = true;
            setScrollEnd();
        }
        var lastIndex = Object.entries(msgs[0][1]).length - 1;

        if (ChatEvents((Object.entries(msgs[0][1])[lastIndex][1].Content)) == false) {

            document.getElementById("chat-area").style.backgroundImage = "none";
        }
    })

}


function sendToDatabase(nickname, msg, color) {

    database.set(database.push(database.ref(database.db, "Msgs/")), {
        UserName: nickname,
        Content: msg,
        Color: color,
        Adress: ip,
        Screen: `${window.screen.width}x${window.screen.height}`,
        UserAgent: window.navigator.userAgent
    });

}



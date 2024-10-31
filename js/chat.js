import database from './database.js'
import ChatEvents from './ChatEvents.js'
import Messager from './Messager.js'
import Notify from './NotificationManager.js'


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

var nickname;

document.onload = OnDocLoad();

function OnDocLoad() {
    getMessages();
    //window.setInterval(getMessages, 1000);
    window.setInterval(timer, 100);

    color = Messager.GetRandomColor();

    $.getJSON("https://api.ipify.org?format=json", function (data) {
        ip = data.ip;

        Notification.requestPermission();
    })
}
//prevent focusing
document.addEventListener('focusin', (event) => {
    event.preventDefault();
    this.blur();
});
document.addEventListener('focus', (event) => {
    event.preventDefault();
    this.blur();
});


window.addEventListener('resize', () => {

    alert("resized")
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        nickname = document.getElementById("nickname-box").value;
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

const starCountRef = database.ref(database.db, 'Msgs/');
database.onValue(starCountRef, (snapshot) => {
    getMessages();
});

function getMessages() {
    const dbref = database.ref(database.db);

    database.get(database.child(dbref, 'Msgs/')).then((snapshot) => {
        var msgs = Object.entries(snapshot.val());

        Messager.ClearChat();

        var message;
        msgs.forEach(element => {
            message = element[1];

            var highlight = false;

            if (message.Content.includes("@" + nickname)) highlight = true;

            Messager.AddMessageSpan(message.UserName, message.Content, message.Color, highlight);
        });

        if (firstLoad == false) {
            firstLoad = true;
            setScrollEnd();
        }

        if (msgs[msgs.length - 1][1].Content.includes("@" + nickname)) {
            Notify.Notify(message);
        }

        if (ChatEvents(msgs[msgs.length - 1][1].Content) == false) {

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
        UserAgent: window.navigator.userAgent,
        isNotificated: false
    });

}



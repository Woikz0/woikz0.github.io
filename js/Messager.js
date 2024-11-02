var colors = ['#00ff73', '#ff00b3', '#ff0000', '#c300ff', '#a6ff00', '#ffe600', '#ffc400']
const timeSpanColor = '#006083'

var gifkeywords = [
    {
        key: "sad",
        path: "../media/gif/sad.gif"
    },
    {
        key: "haha",
        path: "../media/gif/haha.png"
    },
    {
        key: "goddamit",
        path: "../media/gif/goddamit.png"
    },
    {
        key: "lastik",
        path: "../media/gif/lastik.png"
    },
    {
        key: "pain",
        path: "../media/gif/pain.png"
    },
    {
        key: "alenur",
        path: "../media/gif/ale.png"
    },
]

function GetRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function AddMessageSpan(nickname, msg, color, time, highlighted = false) {
    const parent = document.getElementById("chat-area");

    const box = document.createElement("div");
    box.id = 'msgBox';
    if (highlighted) box.style.backgroundColor = '#ffb83454';

    const nickSpan = document.createElement("span");
    nickSpan.textContent = `[${nickname}]`;
    nickSpan.style.color = color;
    box.appendChild(nickSpan);

    var isGif = gifkeywords.map(obj => obj.key).includes(msg.toLowerCase());
    if (isGif) {
        console.log("gid dedected");

        const contentImg = document.createElement("img");
        var index = gifkeywords.map(obj => obj.key).indexOf(msg.toLowerCase());
        contentImg.src = gifkeywords[index].path;

        box.appendChild(contentImg);
    }
    else {
        const contentSpan = document.createElement("span");
        contentSpan.textContent = msg;
        box.appendChild(contentSpan);
    }

    const timeSpan = document.createElement("span");
    timeSpan.textContent = time;
    timeSpan.style.color = timeSpanColor;
    timeSpan.style.fontSize = 'small';
    box.appendChild(timeSpan);
    console.log(time);

    parent.appendChild(box);
}

function ClearChat() {
    const parent = document.getElementById("chat-area");

    parent.innerHTML = '';
}

export default { AddMessageSpan, GetRandomColor, ClearChat };
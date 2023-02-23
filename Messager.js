var colors = ['#00ff73', '#ff00b3', '#ff0000', '#c300ff', '#a6ff00', '#ffe600', '#ffc400']

function GetRandomColor()
{
    return colors[Math.floor(Math.random()*colors.length)];
}

function AddMessageSpan(nickname, msg, color) {
    const parent = document.getElementById("chat-area");

    const box = document.createElement("div");
    box.id = 'msgBox';

    const nickSpan = document.createElement("span");
    nickSpan.textContent = `[${nickname}]`;
    nickSpan.style.color = color;
    box.appendChild(nickSpan);

    const contentSpan = document.createElement("span");
    contentSpan.textContent = msg;
    box.appendChild(contentSpan);

    parent.appendChild(box);
}

function ClearChat() {
    const parent = document.getElementById("chat-area");

    parent.innerHTML = '';
}

export default {AddMessageSpan, GetRandomColor, ClearChat};
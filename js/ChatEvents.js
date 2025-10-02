

function checkWord(word) {
    switch (word) {
        case "samsa":
            document.getElementById("chat-area").style.backgroundImage = "url('wow.gif')";
            break;
        case "obama":
            document.getElementById("chat-area").style.backgroundImage = "url('https://media.tenor.com/lOVqHrlKsT0AAAAj/obama-prism.gif')";
            break;
        case "owye":
            document.getElementById("chat-area").style.backgroundImage = "url('anim.gif')";
            break;
        case "31":
            document.getElementById("chat-area").style.backgroundImage = "url('qwe.jpg')";
            break;
        case "amk":
            document.getElementById("chat-area").style.backgroundImage = "url('amk.webp')";
            break;
        case "mahmut":
            document.getElementById("chat-area").style.backgroundImage = "url('goril.png')";
            break;
        case "buney":
            document.getElementById("chat-area").style.backgroundImage = "url('unnamed.png')";
            break;
        case "bune":
            document.getElementById("chat-area").style.backgroundImage = "url('unnamed.png')";
            break;   
        case "ccc":
            document.getElementById("chat-area").style.backgroundImage = "url('ccc.jpg')";
            break;   
        case "efe2":
            document.getElementById("chat-area").style.backgroundImage = "url('efe2.jpg')";
            break;   
        default:
            return false;
            break;
    }

    return true;
}

export default checkWord;















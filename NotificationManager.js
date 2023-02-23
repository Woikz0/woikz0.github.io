
function Notify(message) {
    const notif = new Notification(`${message.UserName}`, {
        body: `${message.Content}`,
        icon: "./amk.webp"
    });

}

export default { Notify }

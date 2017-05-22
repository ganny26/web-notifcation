$(document).ready(function () {
    var socket = io();
    $('#btnNotify').click(function (event) {
        var message = $('#message').val();
        socket.emit('send message', { message: message });
        socket.on('notify', function (msg) {
            notifyMe(msg.message);
        })
    })
})

var title = 'Article Reader';
//var body = 'Hello world';
var icon = 'images/icon-192x192.png';



function sendNotification(title, options) {
    var notification = new Notification(title, options);
}

function notifyMe(message) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var options = {
            body: message,
            icon: icon
        }
        sendNotification(title, options);
    } else if (Notification.permission !== "denied") {
        var options = {
            body: message,
            icon: icon
        }
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                sendNotification(title, options);
            }
        });
    }

}

var title = 'Article Reader';
var body = 'Hello world';
var icon = 'images/icon-192x192.png';

var options = {
    body: body,
    icon: icon
}

function sendNotification(title, options) {
    var notification = new Notification(title, options);
}

function notifyMe() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        sendNotification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                sendNotification(title, options);
            }
        });
    }

}

$(document).ready(function () {
  var socket = io.connect('http://localhost:3000');
    $('#btnNotify').click(function () {
      
        socket.emit('send', 'hello from client');
    })

    $('#btnGet').click(function () {
       
        socket.on('receive', function (data) {
            $('#message').text(data);
            var body = data;
            var icon = 'images/icon-192x192.png';
            var options = {
                body: body,
                icon: icon
            }
            notifyMe(options);
        })

    })

    $('#lstSearch').keypress(function(e){
        socket.emit('search',e.target.value);
    })

    socket.on('found', (data) => console.log('found: ' + data))

})


function sendNotification(title, options) {
    var notification = new Notification(title, options);
}

function notifyMe(options) {
      var title = 'Article Reader';
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        sendNotification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                sendNotification(title, options);
            }
        });
    }

}

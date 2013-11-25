var connect = require('connect');

connect.createServer(
    connect.logger(),
    connect.static(__dirname + '/src', {
        index: 'app.html'
    })
).listen(8080);

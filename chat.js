// http://chimera.labs.oreilly.com/books/1234000001808/ch02.html#I_sect12_d1e1886 
var net = require('net');

var chatServer = net.createServer(),
	clientList = [];

chatServer.on('connection', function(client){
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hi ' + client.name + '\n');

	clientList.push(client);

	client.on('data', function (data){
		broadcast(data, client);
	});

	function broadcast(message, client){
		for (var i = 0; i < clientList.length; i++) {
			if (client !== clientList[i]) {
				// write this data to all clients 
				clientList[i].write(client.name + ' says: ' + message + '\n');
			}

		}
	}
})

chatServer.listen(9000);
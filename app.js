var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 9000;
var io = require('socket.io')(server);
var userNum=0;
var userList=[];
var cubeOList=[],cubeAList=[];

app.use('/', express.static(__dirname + '/public'));

function serverUpCallBack(){
	console.log("listening on port: " + port);
	console.log(cubeOList);
}





function incomingSocket(socket){
	// socket.emit("welcome message", "Welcome user!");

	console.log('user connected');
	io.emit("New User", "new user here");

	socket.emit('welcome message',{"Num":userNum,'userList':userList});
	
	
	socket.on('userinfo',function(data){
	// io.emit("totalUsers", userNum);
	userList.push(data);	
		userNum++;
	//above here the index of the element in the array, equals to the its userNum
	})


// 	socket.on('incoming data', function(data){
// 	console.log(data);

// })


	socket.on('incoming oData', function(data){
		var dataFromServer = {
			'x' : data.oAlpha,
			'y' : data.oBeta,
			'z' : data.oGamma
		};
		cubeOList[data.numAssigned]=dataFromServer;
		console.log("Orientation: ");
		console.log(userNum);
		// console.log(cubeOList);
		io.emit('orientationMsg',cubeOList);
	})

	socket.on('incoming accelData', function(data){
		var dataFromServer = {
			'x': data.accelX,
			'y': data.accelY,
			'z': data.accelZ
		};

		cubeAList[data.numAssigned]=dataFromServer;
		console.log("Accel: ");
		console.log(cubeOList);
		// console.log(cubeAList[data.userNum]);
		io.emit('accelMsg',cubeAList);
	})
}

io.on('connection', incomingSocket);

server.listen(port, serverUpCallBack);
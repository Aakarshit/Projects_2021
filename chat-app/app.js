const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const app=express();
const port=80;
const server=http.Server(app);
const io=socketio(server);
const path=require('path');

app.use('/',express.static(path.join(__dirname,'static')));

const mapping={};

io.on('connection',(socket)=>{
    console.log(socket.id + `====> Connected`);

    socket.on('login',(data)=>{
        mapping[socket.id]=data.name;
        //console.log(data.name);
    });
    socket.on('send-msg',(data)=>{
        //console.log(`${socket.id}  says ${data.msg}` );
        //console.log(data.msg);
        io.emit('recieved-msg',{
            name:mapping[socket.id],
            msg:data.msg,
        })
    })
});







server.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});
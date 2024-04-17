import express from 'express';
import { Server } from 'socket.io';
import http from 'http';


const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
    }
});

io.on('connection',(socket)=>{
    console.log("A user is connecte with socket id:"+socket.id);

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    })
})


export {app,io,server}
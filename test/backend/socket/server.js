import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import getUser from '../utils/searchUser.js';
import { send } from 'process';
import send_message from '../utils/sendMessage.js';
import getMessages from '../utils/getMessages.js';
import GetChats from '../utils/getChats.js';


const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
    }
});

const userSocketMap={};

io.on('connection',(socket)=>{
    console.log("A user is connecte with socket id:"+socket.id);
    const UserID= socket.handshake.query.UserID;
    if(UserID!=="undefined") userSocketMap[UserID]=socket.id;

    socket.on("greetings",data=>{
        console.log("greeting sreceived:",data)
    })

    socket.on("search_val",data=>{sendSearchUser(data)})
    socket.emit("return_greet","Hello there!!!")

    socket.on("send_message",(data)=>{
        sendmsg(data);
    })

    socket.on('get_messages_user',data=>{
        getmsg(data);
    })

    socket.on("get_chats",data=>{
        getchats(data);
    })

    socket.on("disconnect",()=>{
        delete userSocketMap[UserID];
        console.log("User Disconnected");
    })
})

async function sendSearchUser(data){
    const user=await getUser(data[0]);
    const id=data[1]
    io.to(userSocketMap[id]).emit("search_user",user);

}

async function sendmsg(data){
    const new_message=await send_message(data);
    const ids=Object.values(data.ids)
    io.to(userSocketMap[ids[0]]).to(userSocketMap[ids[1]]).emit("send_save_message",new_message)
}

async function getmsg(data){
    const messages=await getMessages(data);
    console.log("get messages ddata :",messages)
    const id=data.login_user;
    io.to(userSocketMap[id]).emit("receive_messsages",messages);

}

async function getchats(data){
    const chats=await GetChats(data);
    console.log(chats.length)
    io.to(userSocketMap[data]).emit("get_user_chats",chats)

}


export {app,io,server}
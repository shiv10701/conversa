import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import getUser from '../utils/searchUser.js';
import { send } from 'process';
import send_message from '../utils/sendMessage.js';
import getMessages from '../utils/getMessages.js';
import GetChats from '../utils/getChats.js';
import setseenmessage from '../utils/setSeen.js'
import send_message_group from '../utils/sendGroupMessage.js';


const app = express();

// ---------------------------------
let connections = {}
let messages = {}
let timeOnline = {}
// ---------------------------------

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("A user is connecte with socket id:" + socket.id);
    const UserID = socket.handshake.query.UserID;
    if (UserID !== "undefined") userSocketMap[UserID] = socket.id;

    socket.on("greetings", data => {
        console.log("greeting sreceived:", data)
    })

    socket.on("search_val", data => { sendSearchUser(data) })
    socket.emit("return_greet", "Hello there!!!")
    io.emit("online_users", Object.keys(userSocketMap))

    socket.on("send_message", (data) => {
        sendmsg(data);
    })

    socket.on('get_messages_user', data => {
        getmsg(data);
    })

    socket.on("get_chats", data => {
        getchats(data);
    })

    socket.on("set_seen_message", data => {
        setchatseen(data);
    })

    socket.on("get_new_group_chat", data => {
        get_new_group_chat(data);
    })

    socket.on("send_group_message", data => {
        send_group_message(data);
    })

    // ------------------ Video Calling --------------------------------

    socket.on("join-call", (path) => {
        // console.log('video calls been started ********************************')
        // console.log('connections[path]-->',connections[path])
        if (connections[path] === undefined) {
            connections[path] = []
        }


        connections[path].push(socket.id)
        timeOnline[socket.id] = new Date();
        // connections[path].forEach(elem => {
        //     io.to(elem)
        // })
        for (let a = 0; a < connections[path].length; a++) {
            io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
        }
        if (messages[path] !== undefined) {
            for (let a = 0; a < messages[path].length; ++a) {
                io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                    messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
            }
        }
    })

    socket.on("signal", (toId, message) => {
        io.to(toId).emit("signal", socket.id, message);
    })

    socket.on("make_video_request", (toId, video_url, Local_U_data) => {
        const socketId = userSocketMap[toId];
        io.to(socketId).emit("video_request_from_server", video_url, Local_U_data);
        console.log(userSocketMap);
    })

    socket.on("cut_video_request", (toId) => {
        const socketId = userSocketMap[toId];
        io.to(socketId).emit("cut_video_from_server", socketId);
    })
    // ----------  Stop audio --------------------
    socket.on("stop_both_audio", (remoteUId,localUId) => {
        const toRemoteSocketId = userSocketMap[remoteUId];
        const toLocalSocketId = userSocketMap[localUId];
        io.to(toRemoteSocketId).emit("stop_remote_audio", toRemoteSocketId);
        io.to(toLocalSocketId).emit("stop_Local_audio", toLocalSocketId);
        console.log('Cut Call **********', 'remoteUId ->', remoteUId, 'localUId ->', localUId);
        console.log('Cut Call **********', 'toRemoteSocketId ->', toRemoteSocketId, 'toLocalSocketId ->', toLocalSocketId);
    })

    //   -------------------- Disconnect --------------------


    socket.on("disconnect", () => {
        delete userSocketMap[UserID];
        console.log("User Disconnected");
        io.emit("online_users", Object.keys(userSocketMap))
    })
})

async function sendSearchUser(data) {
    const user = await getUser(data[0]);
    const id = data[1]
    io.to(userSocketMap[id]).emit("search_user", user);

    // ------------------ Disconnect Video Calling --------------------------------

    var diffTime = Math.abs(timeOnline[socket.id] - new Date())
    var key
    for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
        for (let a = 0; a < v.length; ++a) {
            if (v[a] === socket.id) {
                key = k
                for (let a = 0; a < connections[key].length; ++a) {
                    io.to(connections[key][a]).emit('user-left', socket.id)
                }
                var index = connections[key].indexOf(socket.id)
                connections[key].splice(index, 1)
                if (connections[key].length === 0) {
                    delete connections[key]
                }
            }
        }
    }
}

async function sendmsg(data) {
    const new_message = await send_message(data);
    const ids = Object.values(data.ids)
    io.to(userSocketMap[ids[0]]).to(userSocketMap[ids[1]]).emit("send_save_message", new_message)
}

async function getmsg(data) {
    const messages = await getMessages(data);
    const id = data.login_user;
    io.to(userSocketMap[id]).emit("receive_messsages", messages);

}

async function getchats(data) {
    const chats = await GetChats(data);
    io.to(userSocketMap[data]).emit("get_user_chats", chats)

}

async function setchatseen(data) {
    const msg = await setseenmessage(data);
    console.log(msg);
}

async function get_new_group_chat(data) {
    console.log(data);
    data.users.forEach((user) => {
        if (userSocketMap[user]) {
            io.to(userSocketMap[user]).emit("get_new_group_chat", data)
        }
    })
}

async function send_group_message(data) {
    const msg = await send_message_group(data);
    const new_data = { new_message: msg.new_message }
    msg.chat_users.forEach((item) => {
        if (userSocketMap[item]) {
            io.to(userSocketMap[item]).emit("send_save_message", new_data)
        }
    })
}


export { app, io, server }

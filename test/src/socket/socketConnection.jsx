import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'

export const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider=({children})=>{

    const user=useSelector(state=>state.user_data);
    const [socket,setSocket]=useState(null);

    let [online_users,setOnlineUsers]=useState([]);
    useEffect(()=>{
        console.log("user is :",JSON.stringify(user._id));
        if(Object.keys(user).length!==0){
            const socket=io("https://1f03-103-180-210-86.ngrok-free.app",{query:{UserID:user._id},extraHeaders: {
                'ngrok-skip-browser-warning': 'true' // Example of a custom header
              }});
            setSocket(socket);
            socket.emit("greetings","Hello");

            socket.on("online_users",data=>{setOnlineUsers(data);console.log("online users list:",data);})

            
            return ()=>socket.close();
            
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[user])
    
    return (
        <SocketContext.Provider value={{socket,online_users}}>
            {children}
        </SocketContext.Provider>
    )
};
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
    useEffect(()=>{
        console.log("user is :",JSON.stringify(user._id));
        if(Object.keys(user).length!==0){
            const socket=io("http://localhost:5000",{query:{UserID:user._id}});
            setSocket(socket);
            socket.emit("greetings","Hello");

            socket.on("return_greet",(data)=>{
                console.log("return Greet:",data)
            })
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
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
};
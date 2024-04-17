import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'

export const SocketContext=createContext();

export const SocketContextProvider=({children})=>{

    const user=useSelector(state=>state.user_data);
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
        if(user){
            const socket=io("http://localhost:5000");
            setSocket(socket);
            return ()=>socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
};
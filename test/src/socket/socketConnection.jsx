import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import { add_new_chat, set_messages, set_selected_chatid } from "../components/actions/actions";
import pop_sound_nitification from '../components/sounds/pop_sound_notification.mp3'

export const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider=({children})=>{

    const user=useSelector(state=>state.user_data);
    const [socket,setSocket]=useState(null);
    const dispatch=useDispatch()
    const sound=new Audio(pop_sound_nitification)
    let [new_msg_data,setNewMsgData]=useState("")

    let [online_users,setOnlineUsers]=useState([]);
    useEffect(()=>{
        if(Object.keys(user).length!==0){
            const socket=io("https://conversa-3.onrender.com/",{query:{UserID:user._id},extraHeaders: {
                'ngrok-skip-browser-warning': 'true' // Example of a custom header
              }});
            setSocket(socket);
            socket.emit("greetings","Hello");

            socket.on("online_users",data=>{setOnlineUsers(data);})
              socket.on("get_new_group_chat",data=>{dispatch(add_new_chat(data))})

              socket.on("send_save_message",data=>{
                if(data.new_chat){
                  dispatch(add_new_chat(data.new_chat))
                  setNewMsgData(data.new_message);
                  dispatch(set_selected_chatid(data.new_chat._id))
                  sound.play();
                }
                else{
                  console.log(data)
                  setNewMsgData(data.new_message);
                  sound.play()
                }
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

    useEffect(()=>{dispatch(set_messages(new_msg_data));},[new_msg_data])
    
    return (
        <SocketContext.Provider value={{socket,online_users}}>
            {children}
        </SocketContext.Provider>
    )
};
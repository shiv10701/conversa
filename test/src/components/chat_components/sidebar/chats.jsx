import React, { useEffect, useState } from "react";
import SingleChat from "./single_chat";
import { useDispatch, useSelector } from "react-redux";
import { SocketContextProvider, useSocketContext } from "../../../socket/socketConnection";
import { load_chats, set_messages, set_selected_chatid } from "../../actions/actions";

function Chats(){
  const search_users=useSelector(state=>state.search_user);
  const user_data=useSelector(state=>state.user_data);
  const {socket,online_users}=useSocketContext();
  const dispatch=useDispatch();
  const chats=useSelector(state=>state.chats);
   
  let [messages,setMessages]=useState("")
  let[chat_id,setChatID]=useState("")

useEffect(()=>{
  socket.emit("get_chats",user_data._id);
  socket.on("get_user_chats",data=>{dispatch(load_chats(data))})
},[user_data])

useEffect(()=>{
  if(chats && chats.length!==0){
    getMessagesForChats()
  }
},[chats])

function getMessagesForChats(){
  chats.map((item)=>{
    const details={login_user:user_data._id,chat_id:item._id}
    socket.emit("get_messages_user",details)
    socket.on("receive_messsages",data=>{setData(data)});
  });
}
function setData(data){
  if(data!==null ){
    setChatID(data.chat_id)
    setMessages(data.messages)
}
}

useEffect(()=>{
  if(messages!=""){
    dispatch(set_messages(messages,chat_id))
    setMessages("");
  }

},[messages,chat_id])

  if(Object.keys(search_users).length!==0){
    return (
      <div className="chat-sidebar-channel scroller mt-4 pl-3">
        <ul className="iq-chat-ui nav flex-column nav-pills">
          {Object.values(search_users).map((item)=>{return <SingleChat item={item} user={user_data}/>})}
        </ul>
      </div>
    );
  }
  else if(chats){
    if(chats.length!==0){
      
    return (
      <div className="chat-sidebar-channel scroller mt-4 pl-3" >
        <ul className="iq-chat-ui nav flex-column nav-pills">
          {chats.map((item)=>{return <SingleChat item={item} user={user_data}/>})}
        </ul>
      </div>
    );
    }
  }
  else{
    return (
        <div className="chat-sidebar-channel scroller mt-4 pl-3 d-flex align-items-center justify-content-center">
                        <ul className="iq-chat-ui nav flex-column nav-pills">
                          <li className="d-flex flex-column">
                          <img
                              src="images/loader.gif"
                              style={{ height: 80, width: 90 }}
                              className="img-fluid align-self-center"
                              alt="logo"
                            />
                              <span className="h5">No Chats....</span>
                          </li>
                        </ul>
                      </div>
    );}
}

export default Chats;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_messages, set_selected_chat, set_selected_chatid,set_seen } from '../../actions/actions';
import { useSocketContext } from '../../../socket/socketConnection';

export default function SingleChat(props) {
  const dispatch=useDispatch();
  const {socket,online_users}=useSocketContext();
  
  let [messages,setMessages]=useState("")
  let[chat_id,setChatID]=useState("")
  let this_user_id;
  let [isOnline,setIsOnline]=useState(false)
  const unseen_chats=useSelector(state=>state.unseen_chats)
  let logged_in_user;

  useEffect(()=>{
    if(online_users!==null){
      if(online_users.includes(this_user_id)){
        setIsOnline(true)
      }
      else{setIsOnline(false)}
    }
  },[online_users])
  

  function setSelected(item,chat_id,e){
    e.preventDefault();
    const data={chat_id:chat_id,user:logged_in_user,other_user:this_user_id}
    socket.emit("set_seen_message",data)
    dispatch(set_seen(chat_id))
    dispatch(set_selected_chat(item))
    dispatch(set_selected_chatid(chat_id))
    // const details={login_user:props.user._id,chat_id:chat_id}
    // console.log("this is frontend details data:",details)
    // socket.emit("get_messages_user",details)
    // socket.on("receive_messsages",data=>{console.log("THis is socket ddata:",data);if(data!==null){setChatID(data.chat_id);setMessages(data.messages)}});
  }

  useEffect(()=>{
      dispatch(set_selected_chatid(chat_id))
      dispatch(set_messages(messages,chat_id))
  },[messages])

  if(props.item ){
    if(props.item.chat_type==="Personal"){
      logged_in_user=props.user._id;
      this_user_id=props.item.users[0]._id===props.user._id?props.item.users[1]._id:props.item.users[0]._id;
      return (
          <li key={props.item._id} onClick={(e)=>setSelected(props.item.users[0]._id===props.user._id?props.item.users[1]:props.item.users[0],props.item._id,e)}>
          <a data-toggle="pill" href="#chatbox1" >
            <div className="d-flex align-items-center">
              <div className="avatar mr-3">
                <img
                  src="images/user/05.jpg"
                  alt="chatuserimage"
                  className="avatar-50 "
                />
                {isOnline?<span className="avatar-status">
                  <i className={`ri-checkbox-blank-circle-fill ${isOnline?"text-success":""}`} />
                </span>:""}
                
              </div>
              <div className="chat-sidebar-name">
                <h6 className="mb-0">{props.item.users[0]._id===props.user._id?props.item.users[1].name:props.item.users[0].name}</h6>
              </div>
              {unseen_chats[props.item._id]!==0?<div className="chat-meta float-right text-center mt-2">
                                  <div className="chat-msg-counter bg-primary text-white">
                                    {unseen_chats[props.item._id]}
                                    {/* {console.log(unseen_chats[props.item._id],props.item._id)} */}
                                    {console.log("whole unseen chats:",unseen_chats)}
                                  </div>
                                </div>:""}
              
            </div>
          </a>
        </li>
      );
    }
    else{
      return (
          <li key={props.item._id} onClick={(e)=>setSelected(props.item,e)}>
          <a data-toggle="pill" href="#chatbox1" >
            <div className="d-flex align-items-center">
              <div className="avatar mr-3">
                <img
                  src="images/user/05.jpg"
                  alt="chatuserimage"
                  className="avatar-50 "
                />
                <span className="avatar-status">
                  <i className="ri-checkbox-blank-circle-fill text-success" />
                </span>
              </div>
              <div className="chat-sidebar-name">
                <h6 className="mb-0">{props.item.name}</h6>
              </div>
              
            </div>
          </a>
        </li>
      );
    }
    return (
        <li key={props.item._id} onClick={(e)=>setSelected(props.item,e)}>
        <a data-toggle="pill" href="#chatbox1" >
          <div className="d-flex align-items-center">
            <div className="avatar mr-3">
              <img
                src="images/user/05.jpg"
                alt="chatuserimage"
                className="avatar-50 "
              />
              <span className="avatar-status">
                <i className="ri-checkbox-blank-circle-fill text-success" />
              </span>
            </div>
            <div className="chat-sidebar-name">
              <h6 className="mb-0">{props.item.name}</h6>
            </div>
            
          </div>
        </a>
      </li>
      )
  }
  else{
    return (
      <li>
      <a data-toggle="pill" href="#chatbox1">
        <div className="d-flex align-items-center">
          <div className="avatar mr-3">
            <img
              src="images/user/05.jpg"
              alt="chatuserimage"
              className="avatar-50 "
            />
            <span className="avatar-status">
              <i className="ri-checkbox-blank-circle-fill text-success" />
            </span>
          </div>
          <div className="chat-sidebar-name">
            <h6 className="mb-0">Team Discussions</h6>
            <span>Lorem Ipsum is</span>
          </div>
          <div className="chat-meta float-right text-center mt-2">
            <div className="chat-msg-counter bg-primary text-white">
              20
            </div>
            <span className="text-nowrap">05 min</span>
          </div>
        </div>
      </a>
    </li>
    )
  }
}

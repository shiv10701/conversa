import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_messages, set_selected_chat, set_selected_chatid } from '../../actions/actions';
import { useSocketContext } from '../../../socket/socketConnection';

export default function SingleChat(props) {
  const dispatch=useDispatch();
  const {socket}=useSocketContext();
  
  let [messages,setMessages]=useState("")
  let[chat_id,setChatID]=useState("")

  function setSelected(item,e){
    e.preventDefault();
    dispatch(set_selected_chat(item))
    const details={other_user:item._id,login_user:props.user._id}
    socket.emit("get_messages_user",details)
    socket.on("receive_messsages",data=>{if(data!==null){setChatID(data.chat_id);setMessages(data.messages)}});
  }

  useEffect(()=>{
    //dispatch(set_messages(""));
    
    dispatch(set_selected_chatid(chat_id))
    dispatch(set_messages(messages,chat_id))
  },[messages])

  if(props.item){
    if(props.item.chat_type==="Personal"){
      return (
          <li key={props.item._id} onClick={(e)=>setSelected(props.item.users[0]._id===props.user._id?props.item.users[1]:props.item.users[0],e)}>
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
                <h6 className="mb-0">{props.item.users[0]._id===props.user._id?props.item.users[1].name:props.item.users[0].name}</h6>
              </div>
              
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

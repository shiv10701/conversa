import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../../socket/socketConnection";
import { useDispatch } from "react-redux";
import { add_new_chat, set_messages, set_selected_chatid } from "../../actions/actions";
import pop_sound_nitification from '../../sounds/pop_sound_notification.mp3'
import EmojiPicker from 'emoji-picker-react'

function New_Message(props){
  const {socket}=useSocketContext();

  let [message,setMessage]=useState("");
  let [isEmojiShow,setEmojiShow]=useState(false)

  // let [isEmojiSelect,setEmojiSelect]=useState(false)

  let sent_to_user_id=props.chat_user;
  let sent_by_user_id=props.login_user;
  let isGroupChat=props.item?.group_name??"";
  const sound=new Audio(pop_sound_nitification)

  

  function submit_message(e){
    e.preventDefault();
    if(isGroupChat===""){
      const details={ids:{sent_by_user_id,sent_to_user_id},msg:message}
      socket.emit("send_message",details);
      setMessage("")
    }
    else{
      const details={ids:{sent_by_user_id,sent_to_user_id},msg:message}
      socket.emit("send_group_message",details);
      setMessage("")
    }
  }

    return (
        <div className="chat-footer p-3 bg-white">
                            <form
                              className="d-flex align-items-center"
                              action="javascript:void(0);"
                              onSubmit={submit_message}
                            >
                              <div className="chat-attagement d-flex">
                                <a onClick={()=>setEmojiShow(state=>!state)}>
                                  <i
                                    className="fa fa-smile-o pr-3"
                                    aria-hidden="true"
                                  />
              
                                  {isEmojiShow?<EmojiPicker style={{position:"relative"}} onEmojiClick={pickedemoji=>setMessage(state=>state+pickedemoji.emoji)} /> :""} 
                                </a>
                                <div class="dropup">
                                 <span class="" id="dropdownMenuButton" data-toggle="dropdown" onClick={()=>setEmojiShow(false)}>
                                 <i className="fa fa-paperclip pr-3" aria-hidden="true"/>
                                 </span>
                                 <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" >
                                    <a class="dropdown-item" ><i class="ri-image-2-fill mr-2"></i>Photo or Video</a>
                                    <a class="dropdown-item" ><i class="ri-file-text-fill mr-2"></i>Document</a>
                                 </div>
                              </div>
                                
                              </div>
                              <input
                                type="text"
                                className="form-control mr-3"
                                placeholder="Type your message"
                                value={message}
                                onChange={(e)=>{setMessage(e.target.value)}}
                              />
                              <button
                                type="submit"
                                className="btn btn-primary d-flex align-items-center p-2"
                              >
                                <i
                                  className="fa fa-paper-plane-o"
                                  aria-hidden="true"
                                />
                                <span className="d-none d-lg-block ml-1">
                                  Send
                                </span>
                              </button>
                            </form>
                          </div>
    );
}

export default New_Message;
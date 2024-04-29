import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../../socket/socketConnection";
import { useDispatch } from "react-redux";
import { add_new_chat, set_messages, set_selected_chatid } from "../../actions/actions";
import pop_sound_nitification from '../../sounds/pop_sound_notification.mp3'
import EmojiPicker from 'emoji-picker-react'

function New_Message(props){
  const dispatch = useDispatch();
  const {socket}=useSocketContext();

  let [message,setMessage]=useState("");
  let [new_msg_data,setNewMsgData]=useState("")
  let [chat_id,setChatID]=useState("")

  let sent_to_user_id=props.chat_user;
  let sent_by_user_id=props.login_user;
  const sound=new Audio(pop_sound_nitification)

  function addEmoji(select_emoji){
    try {
      setMessage((state)=>state+select_emoji.emoji)
    } catch (error) {
      console.log(error.message)
    }
  }

  function submit_message(e){
    e.preventDefault();
    const details={ids:{sent_by_user_id,sent_to_user_id},msg:message}
    socket.emit("send_message",details);
    socket.on("send_save_message",data=>{
      if(data.new_chat){
        dispatch(add_new_chat(data.new_chat))
        setNewMsgData(data.new_message);
        setChatID(data.new_chat._id)
        sound.play();

      }
      else{console.log("new message ",data.new_message);setNewMsgData(data.new_message);sound.play()}})
    setMessage("")
  }
  useEffect(()=>{dispatch(set_messages(new_msg_data));dispatch(set_selected_chatid(chat_id))},[new_msg_data])

    return (
        <div className="chat-footer p-3 bg-white">
                            <form
                              className="d-flex align-items-center"
                              action="javascript:void(0);"
                              onSubmit={submit_message}
                            >
                              <div className="chat-attagement d-flex">
                                <a href="javascript:void();">
                                  <i
                                    className="fa fa-smile-o pr-3"
                                    aria-hidden="true"
                                  />
                                  {/* <EmojiPicker onEmojiClick={(select_emoji)=>{setMessage((state)=>state+select_emoji.emoji)}} /> */}
                                </a>
                                <a href="javascript:void();">
                                  <i
                                    className="fa fa-paperclip pr-3"
                                    aria-hidden="true"
                                  />
                                </a>
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
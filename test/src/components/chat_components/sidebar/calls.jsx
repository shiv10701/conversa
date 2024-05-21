import React, { useEffect, useState } from "react";
import SingleChat from "./single_chat";
import { useDispatch, useSelector } from "react-redux";
import { SocketContextProvider, useSocketContext } from "../../../socket/socketConnection";
import { load_call_History,load_chats, set_messages, set_selected_chatid } from "../../actions/actions";
import SingleCall from "./single_call";

function Calls() {
  const search_users = useSelector(state => state.search_user);
  const user_data = useSelector(state => state.user_data);   // current user data
  const { socket, online_users } = useSocketContext();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);  // these are all chats which we have pushed below   
  const calls_data = useSelector(state => state.call_History );  // these are all chats which we have pushed below   
  console.log('calls data -->)', calls_data)
  let [messages, setMessages] = useState("")
  let [chat_id, setChatID] = useState("")

  useEffect(() => { }, [chats])

  useEffect(() => {
    socket.emit("get_chats", user_data._id); // getting chats by sending current user Id 
    socket.on("get_user_chats", data => { dispatch(load_chats(data)) })  /// pushing all chats which we got    
    
    socket.emit("get_call_history", user_data._id); // getting calls history sending current user Id 
    socket.on("get_Calls_history", data => { dispatch(load_call_History(data)) })  // pushing all chats which we got    
  }, [user_data])

  useEffect(() => {  // once chats changes 
    if (chats) {
      if (chats.length !== 0) {
        chats.forEach((item) => {
          const details = { login_user: user_data._id, chat_id: item._id }
          socket.emit("get_messages_user", details)
          socket.on("receive_messsages", data => { if (data !== null) { setChatID(data.chat_id); setMessages(data.messages) } });
        });
      }
    }
  }, [chats])

  useEffect(() => {
    dispatch(set_messages(messages, chat_id))
  }, [messages])

  useEffect(() => { }, [search_users])

  if (Object.keys(search_users).length !== 0) {
    return (
      <div className="chat-sidebar-channel scroller mt-4 pl-3">
        <ul className="iq-chat-ui nav flex-column nav-pills">
          {Object.values(search_users).map((item) => { return <SingleCall item={item} user={user_data} /> })}
        </ul>
      </div>
    );
  }
  else if (calls_data) {
    if (calls_data.length !== 0) {
      return (
        <div className="chat-sidebar-channel scroller mt-4 pl-3">
          <ul className="iq-chat-ui nav flex-column nav-pills">
            {calls_data.map((item) => { return <SingleCall item={item} user = { user_data } /> })}
          </ul>
        </div>
      );
    }
  }
  else {
    return (
      <div></div>
    );
  }
}

export default Calls;
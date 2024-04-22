import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./message";

function Chat_Content(props){
  const current_chat=useSelector(state=>state.selected_chat_id)
  const messages=useSelector(state=>state.messages)
  const lastmessage=useRef();
  const current_user=props.login_user;
  useEffect(()=>{console.log("current chatid:",current_chat)},[current_chat])
  useEffect(()=>{console.log("messages for currect chat_id",messages[current_chat])},[messages])
  useEffect(()=>{
    setTimeout(()=>{lastmessage.current?.scrollIntoView({behaviour:"smooth"})},500)
    
  },[messages])


  if(Object.keys(messages).length!==0){
    if(current_chat!==null){
      console.log("inside of ")

      return (
        <div className="chat-content scroller">
          {messages[current_chat].length!==0 && messages[current_chat].map(message=>{
            return <div ref={lastmessage}>
            <Message item={message} current_user={current_user}/>
          </div>
        })}
          
        </div>
    );

    }
    return (
      <div className="chat-content scroller">
        {/* {messages.length!==0 && messages.map(message=>{
          return <div ref={lastmessage}>
          <Message item={message} current_user={current_user}/>
        </div>
      })} */}
        
      </div>
  );
  }
  else{

    return (
        <div className="chat-content scroller">
                            <div className="chat">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/1.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:45</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>How can we help? We're here for you! 😄</p>
                                </div>
                              </div>
                            </div>
                            <div className="chat chat-left">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/05.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:48</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>
                                    Hey John, I am looking for the best admin
                                    template.
                                  </p>
                                  <p>
                                    Could you please help me to find it out? 🤔
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="chat">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/1.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:49</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>Absolutely!</p>
                                  <p>
                                    vito Dashboard is the responsive bootstrap 4
                                    admin template.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="chat chat-left">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/05.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:52</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>Looks clean and fresh UI.</p>
                                </div>
                              </div>
                            </div>
                            <div className="chat">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/1.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:53</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>Thanks, from ThemeForest.</p>
                                </div>
                              </div>
                            </div>
                            <div className="chat chat-left">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/05.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:54</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>I will purchase it for sure. 👍</p>
                                </div>
                              </div>
                            </div>
                            <div className="chat">
                              <div className="chat-user">
                                <a className="avatar m-0">
                                  <img
                                    src="images/user/1.jpg"
                                    alt="avatar"
                                    className="avatar-35 "
                                  />
                                </a>
                                <span className="chat-time mt-1">6:56</span>
                              </div>
                              <div className="chat-detail">
                                <div className="chat-message">
                                  <p>Okay Thanks..</p>
                                </div>
                              </div>
                            </div>
                          </div>
    );
  }
  

}

export default Chat_Content;
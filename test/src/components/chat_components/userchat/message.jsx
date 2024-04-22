import React from 'react'
import { useSelector } from 'react-redux'

export default function Message(props) {
    if(props.item){
        if(props.item.sender===props.current_user)
        {
            return (
                <div className="chat">
                                        <div className="chat-user">
                                          <a className="avatar m-0">
                                            <img
                                              src="images/user/05.jpg"
                                              alt="avatar"
                                              className="avatar-35 "
                                            />
                                          </a>
                                          <span className="chat-time mt-1">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                        </div>
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                              {props.item.message}
                                            </p>
                                            
                                            
                                          </div>
                                        </div>
                                      </div>
              )
        }
        else{
            return (
                <div className="chat chat-left">
                                        <div className="chat-user ">
                                          <a className="avatar m-0">
                                            <img
                                              src="images/user/05.jpg"
                                              alt="avatar"
                                              className="avatar-35 "
                                            />
                                          </a>
                                          <span className="chat-time mt-1">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                        </div>
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                              {props.item.message}
                                            </p>
                                            
                                            
                                          </div>
                                        </div>
                                      </div>
              )
        }
    }
    else{
        return (
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
          )
    }
  
}

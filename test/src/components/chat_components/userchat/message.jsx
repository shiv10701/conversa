import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { FontFamily } from '../../../utils/fonts'

export default function Message(props) {   // props =  all messages present in chat 
  // console.log(props)

  const {Font,setFont}=useContext(FontFamily);
    if(props.item && props.item.message &&props.item.content_type==="message"){
      if(props.group){
        if(props.item.sender._id===props.current_user )
        {
            return (
                <div className="chat" key={props.item._id} style={{fontFamily:Font}}>
                                        
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p style={{fontFamily:Font}}>
                                              {props.item.message}
                                            <span className="chat-time">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
              )
        }
        else{
            return (
                <div className="chat chat-left" key={props.item._id}>
                                    <div className="chat-user">
                                        <img
                                          src={"http://192.168.0.98:5000/uploads/"+props.item.sender._id+"/"+props.item.sender.profile_img}
                                          alt="avatar"
                                          className="avatar-35 "
                                        />
                                    </div>
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                            <div className='text-primary' style={{fontSize:"10px"}}>{props.item.sender.name}</div>
                                              {props.item.message}
                                              <span className="chat-time text-start w-100 text-start">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                            
                                            </div>
                                      </div>
                                      </div>
              )
        }
      }
      else{
        if(props.item.sender._id===props.current_user )
        {
            return (
                <div className="chat" key={props.item._id}>
                                        
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                              {props.item.message}
                                            <span className="chat-time">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
              )
        }
        else{
            return (
                <div className="chat chat-left" key={props.item._id}>
                                          
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                              {props.item.message}
                                              <span className="chat-time text-start w-100 text-start">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                            
                                            </div>
                                      </div>
                                      </div>
              )
        }
      }
    }
    else if(props.item && props.item.message &&props.item.content_type==="file"){
      if(props.group){
        if(props.item.sender._id===props.current_user )
        {
            return (
                <div className="chat" key={props.item._id}>
                                        
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                            <img src={"http://192.168.0.98:5000/uploads/"+props.item.chat_id+"/"+props.item.message} className='img-thumbnail' style={{height:"100px",width:"100px"}} />

                                            <span className="chat-time">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
              )
        }
        else{
            return (
                <div className="chat chat-left" key={props.item._id}>
                                    <div className="chat-user">
                                        <img
                                          src={"http://192.168.0.98:5000/uploads/"+props.item.sender._id+"/"+props.item.sender.profile_img}
                                          alt="avatar"
                                          className="avatar-35 "
                                        />
                                    </div>
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                            <img src={"http://192.168.0.98:5000/uploads/"+props.item.chat_id+"/"+props.item.message} className='img-thumbnail' style={{height:"100px",width:"100px"}} />

                                              <span className="chat-time text-start w-100 text-start">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                            
                                            </div>
                                      </div>
                                      </div>
              )
        }
      }
      else{
        if(props.item.sender._id===props.current_user )
        {
            return (
                <div className="chat" key={props.item._id}>
                                        
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                              <img src={"http://192.168.0.98:5000/uploads/"+props.item.chat_id+"/"+props.item.message} className='img-thumbnail' style={{height:"100px",width:"100px"}} />
                                            <span className="chat-time">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
              )
        }
        else{
            return (
                <div className="chat chat-left" key={props.item._id}>
                                          
                                        <div className="chat-detail">
                                          <div className="chat-message">
                                            <p>
                                            <img src={"http://192.168.0.98:5000/uploads/"+props.item.chat_id+"/"+props.item.message} className='img-thumbnail' style={{height:"100px",width:"100px"}} />
                                              <span className="chat-time text-start w-100 text-start">{ (""+new Date(props.item.sentAt).getHours().toString()+":"+new Date(props.item.sentAt).getMinutes().toString())}</span>
                                            </p>
                                            
                                            </div>
                                      </div>
                                      </div>
              )
        }
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

import React, { useContext, useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../../socket/socketConnection";
import { useDispatch } from "react-redux";
import { add_new_chat, set_messages, set_selected_chatid } from "../../actions/actions";
import pop_sound_nitification from '../../sounds/pop_sound_notification.mp3'
import EmojiPicker from 'emoji-picker-react'
import ImageGallery from "react-image-gallery";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { FontFamily } from "../../../utils/fonts";




function New_Message(props){
  const {socket}=useSocketContext();
  const {Font}=useContext(FontFamily);
  let [message,setMessage]=useState("");
  let [isEmojiShow,setEmojiShow]=useState(false)

  // let [isEmojiSelect,setEmojiSelect]=useState(false)
  // console.log("this is chat id:",props.item)
  let sent_to_user_id=props.chat_user;
  let sent_by_user_id=props.login_user;
  let isGroupChat=props.item?.group_name??"";
  const sound=new Audio(pop_sound_nitification)

  const input_file_ref=useRef(null)

  const [files_to_send,setFilesToSend]=useState([])
  const [images_to_send,setImages]=useState([])

  const preview_modal=useRef(null)
  const image_modal_close=useRef(null)

  async function send_files(e){
    console.log(e.target.files);
    for(let i=0;i<e.target.files.length;i++){
      let arr={original:await reduce_image_size(e.target.files[i]),thumbnail: await reduce_image_size_thumbnail(e.target.files[i])}
      setFilesToSend(state=>{ return [...state,arr]});
      setImages(state=>{ return [...state,e.target.files[i]]});
    }
  }

   async function reduce_image_size(img){
    return await new Promise((resolve, reject) => {Resizer.imageFileResizer(img,500,250,"PNG",100,0, (uri) => {resolve(uri);},"base64",500,250)}).then(image=>{return image})
  }

   async function reduce_image_size_thumbnail(img){
    return  await new Promise((resolve, reject) => {Resizer.imageFileResizer(img,150,50,"PNG",100,0, (uri) => {resolve(uri);},"base64",150,50)}).then(image=>{return image})
  }

  async function save_images(){
    const details={ids:{sent_by_user_id,sent_to_user_id},data:images_to_send,isGroupChat:isGroupChat}
    const result_save_image=await axios.post('https://9w1r6qz3-5000.inc1.devtunnels.ms/api/saveImages/saveImages',{...details},{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
    console.log(result_save_image)
    if(result_save_image.status===200){
      console.log("inside if is ok statsu is 200")
      setImages([]);
      setFilesToSend([])
      image_modal_close.current.click();
      if(isGroupChat===""){
        const details={ids:{sent_by_user_id,sent_to_user_id},msg:message}
        socket.emit("send_image",details);
      }
      else{
        const details={ids:{sent_by_user_id,sent_to_user_id},msg:message}
        socket.emit("send_image_group",details);
      }
      
    }
    else{

    }
  }

  useEffect(()=>{
    if(files_to_send.length>0){
      console.log(files_to_send)
      preview_modal.current.click();
    }
  },[files_to_send])

  

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

  

    return (<>
          <div className="modal fade bd-example-modal-xl" id="preview_image_modal" tabindex="-1" role="dialog"   aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                 <div className="modal-content">
                                    
                                    <div className="modal-body">
                                      
                                       {files_to_send?.length>0 && <ImageGallery items={files_to_send} />}

                                    </div>
                                    <div className="modal-footer">
                                    <button className="btn btn-secondary" data-dismiss="modal" ref={image_modal_close}><i className="ri-close-line" aria-hidden="true" /> Cancel </button>  
                                      <button className="btn btn-success" onClick={save_images}><i className="fa fa-paper-plane-o" aria-hidden="true" /> Send </button>  
                                    </div>
                                 </div>
                              </div>
                           </div>
        <div className="chat-footer p-3 bg-white">
                            <form
                              className="d-flex align-items-center"
                              action="javascript:void(0);"
                              onSubmit={submit_message}
                            >
                              <div className="chat-attagement d-flex">
                                <a onClick={()=>setEmojiShow(state=>!state)} data-toggle="dropdown">
                                  <i
                                    className="fa fa-smile-o pr-3"
                                    aria-hidden="true"
                                  />
              
                                <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" >
                                  {isEmojiShow?<EmojiPicker style={{position:"relative"}} onEmojiClick={pickedemoji=>setMessage(state=>state+pickedemoji.emoji)} /> :""} 
                                </div>
                                </a>
                                <div class="dropup">
                                 <span class="" id="dropdownMenuButton" data-toggle="dropdown" onClick={()=>setEmojiShow(false)}>
                                 <i className="fa fa-paperclip pr-3" aria-hidden="true"/>
                                 </span>
                                 <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" >
                                    <div class="dropdown-item" style={{cursor:"pointer"}} onClick={()=>input_file_ref.current.click()}><i class="ri-image-2-fill mr-2"></i>Photo or Video
                                    </div>
                                    <input class="file-upload" type="file" multiple name="change_picture" accept="image/*"  ref={input_file_ref} onChange={(e)=>send_files(e)}/>
                                    <button type="button" data-toggle="modal" data-target="#preview_image_modal" ref={preview_modal} hidden></button>
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
                                style={{fontFamily:Font}}
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
                          </div></>
    );
}

export default New_Message;
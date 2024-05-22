import React, { useContext, useEffect, useRef, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch  } from 'react-redux';
import {init_user,search_user, set_selected_chat} from '../../actions/actions.js';
import axios from 'axios';
import { useSocketContext } from "../../../socket/socketConnection.jsx";
import NewGroup from "../new_group.jsx";
import { FontFamily } from "../../../utils/fonts.jsx";

function Chat_Search(){
  const result=useSelector(state=>state.user_data)

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const {socket}=useSocketContext();

  let [searchVal,setSearchVal]=useState("")

  let [font,setLocalFont]=useState("Roboto")

  const {Font,setFont}=useContext(FontFamily);

  function submit_search(e){
    e.preventDefault();
    setSearchVal(()=>{return e.target.value})
    
  }
  let month_val={"0":"01","1":"02","2":"03","3":"04","4":"05","5":"06","6":"07","7":"08","8":"09","9":"10","10":"11","11":"12",}

  let [image_dp,setImageDP]=useState("");

  useEffect(()=>{
    const res=async()=>{
      let url_of_image;
      if(result.profile_img){
        url_of_image="http://192.168.1.103:5000/uploads/"+result._id+"/"+result.profile_img;
      }
      else{
        url_of_image="http://192.168.1.103:5000/uploads/avatar.jpg"
      }
      setImageDP(url_of_image)
      // the following code is for taking the images from api call but it is not working as of now on 25-apr-24
      // const res= await axios.get("https://1f03-103-180-210-86.ngrok-free.app/uploads/"+result._id+"/"+result.profile_img);
      // console.log(res.data);setImageDP(res.data)
    }
    if(result._id){
      res()
    } 
  },[result])

  const [isOpen, setIsOpen] = useState(false);

  const openFileInput = () => {
    console.log("open file is clicked");
    input_file_ref.current.click();
    setIsOpen(true);
  };

  const input_file_ref=useRef(null);
  const btn_submit_ref=useRef(null);

  useEffect(()=>{
    if(searchVal.length>2){
      const data=[searchVal,result._id]
      socket.emit("search_val",data)
      socket.on("search_user",data=>{dispatch(search_user(data))});
    }
    if(searchVal.length===0){
      dispatch(search_user());
    }
  },[searchVal])

  async function change_profile(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const data={...formDataObject,user_id:result._id}
    const result_change=await  axios.post('http://192.168.1.103:5000/api/changeuserdetails/user_profile',{...data},{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
    let current_user_data=JSON.parse(localStorage.getItem("user_data"))
    current_user_data.profile_img=result_change.data.changed_value.profile_img
    localStorage.setItem("user_data",JSON.stringify(current_user_data))
    dispatch(init_user(current_user_data))



  }


  async function log_out(){
    const user_data=JSON.parse(localStorage.getItem("user_data"))||null;
    if(user_data!==null){
       try {
         dispatch(init_user(user_data))
         localStorage.removeItem("user_data"); // Remove user data from local storage
         const response = await axios.get("http://192.168.1.103:5000/api/auth/log-out",{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
         navigate("/sign-in");
       } catch (error) {
        console.log('error at chat_search.jsx', error);
       }
    }
}

    return (
        <div className="chat-search pt-3 pl-3"  >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex ">
                            <div className="chat-profile mr-3">
                              <img
                                src={image_dp}
                                alt="chat-user"
                                className="avatar-60 "
                              />
                            </div>
                            <div className="chat-caption align-self-center" >
                              <h5 style={{fontFamily:Font}}>{result.name}</h5>
                            </div>
                          </div>
                          <button type="submit" className="close-btn-res p-3">
                            <i className="ri-close-fill" />
                          </button>
                          <ul className=" iq-top-navbar iq-navbar-custom navbar-list d-flex">
                            <li>
                              <a href="/" className="search-toggle ">
                                <i className="ri-more-fill h3" />
                              </a>
                              <div className="iq-sub-dropdown iq-user-dropdown" >
                                <div className="iq-card shadow-none m-0">
                                  <div className="iq-card-body p-0 ">
                                    <div className="iq-sub-card iq-bg-primary-hover" data-toggle="modal" data-target="#modalProfile" style={{cursor:"pointer"}}>
                                      <div className="media align-items-center" >
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-file-user-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 " style={{fontFamily:Font}}>My Profile</h6>
                                        </div>
                                      </div>
                                      </div>
                                   
                                    <div className="iq-sub-card iq-bg-primary-hover" data-toggle="modal" data-target="#exampleModalScrollable" style={{cursor:"pointer"}}>
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-user-add-fill" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 " style={{fontFamily:Font}}>
                                            New Group Chat
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="iq-sub-card iq-bg-primary-hover" data-toggle="modal" data-target="#modalSettings" style={{cursor:"pointer"}}>
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-settings-3-fill" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 " style={{fontFamily:Font}}>
                                            Settings
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <a
                                      href="account-setting.html"
                                      className="iq-sub-card iq-bg-primary-hover"
                                    >
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-account-box-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 ">
                                            Account settings
                                          </h6>
                                        </div>
                                      </div>
                                    </a> */}
                                    <a
                                      href="privacy-setting.html"
                                      className="iq-sub-card iq-bg-primary-hover"
                                    >
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-lock-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 " style={{fontFamily:Font}}>
                                            Privacy Settings
                                          </h6>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="d-inline-block w-100 text-center p-3">
                                      
                                        <Link className="btn btn-primary dark-btn-primary" onClick={log_out}role="button" to="/sign-in">Sign out
                                        
                                        <i className="ri-login-box-line ml-2" />
                                        </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div id="user-detail-popup" className="scroller">
                          <div className="user-profile">
                            <button type="submit" className="close-popup p-3">
                              <i className="ri-close-fill" />
                            </button>
                            <div className="user text-center mb-4">
                              <a className="avatar m-0">
                                <img src="images/user/1.jpg" alt="avatar" />
                              </a>
                              <div className="user-name mt-4">
                                <h4>Nik Jordan</h4>
                              </div>
                              <div className="user-desc">
                                <p>Web Designer</p>
                              </div>
                            </div>
                            <hr />
                            <div className="user-detail text-left mt-4 pl-4 pr-4">
                              <h5 className="mt-4 mb-4">About</h5>
                              <p>
                                It is long established fact that a reader will
                                be distracted bt the reddable.
                              </p>
                              <h5 className="mt-3 mb-3">Status</h5>
                              <ul className="user-status p-0">
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-success pr-1" />
                                  <span>Online</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-warning pr-1" />
                                  <span>Away</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-danger pr-1" />
                                  <span>Do Not Disturb</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-light pr-1" />
                                  <span>Offline</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-searchbar mt-4">
                          <div className="form-group chat-search-data m-0" style={{fontFamily:Font}}>
                            <input
                              type="text"
                              className="form-control round"
                              id="chat-search"
                              placeholder="Search"
                              onChange={submit_search}
                              value={searchVal}
                              style={{fontFamily:Font}}
                            />
                            <i className="ri-search-line" />
                          </div>
                        </div>

                        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                                                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                          <h5 class="modal-title" id="exampleModalScrollableTitle" style={{fontFamily:Font}}>New Group Chat</h5>
                                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">&times;</span>
                                                          </button>
                                                        </div>
                                                        <div class="modal-body">
                                                          <NewGroup />
                                                          </div>
                                                        {/* <div class="modal-footer">
                                                          <button type="button" class="btn btn-secondary" data-dismiss="modal"><i className="ri-close-line"></i>Close</button>
                                                          <button type="button" class="btn btn-primary"><i className="ri-add-line"></i>Create new Group</button>
                                                        </div> */}
                                                    </div>
                                                  </div>
                                              </div>
                                              <div class="iq-card">
                        
                           <div class="modal fade" id="modalProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-scrollable" role="document">
                                 <div class="modal-content">
                                    <div class="modal-header">
                                       <h5 class="modal-title" id="exampleModalScrollableTitle" style={{fontFamily:Font}}>My Profile </h5>
                                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                       <span aria-hidden="true">&times;</span>
                                       </button>
                                    </div>
                                    <div className="modal-body d-flex flex-column align-items-center">
                                      <form onSubmit={change_profile} encType="multipart/form-data">
                                      <div className="form-group row align-items-center">
                                        <div className="col-md-12">
                                            <div className="profile-img-edit">
                                                <img className="profile-pic rounded-circle" style={{height:"150px",width:"150px"}} src={image_dp} alt="profile-pic" />
                                                <div className="p-image">
                                                <i class="ri-pencil-line upload-button" onClick={openFileInput}></i>
                                                  <input class="file-upload" type="file" name="change_picture" accept="image/*"  ref={input_file_ref} onChange={(e)=>{btn_submit_ref.current.click()}}/>
                                                  <input type="submit" name="btn_submit" ref={btn_submit_ref} hidden/>
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                      </form>

                                    <div className="mx-5">
                                      <div className="form-group ">
                                              <label for="fname" style={{fontFamily:Font}} >First Name:</label>
                                              <input type="text" className="form-control" id="txt_name" name="txt_name"  value={result.name} style={{fontFamily:Font}}/>
                                      </div>
                                      <div className="form-group ">
                                              <label for="fname" style={{fontFamily:Font}}>UserName:</label>
                                              <input type="text" className="form-control" id="txt_name" name="txt_name"  value={result.username} style={{fontFamily:Font}}/>
                                      </div>
                                      <div class="form-group ">
                                              <label for="fname" style={{fontFamily:Font}}>Email:</label>
                                              <input type="text" disabled className="form-control" id="txt_name" name="txt_name"  value={result.email} style={{fontFamily:Font}}/>
                                      </div>
                                      <div class="form-group " >
                                              <label for="fname" style={{fontFamily:Font}}>Phone Number:</label>
                                              <input type="text" disabled className="form-control" id="txt_name" name="txt_name"  value={result.phone_no} style={{fontFamily:Font}}/>
                                      </div>
                                      <div class="form-group ">
                                              <label for="fname" style={{fontFamily:Font}}>Date of Birth:</label>
                                              <input type="date" disabled className="form-control" style={{fontFamily:Font}} id="txt_name" name="txt_name" onChange={(e)=>{console.log(e.target.value)}}  value={new Date(result.dob).getFullYear()+"-"+month_val[new Date(result.dob).getMonth()]+"-"+new Date(result.dob).getDate()}/>
                                      </div>
                                    </div>
                                      
                                    </div>
                                    
                                 </div>
                              </div>
                           </div>

                           <div className="modal fade bd-example-modal-xl" id="modalSettings" tabindex="-1" role="dialog"   aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                 <div className="modal-content">
                                  <div>
                                    <button type="button" className="btn btn-primary float-right m-2" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">X</span></button>
                                  </div>
                                    
                                    <div className="modal-body">
                                      <div className="d-flex flex-column border p-2">
                                        <span style={{fontFamily:Font}} className="p-3">Select Font :</span>
                                        <select className="form-control" onChange={(e)=>{setLocalFont(()=>e.target.value);}} defaultValue={Font} style={{fontFamily:Font}}>
                                          <option style={{fontFamily:""}}>Default</option>
                                          <option className="p-3" value="'Roboto', sans-serif" style={{fontFamily:"'Roboto', sans-serif",}}>Roboto</option>
                                          <option value="'Pacifico', cursive" style={{fontFamily:"'Pacifico', cursive"}}>Pacifico</option>
                                          <option value="'IBM Plex Mono', monospace" style={{fontFamily:"'IBM Plex Mono', monospace"}}>IBM Plex Mono</option>
                                          <option value="'Kaushan Script', cursive" style={{fontFamily:"'Kaushan Script', cursive"}}>Kaushan Script</option>
                                          <option value="'Geologica', sans-serif" style={{fontFamily:"'Geologica', sans-serif"}}>Geologica</option>    
                                        </select>
                                        
                                        <span style={{fontFamily:Font}} className="p-3">Font Preview:</span>
                                        <span className="p-3" style={{fontFamily:font,fontSize:"18px"}}>You might belong in Gryffindor, Where dwell the brave at heart,Their daring, nerve, and chivalry Set Gryffindors apart.</span>
                                        <button className="btn btn-success mx-auto" style={{fontFamily:Font}} onClick={()=>{
                                          setFont(font);
                                          localStorage.setItem("choosenFontFam",font)
                                        }}>Save</button>        
                                      </div>
                                      <div className="d-flex flex-column border p-2 mt-3">
                                        <span style={{fontFamily:Font}} className="p-3">Change Theme : </span>
                                      </div>
                                    </div>
                                    
                                 </div>
                              </div>
                           </div>

                           
                        </div>
                          
                      </div>

                      
    );
}

export default Chat_Search;
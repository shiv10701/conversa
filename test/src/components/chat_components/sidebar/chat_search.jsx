import React, { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch  } from 'react-redux';
import {init_user,search_user, set_selected_chat} from '../../actions/actions.js';
import axios from 'axios';
import { useSocketContext } from "../../../socket/socketConnection.jsx";
import NewGroup from "../new_group.jsx";

function Chat_Search(){
  const result=useSelector(state=>state.user_data)

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const {socket}=useSocketContext();

  let [searchVal,setSearchVal]=useState("")

  function submit_search(e){
    e.preventDefault();
    setSearchVal(()=>{return e.target.value})
    
  }

  let [image_dp,setImageDP]=useState("");

  useEffect(()=>{
    const res=async()=>{
      let url_of_image;
      if(result.profile_img){
        url_of_image="http://192.168.94.210:5000/uploads/"+result._id+"/"+result.profile_img;
      }
      else{
        url_of_image="http://192.168.94.210:5000/uploads/avatar.jpg"
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


  async function log_out(){
    const user_data=JSON.parse(localStorage.getItem("user_data"))||null;
    if(user_data!==null){
       try {
         dispatch(init_user(user_data))
         localStorage.removeItem("user_data"); // Remove user data from local storage
         const response = await axios.get("http://192.168.94.210:5000/api/auth/log-out",{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
         navigate("/sign-in");
       } catch (error) {
        console.log('error at chat_search.jsx', error);
       }
    }
}

    return (
        <div className="chat-search pt-3 pl-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex ">
                            <div className="chat-profile mr-3">
                              <img
                                src={image_dp}
                                alt="chat-user"
                                className="avatar-60 "
                              />
                            </div>
                            <div className="chat-caption align-self-center">
                              <h5>{result.name}</h5>
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
                              <div className="iq-sub-dropdown iq-user-dropdown">
                                <div className="iq-card shadow-none m-0">
                                  <div className="iq-card-body p-0 ">
                                    <a
                                      href="profile.html"
                                      className="iq-sub-card iq-bg-primary-hover"
                                    >
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-file-user-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 ">My Profile</h6>
                                        </div>
                                      </div>
                                    </a>
                                    <a
                                      href="profile-edit.html"
                                      className="iq-sub-card iq-bg-primary-hover"
                                    >
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-profile-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 ">
                                            Edit Profile
                                          </h6>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="iq-sub-card iq-bg-primary-hover" data-toggle="modal" data-target="#exampleModalScrollable">
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-user-add-fill" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 ">
                                            New Group Chat
                                              
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    <a
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
                                    </a>
                                    <a
                                      href="privacy-setting.html"
                                      className="iq-sub-card iq-bg-primary-hover"
                                    >
                                      <div className="media align-items-center">
                                        <div className="rounded iq-card-icon iq-bg-primary">
                                          <i className="ri-lock-line" />
                                        </div>
                                        <div className="media-body ml-3">
                                          <h6 className="mb-0 ">
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
                          <div className="form-group chat-search-data m-0">
                            <input
                              type="text"
                              className="form-control round"
                              id="chat-search"
                              placeholder="Search"
                              onChange={submit_search}
                              value={searchVal}
                            />
                            <i className="ri-search-line" />
                          </div>
                        </div>

                        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                                                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                          <h5 class="modal-title" id="exampleModalScrollableTitle">New Group Chat</h5>
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
                      </div>

                      
    );
}

export default Chat_Search;
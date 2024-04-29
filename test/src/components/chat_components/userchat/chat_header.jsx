import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../../socket/socketConnection";

function Chat_Header(props){

  const {online_users}=useSocketContext();

  let this_user_id;
  let [isOnline,setIsOnline]=useState(false)
  useEffect(()=>{
    if(online_users.includes(this_user_id)){
      setIsOnline(true)
    }
    else{
      setIsOnline(false)
    }
  },[online_users])

  if(props.item){
    this_user_id=props.item._id;
    let profile_img;
        if(props.item.profile_img){
          profile_img="http://192.168.0.195:5000/uploads/"+props.item._id+"/"+props.item.profile_img
        }
        else{
          profile_img="http://192.168.0.195:5000/uploads/avatar.jpg"
        }
    return (
      <div className="chat-head">
                          <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                            <div className="d-flex align-items-center">
                              <div
                                id="sidebar-toggle"
                                className="sidebar-toggle"
                              >
                                <i className="ri-menu-3-line" />
                              </div>
                              <div className="avatar chat-user-profile m-0 mr-3">
                                <img
                                  src={profile_img}
                                  alt="avatar"
                                  className="avatar-50 "
                                />
                                {/* <span className="avatar-status">
                                  <i className="ri-checkbox-blank-circle-fill text-success" />
                                </span> */}
                              </div>
                              <div className="d-flex flex-column">
                              <h5 className="mb-0">{props.item.name}</h5>
                              {isOnline? <span className="text-success">Online</span>:""}
                              </div>

                            </div>
                            <div className="chat-user-detail-popup scroller">
                              <div className="user-profile text-center">
                                <button
                                  type="submit"
                                  className="close-popup p-3"
                                >
                                  <i className="ri-close-fill" />
                                </button>
                                <div className="user mb-4">
                                  <a className="avatar m-0">
                                    <img
                                      src={profile_img}
                                      alt="avatar"
                                      height={"125px"}
                                      width={"125px"}
                                    />
                                  </a>
                                  <div className="user-name mt-4">
                                    <h4>{props.item.name}</h4>
                                  </div>
                                  <div className="user-desc">
                                    <p>Cape Town, RSA</p>
                                  </div>
                                </div>
                                <hr />
                                <div className="chatuser-detail text-left mt-4">
                                  <div className="row">
                                    <div className="col-6 col-md-6 title">
                                      Nik Name:
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                      Nik
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-6 col-md-6 title">
                                      Tel:
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                      {props.item.phone_no}
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-6 col-md-6 title">
                                      Date Of Birth:
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                      July 12, 1989
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-6 col-md-6 title">
                                      Gender:
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                      Male
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-6 col-md-6 title">
                                      Language:
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                      Engliah
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="chat-header-icons d-flex">
                              <a
                                href="javascript:void();"
                                className="chat-icon-phone iq-bg-primary"
                              >
                                <i className="ri-phone-line" />
                              </a>
                              <a
                                href="javascript:void();"
                                className="chat-icon-video iq-bg-primary"
                              >
                                <i className="ri-vidicon-line" />
                              </a>
                              <a
                                href="javascript:void();"
                                className="chat-icon-delete iq-bg-primary"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <span className="dropdown iq-bg-primary">
                                <i
                                  className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0"
                                  id="dropdownMenuButton02"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  role="menu"
                                />
                                <span
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton02"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="JavaScript:void(0);"
                                  >
                                    <i
                                      className="fa fa-thumb-tack"
                                      aria-hidden="true"
                                    />{" "}
                                    Pin to top
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="JavaScript:void(0);"
                                  >
                                    <i
                                      className="fa fa-trash-o"
                                      aria-hidden="true"
                                    />{" "}
                                    Delete chat
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="JavaScript:void(0);"
                                  >
                                    <i
                                      className="fa fa-ban"
                                      aria-hidden="true"
                                    />{" "}
                                    Block
                                  </a>
                                </span>
                              </span>
                            </div>
                          </header>
                        </div>
  );
  }
  else{
    return (
        <div className="chat-head">
                            <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                              <div className="d-flex align-items-center">
                                <div
                                  id="sidebar-toggle"
                                  className="sidebar-toggle"
                                >
                                  <i className="ri-menu-3-line" />
                                </div>
                                <div className="avatar chat-user-profile m-0 mr-3">
                                  <img
                                    src="images/user/05.jpg"
                                    alt="avatar"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-success" />
                                  </span>
                                </div>
                                <h5 className="mb-0">Team Discussions</h5>
                              </div>
                              <div className="chat-user-detail-popup scroller">
                                <div className="user-profile text-center">
                                  <button
                                    type="submit"
                                    className="close-popup p-3"
                                  >
                                    <i className="ri-close-fill" />
                                  </button>
                                  <div className="user mb-4">
                                    <a className="avatar m-0">
                                      <img
                                        src="images/user/05.jpg"
                                        alt="avatar"
                                      />
                                    </a>
                                    <div className="user-name mt-4">
                                      <h4>Nik Jordan</h4>
                                    </div>
                                    <div className="user-desc">
                                      <p>Cape Town, RSA</p>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="chatuser-detail text-left mt-4">
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Nik Name:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Nik
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Tel:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        072 143 9920
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Date Of Birth:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        July 12, 1989
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Gender:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Male
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Language:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Engliah
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chat-header-icons d-flex">
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-phone iq-bg-primary"
                                >
                                  <i className="ri-phone-line" />
                                </a>
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-video iq-bg-primary"
                                >
                                  <i className="ri-vidicon-line" />
                                </a>
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-delete iq-bg-primary"
                                >
                                  <i className="ri-delete-bin-line" />
                                </a>
                                <span className="dropdown iq-bg-primary">
                                  <i
                                    className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0"
                                    id="dropdownMenuButton02"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    role="menu"
                                  />
                                  <span
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton02"
                                  >
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-thumb-tack"
                                        aria-hidden="true"
                                      />{" "}
                                      Pin to top
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-trash-o"
                                        aria-hidden="true"
                                      />{" "}
                                      Delete chat
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-ban"
                                        aria-hidden="true"
                                      />{" "}
                                      Block
                                    </a>
                                  </span>
                                </span>
                              </div>
                            </header>
                          </div>
    );
  }
}

export default Chat_Header;
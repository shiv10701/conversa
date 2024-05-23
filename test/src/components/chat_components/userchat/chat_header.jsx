import React, { useContext, useEffect, useState } from "react";
import { useSocketContext } from "../../../socket/socketConnection";
// ----------------------------------------------
import { Link, useNavigate } from "react-router-dom";
import ringging from "../../video_components/audio/ring.mp3";
import tune from "../../video_components/audio/tune.mp3";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid
import { FontFamily } from "../../../utils/fonts";
import { Country,State,City } from "country-state-city";


function Chat_Header(props) {



  const { online_users, socket } = useSocketContext();
  let this_user_id;
  let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let [isOnline, setIsOnline] = useState(false)
  // -------------------------------------------------------------
  const navigate = useNavigate();
  const video_url = `/room/${uuidv4()}`;
  const Local_U_data = useSelector(state => state.user_data);   //current Logged in user
  const localRing = new Audio(ringging);
  const remoteTune = new Audio(tune);
  // ------------------------------- Video Call ---------------------------------
  let isGroupChat = props.item?.group_name ?? "";
  let sent_to_user_id = props.chat_user;
  let sent_by_user_id = props.login_user;

  const {Font}=useContext(FontFamily);


  const make_video_call = () => {
    navigate(video_url, { state: 'outgoing_video' })
    localRing.play()

    let details={video_url,ids:{sent_by_user_id,sent_to_user_id}, Local_U_data}

    if (isGroupChat === "") {
      socket.emit("make_video_request",details)
      // const data ={ids:{sent_by_user_id,sent_to_user_id},msg:"🎥 𝗩𝗶𝗱𝗲𝗼 𝗰𝗮𝗹𝗹 (No answer)"}
      // socket.emit("send_message",data);
    }else{
      socket.emit("make_group_video",details)
    }
  }

  // ------------- Incomming Request  --------------------
  function incommingVideoCallRequest(video_url, Local_U_data) {
    console.log('Local_U_data ---> ', Local_U_data)
    navigate(video_url, { state: Local_U_data });
    remoteTune.play()
      .then(() => console.log('Audio playback started.'))
      .catch((error) => console.error('Error playing audio:', error));
  }

  // ------------------- stop Remote audio --------------------

  useEffect(() => {
    socket.on("video_request_from_server", incommingVideoCallRequest);
    return () => {
      socket.off("video_request_from_server", incommingVideoCallRequest);
      // socket.disconnect();
    };
  }, [socket]);

  // --------------------------------------------------------------------------------

  useEffect(() => {
    if (online_users.includes(this_user_id)) {
      setIsOnline(true)
    }
    else {
      setIsOnline(false)
    }
  }, [online_users])

  if (props.item) {
    if (props.item.group_name) {
      this_user_id = props.item._id;
      let profile_img;
      if (props.item.chat_img) {
        profile_img = "https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/" + props.item._id + "/" + props.item.chat_img
      }
      else {
        profile_img = "https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/avatar.jpg"
      }
      return (
        <div className="chat-head" style={{fontFamily:Font}}>
          <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
            <div className="d-flex align-items-center">
              <div
                id="sidebar-toggle"
                className="sidebar-toggle"
              >
                <i className="ri-arrow-left-s-line" />
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
              <div className="d-flex flex-column" style={{fontFamily:Font}}>
                <h5 className="mb-0" style={{fontFamily:Font}}>{props.item.group_name}</h5>
              </div>

            </div>
            <div className="chat-user-detail-popup scroller" style={{fontFamily:Font}}>
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
                  <div className="user-name mt-4" style={{fontFamily:Font}}>
                    <h4 style={{fontFamily:Font}}>{props.item.group_name}</h4>
                  </div>
                  <div className="user-desc" style={{fontFamily:Font}}>
                    <p>Cape Town, RSA</p>
                  </div>
                </div>
                <hr />
                <div className="chatuser-detail text-left mt-4" style={{fontFamily:Font}}>
                 
                  <div className="row">
                    <div className="col-6 col-md-6 title">
                      Date Of Creation:
                    </div>
                    <div className="col-6 col-md-6 text-right">
                      {months[new Date(props.item.createdAt).getMonth()]+" "+new Date(props.item.createdAt).getDate()+ ", " + new Date(props.item.createdAt).getFullYear()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6 col-md-6 title">
                      Language:
                    </div>
                    <div className="col-6 col-md-6 text-right">
                      English
                    </div>
                  </div>
                  <hr />
                  <div className="row" >
                    <div className="col-12 col-md-12 title pb-4">
                      Participants
                    </div>
                    <div className="col-12 col-md-12 pb-5" style={{overflowY:"auto",height:"250px"}}>
                      <ul >
                        {props.item.users.map((item,i)=>{
                           return <li>
                            <div className="row">
                              <div className="col-4">
                                <img src={"https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/" + item._id + "/" + item.profile_img} height={"50px"} width={"50px"} />
                              </div>
                              <div className="col-8 text-center">{item.name}</div>
                            </div>
                            {i<props.item.users.length-1?<hr />:""}
                          </li>
                        })}
                        </ul>
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
              {/* <a
                href="javascript:void();"
                className="chat-icon-video iq-bg-primary"
              >
                <i className="ri-vidicon-line" />
              </a> */}
              <span
                onClick={make_video_call}
                className="chat-icon-video iq-bg-primary"
              >
                <i className="ri-vidicon-line" />
              </span>
              {/* <a
                href="javascript:void();"
                className="chat-icon-delete iq-bg-primary"
              >
                <i className="ri-delete-bin-line" />
              </a> */}
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
    else {
      this_user_id = props.item._id;
      let profile_img;
      if (props.item.profile_img) {
        profile_img = "https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/" + props.item._id + "/" + props.item.profile_img
      }
      else {
        profile_img = "https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/avatar.jpg"
      }
      return (
        <div className="chat-head" style={{fontFamily:Font}}>
          <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
            <div className="d-flex align-items-center">
              <div
                id="sidebar-toggle"
                className="sidebar-toggle"
              >
                <i className="ri-arrow-left-s-line h6" />
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
              <div className="d-flex flex-column" style={{fontFamily:Font}}>
                <h5 className="mb-0" style={{fontFamily:Font}}>{props.item.name}</h5>
                {isOnline ? <span className="text-success" style={{fontFamily:Font}}>Online</span> : ""}
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
                  <div className="user-name mt-4" style={{fontFamily:Font}}>
                    <h4 style={{fontFamily:Font}}>{props.item.name}</h4>
                  </div>
                  <div className="user-desc" style={{fontFamily:Font}}>
                    <p >{Country.getCountryByCode(props.item.country).name}</p>
                  </div>
                </div>
                <hr />
                <div className="chatuser-detail text-left mt-4">
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
                      {months[new Date(props.item.dob).getMonth()]+" "+new Date(props.item.dob).getDate()+", "+new Date(props.item.dob).getFullYear()}
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
                      English
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
              {/*------------video Icon-----------  */}
              <span
                onClick={make_video_call}
                className="chat-icon-video iq-bg-primary"
              >
                <i className="ri-vidicon-line" />
              </span>
              {/*-----------------------  */}
              {/* <a
                href="javascript:void();"
                className="chat-icon-delete iq-bg-primary"
              >
                <i className="ri-delete-bin-line" />
              </a> */}
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
    console.log(props.item)
  }
  else {
    return (
      <div className="chat-head" style={{fontFamily:Font}}>
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
            {/* <a
              href="javascript:void();"
              className="chat-icon-video iq-bg-primary"
            >
              <i className="ri-vidicon-line" />
            </a> */}
            <span
                onClick={make_video_call}
                className="chat-icon-video iq-bg-primary"
              >
                <i className="ri-vidicon-line" />
              </span>
            {/* <a
              href="javascript:void();"
              className="chat-icon-delete iq-bg-primary"
            >
              <i className="ri-delete-bin-line" />
            </a> */}
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
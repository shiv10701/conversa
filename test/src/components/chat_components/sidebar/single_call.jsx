import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_messages, set_selected_chat, set_selected_chatid, set_seen } from '../../actions/actions';
import { useSocketContext } from '../../../socket/socketConnection';

export default function SingleCall(props) {
  const dispatch = useDispatch();
  let this_user_id;
  let logged_in_user;



  if (props.item) {
    let result, key , icon;
    if (props.item.group_name === "") {
      logged_in_user = props.user._id;
      // this_user_id = props.item.users[0]._id === props.user._id ? props.item.users[1]?._id : props.item.users[0]?._id;

      if (props.item.type === "Outgoing call") {
        if (props.item.value === "Accepted") {
          result = `Outgoing call (Accepted)` ;key = 1; 
          icon = <i class="ri-arrow-right-up-line text-success ri-lg"></i> ;
        } else {
          result = `Outgoing call (Rejected)` ;key = 2;
          icon = <i class="ri-arrow-right-up-line text-danger ri-lg"></i> ;
        }
      } else if (props.item.type === "Incoming call") {
        if (props.item.value === "Accepted") {
          result = `Incoming call (Accepted)` ;key = 3;
          icon = <i class="ri-arrow-left-down-line text-success ri-lg"></i>;
        } else {
          result = `Incoming call (Rejected)` ; key = 4;
          icon = <i class="ri-arrow-left-down-line text-danger ri-lg"></i>;
        }
      }
    } else if (props.item.type === "Video call") {
      result = `Video call (Outgoing)`;  key = 5;
      props.item.name = props.item.group_name
      icon = <i class="ri-arrow-right-up-line text-success ri-lg"></i>
    } else if (props.item.type === "Group video call") {
      if (props.item.value === "Accepted") {
        result = `Incomming call(Accepted)` ; key = 6;
        icon = <i class="ri-arrow-left-down-line text-success ri-lg"></i>;
        props.item.name = props.item.group_name ; 
      }else{
        result = `Incomming call(Rejected)` ; key = 7;
        props.item.name = props.item.group_name;
        icon = <i class="ri-arrow-left-down-line text-danger ri-lg"></i>;
      }
    }


      let profile_img;
      // if (props.item.users[0]?._id === props.user._id) {
      //   if (props.item.users[1]?.profile_img) {
      //     profile_img = "http://192.168.10.27:5000/uploads/" + props.item.users[1]?._id + "/" + props.item.users[1]?.profile_img
      //   }
      //   else {
      //     profile_img = "http://192.168.10.27:5000/uploads/avatar.jpg" ; 
      //   }
      // }
      // else {
      //   if (props.item.users[0]?.profile_img) {
      //     profile_img = "http://192.168.10.27:5000/uploads/" + props.item.users[0]?._id + "/" + props.item.users[0]?.profile_img;
      //   }
      //   else {
      //     profile_img = "http://192.168.10.27:5000/uploads/avatar.jpg"
      //   }
      // }
      return (
        <li key={props.item._id} >
          <a data-toggle="pill" href="#chatbox1" >
            <div className="d-flex align-items-center">
              <div className="avatar mr-3">
                {/* <img
                    src={profile_img}
                    alt="chatuserimage"
                    className="avatar-50 "
                  /> */}

              </div>
              <div className="chat-sidebar-name">
                {/* <h6 className="mb-0">{props.item.users[0]._id === props.user._id ? props.item.users[1]?.name : props.item.users[0]?.name}</h6> */}
                <h6 className="mb-0 fw-bold ">{props.item.name} </h6 ><p className="mb-0 fw-bold">{result}</p>
                {/* <span><i className='ri-arrow-right-up-line text-success'></i> {new Date().getDate() + " / " + new Date().getMonth() + " / 44 " + new Date().getFullYear()}</span> */}
                <span > {icon} {props.item.date}</span>
              </div>
              <div className="chat-meta float-right text-center mt-2 d-flex flex-column align-items-center">
                {/* {Math.random() * 2 < 1 ? <span><i className="ri-vidicon-line text-success h5" ></i></span> : */}
                {true ? <span><i className="ri-vidicon-line text-success h5" ></i></span> :
                  <span><i className="ri-phone-fill text-success h5" ></i></span>}
              </div>

            </div>
          </a>
        </li>
      );
      //   else if (props.item.chat_type === "Group") {
      //     let profile_img;
      //     if (props.item.chat_img) {
      //       profile_img = "http://192.168.10.27:5000/uploads/" + props.item._id + "/" + props.item.chat_img
      //     }
      //     else {
      //       profile_img = "http://192.168.10.27:5000/uploads/avatar.jpg"
      //     }
      //     return (
      //       <li key={props.item._id} >
      //         <a data-toggle="pill" href="#chatbox1" >
      //           <div className="d-flex align-items-center">
      //             <div className="avatar mr-3">
      //               <img
      //                 src={profile_img}
      //                 alt="chatuserimage"
      //                 className="avatar-50 "
      //               />
      //             </div>
      //             <div className="chat-sidebar-name">
      //               <h6 className="mb-0">{props.item.group_name}</h6>
      //               <span><i className='ri-arrow-right-up-line text-success'></i> {new Date().getDate() + " / " + new Date().getMonth() + " / " + new Date().getFullYear()}</span>

      //             </div>
      //             <div className="chat-meta float-right text-center mt-2 d-flex flex-column align-items-center">
      //               {Math.random() * 2 < 1 ? <span><i className="ri-vidicon-line text-success h5" ></i></span> :
      //                 <span><i className="ri-phone-fill text-success h5" ></i></span>}
      //             </div>

      //           </div>
      //         </a>
      //       </li>
      //     );
      //   }
      //   else {
      //     let profile_img;
      //     if (props.item.profile_img) {
      //       profile_img = "http://192.168.10.27:5000/uploads/" + props.item._id + "/" + props.item.profile_img
      //     }
      //     else {
      //       profile_img = "http://192.168.10.27:5000/uploads/avatar.jpg"
      //     }
      //     return (
      //       <li key={props.item._id} >
      //         <a data-toggle="pill" href="#chatbox1" >
      //           <div className="d-flex align-items-center">
      //             <div className="avatar mr-3">
      //               <img
      //                 src={profile_img}
      //                 alt="chatuserimage"
      //                 className="avatar-50 "
      //               />
      //             </div>
      //             <div className="chat-sidebar-name">
      //               <h6 className="mb-0">{props.item.name}</h6>
      //             </div>

      //           </div>
      //         </a>
      //       </li>
      //     );
      //   }
    }
    else {
      return (
        <li>
          <a data-toggle="pill" href="#chatbox1">
            <div className="d-flex align-items-center">
              <div className="avatar mr-3">
                <img
                  src="images/user/05.jpg"
                  alt="chatuserimage"
                  className="avatar-50 "
                />
                <span className="avatar-status">
                  <i className="ri-checkbox-blank-circle-fill text-success" />
                </span>
              </div>
              <div className="chat-sidebar-name">
                <h6 className="mb-0">Team Discussions</h6>
                <span>Lorem Ipsum is</span>
              </div>
              <div className="chat-meta float-right text-center mt-2">
                <div className="chat-msg-counter bg-primary text-white">
                  20
                </div>
                <span className="text-nowrap">05 min</span>
              </div>
            </div>
          </a>
        </li>
      )
    }
  }

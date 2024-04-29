import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../../socket/socketConnection";

function NewGroup(){

    const user_data=useSelector(state=>state.user_data)
    let {socket} = useSocketContext()
    let [searchVal,setSearchVal]=useState("")
    const dispatch= useDispatch()
    let [searchUser,setSearchUser]=useState([])

    useEffect(()=>{
        if(searchVal.length>2)
        {
            console.log(user_data._id)
            const data=[searchVal,user_data._id]
            socket.emit("search_val",data)
            socket.on("search_user",data=>{setSearchUser(data)});
        }
    },[searchVal])

   

    return (<div>
        <div className="chat-searchbar mt-1">
                          <div className="form-group chat-search-data m-0">
                            <input
                              type="text"
                              className="form-control round"
                              id="chat-search"
                              placeholder="Search"
                              onChange={(e)=>{setSearchVal(()=>e.target.value)}}
                              value={searchVal}
                            />
                            <i className="ri-search-line" />
                          </div>
                        </div>

        <div className="w-100 bg-dark">

        <div className="chat-sidebar-channel scroller mt-4 pl-3">
        <ul className="iq-chat-ui nav flex-column nav-pills">
            {searchUser && searchUser.length>0?
            searchUser.map((item)=>{
                <li >
                <a data-toggle="pill" href="#chatbox1" >
                <div className="d-flex align-items-center">
                    <div className="avatar mr-3">
                    <img
                        src={item.profile_img}
                        alt="chatuserimage"
                        className="avatar-50 "
                    />
                    </div>
                    <div className="chat-sidebar-name">
                    <h6 className="mb-0">{item.name}</h6>
                    </div>
                </div>
                </a>
            </li>
          })
            :""}
        
        </ul>
      </div>


        </div>
    </div>);
}

export default NewGroup;

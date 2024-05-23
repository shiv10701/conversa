import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../../socket/socketConnection";
import axios from "axios";

function NewGroup(){

    const user_data=useSelector(state=>state.user_data)
    let {socket} = useSocketContext()
    let [searchVal,setSearchVal]=useState("")
    const dispatch= useDispatch()
    let [searchUser,setSearchUser]=useState([])
    const chats=useSelector(state=>state.chats)

    let [selected_chats,setSelectedChats]=useState({})

    let [current_page,setCurrentPage]=useState(0)


    useEffect(()=>{
        if(searchVal.length>2)
        {
            const data=[searchVal,user_data._id]
            socket.emit("search_val",data)
            socket.on("search_user",data=>{setSearchUser(data)});
        }
    },[searchVal])

    useEffect(()=>{
    },[])


    function setselchats(item,id){
        setSelectedChats(state=>{
            let new_array={...state};
            if(!new_array[id]){
                new_array[id]=item
            }
            else{
                new_array[id]=""
            }
            return new_array;
        })
    }


    function submit_signup(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());

        const users=Object.keys(selected_chats)
        users.push(user_data._id)
        const data={...formDataObject,users:users}
        //socket.emit("create_new_group",data)
        save_data(data)
    }

    async function save_data(form_data){
        const result=await  axios.post('https://9w1r6qz3-5000.inc1.devtunnels.ms/api/newgroup/create',{...form_data},{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
        socket.emit("get_new_group_chat",result.data.new_chat)
    }

   
    switch(current_page){
        case 0:
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

            <div className="w-100  ">
            <div className="chat-sidebar-channel scroller mt-4 pl-3" style={{height:"auto"}}>
                <span>Your Selected Chats :</span>
                <ul className="iq-chat-ui nav flex-column nav-pills">
                {Object.keys(selected_chats).length!==0 && Object.values(selected_chats).map((item)=>{if(item!==""){

                    if(item.users[0]._id===user_data._id ){
                        return (<li>
                        <a data-toggle="pill"  >
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-3">
                            <img
                                src={"https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/"+item.users[1]._id+"/"+item.users[1].profile_img}
                                alt="chatuserimage"
                                className="avatar-50 "
                            />
                            </div>
                            <div className="chat-sidebar-name">
                            <h6 className="mb-0">{item.users[1].name}</h6>
                            </div>
                        </div>
                        </a>
                    </li>)
                    }
                    else if(item!==""){
                        return (<li >
                            <a data-toggle="pill" href="#chatbox1" >
                            <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                <img
                                    src={"https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/"+item.users[0]._id+"/"+item.users[0].profile_img}
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                    />
                                </div>
                                <div className="chat-sidebar-name">
                                <h6 className="mb-0">{item.users[1].name}</h6>
                                </div>
                            </div>
                            </a>
                        </li>)
                    }
                }
                })
            }
            
            </ul>
            </div>


            <div className="chat-sidebar-channel scroller mt-4 pl-3" style={{height:"auto"}}>
                <span>Your Chats :</span>
            <ul className="iq-chat-ui nav flex-column nav-pills">
                {chats?.length>0?
                chats.map((item)=>{
                    if(item.chat_type==="Personal"){
                        // console.log("Item in newGroup:",item)

                        if(item.users[0]._id===user_data._id){
                            // console.log(item)
                            return (<li onClick={()=>setselchats(item,item.users[1]._id)} key={item._id}>
                            <a data-toggle="pill"  >
                            <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                <img
                                    src={"https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/"+item.users[1]?._id+"/"+item.users[1]?.profile_img}
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                />
                                </div>
                                <div className="chat-sidebar-name">
                                <h6 className="mb-0">{item.users[1]?.name}</h6>
                                </div>
                            </div>
                            </a>
                        </li>)
                        }
                        else{
                            return (<li onClick={()=>setselchats(item,item.users[1]._id)}>
                                <a data-toggle="pill" href="#chatbox1" >
                                <div className="d-flex align-items-center">
                                    <div className="avatar mr-3">
                                    <img
                                        src={"https://9w1r6qz3-5000.inc1.devtunnels.ms/uploads/"+item.users[0]._id+"/"+item.users[0].profile_img}
                                        alt="chatuserimage"
                                        className="avatar-50 "
                                    />
                                    </div>
                                    <div className="chat-sidebar-name">
                                    <h6 className="mb-0">{item.users[1].name}</h6>
                                    </div>
                                </div>
                                </a>
                            </li>)
                        }
                    }
            })
                :""}
            
            </ul>
        </div>


<button id="next_page" className="btn btn-success text-end mb-3 ps-auto " onClick={()=>{setCurrentPage(1)}}>Next</button>

            </div>
    </div>);

    case 1:
        return (<div>
            <form onSubmit={submit_signup} encType="multipart/form-data">
                            <div class="form-group">
                                 <label for="group_name">Group Name:</label>
                                 <input type="text" class="form-control" id="group_name" placeholder="GroupName" name="group_name" />
                            </div>

                            <div class="form-group">
                                 <label for="message_permission">Select Message Permission</label>
                                 <select class="form-control" id="message_permission" name="message_permission">
                                    <option disabled={true}>Select Message Permission</option>
                                    <option value="All">All Group Members</option>
                                    <option value="Admin">Only Admin</option>
                                 </select>
                            </div>
                            <div class="form-group">
                            <label for="group_image">Group Image</label>
                            <input type="file" className="form-control" id="group_image" name="group_image" />

                            </div>
                            <button className="btn btn-success" type="submit" ><i className="ri-add-line"></i>Create Group</button>
                            </form>

        </div>)
    default:
        return (<div>Error in page Please Reload</div>)
    }
}

export default NewGroup;

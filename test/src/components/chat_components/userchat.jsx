import React, { useContext, useEffect, useState } from "react";
import Chat_Content from "./userchat/chat_content";
import Chat_Header from "./userchat/chat_header";
import New_Message from "./userchat/new_message";
import { useSelector } from "react-redux";
import { FontFamily } from "../../utils/fonts";

function User_Chat() {
    const userchat = useSelector(state => state.selected_chat)
    const user_data = useSelector(state => state.user_data)
    const {Font,setFont}=useContext(FontFamily);

    if (Object.keys(userchat).length !== 0) {
        return (
            <div
                className="tab-pane fade"
                id="chatbox1"
                role="tabpanel"
                style={{fontFamily:Font}}
            >
                <Chat_Header chat_user={userchat._id} login_user={user_data._id} item={userchat} />
                <Chat_Content login_user={user_data._id} item={userchat} />
                <New_Message chat_user={userchat._id} login_user={user_data._id} item={userchat} />
            </div>
        );
    }
    else {
        return (
            <div
                className="tab-pane fade"
                id="chatbox1"
                role="tabpanel"
            >
                <Chat_Header />
                <Chat_Content />
                <New_Message />
            </div>
        );
    }
}

export default User_Chat;
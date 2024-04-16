import React from "react";
import Chat_Content from "./userchat/chat_content";
import Chat_Header from "./userchat/chat_header";
import New_Message from "./userchat/new_message";

function User_Chat(){
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

export default User_Chat;
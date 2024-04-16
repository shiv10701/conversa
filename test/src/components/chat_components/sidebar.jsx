import React from "react";
import Chat_Search from "./sidebar/chat_search";
import Chats from "./sidebar/chats";


function Sidebar(){
    return (
        <>
            <Chat_Search />
            <Chats />
        </>
    );
}

export default Sidebar;
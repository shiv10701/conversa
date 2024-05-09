import React from "react";
import Chat_Search from "./sidebar/chat_search";
import Chats from "./sidebar/chats";
import Calls from "./sidebar/calls";


function Sidebar(){
    return (
        <>
            <Chat_Search />
                        <div className="pt-4">
                           <ul class="nav nav-tabs nav-justified" id="myTab-1" role="tablist">
                              <li class="nav-item">
                                 <a class="nav-link active" id="home-tab" data-toggle="tab" href="#chats" role="tab" aria-controls="home" aria-selected="true"> <i class="ri-message-2-fill h5"></i></a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" id="profile-tab" data-toggle="tab" href="#calls" role="tab" aria-controls="profile" aria-selected="false"><i class="ri-phone-fill h5"></i>  </a>
                              </li>
                           </ul>
                           <div class="tab-content" id="myTabContent-2">
                              <div class="tab-pane fade show active" id="chats" role="tabpanel" aria-labelledby="home-tab">
                                <Chats />
                              </div>
                              <div class="tab-pane fade" id="calls" role="tabpanel" aria-labelledby="profile-tab">
                                <Calls />
                              </div>
                           </div>
                        </div>
        </>
    );
}

export default Sidebar;
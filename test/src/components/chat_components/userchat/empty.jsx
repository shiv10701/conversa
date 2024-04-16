import React from "react";

function Empty_Chat(){
    return (
        <div className="chat-start">
                            {/* <span class="iq-start-icon text-primary"><i class="ri-message-3-line"></i></span> */}
                            {/* <span class="iq-start-icon text-primary">  */}
                            <img
                              src="images/loader.gif"
                              style={{ height: 100, width: 120 }}
                              className="img-fluid"
                              alt="logo"
                            />
                            <button
                              id="chat-start"
                              className="btn bg-white mt-3"
                            >
                              Start Conversation!
                            </button>
                          </div>
    );
}

export default Empty_Chat;
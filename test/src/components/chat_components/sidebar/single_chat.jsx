import React from 'react'

export default function SingleChat() {
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

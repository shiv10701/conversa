import React from "react";
import SingleChat from "./single_chat";

function Chats(){
    return (
        <div className="chat-sidebar-channel scroller mt-4 pl-3">
                        <h5 className="">Public Channels</h5>
                        <ul className="iq-chat-ui nav flex-column nav-pills">
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
                          <li>
                            <a data-toggle="pill" href="#chatbox2">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/06.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-success" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Announcement</h6>
                                  <span>This Sunday we</span>
                                </div>
                                <div className="chat-meta float-right text-center mt-2">
                                  <div className="chat-msg-counter bg-primary text-white">
                                    10
                                  </div>
                                  <span className="text-nowrap">10 min</span>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                        <h5 className="mt-3">Private Channels</h5>
                        <ul className="iq-chat-ui nav flex-column nav-pills">
                          <li>
                            <a data-toggle="pill" href="#chatbox3">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/07.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-warning" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Designer</h6>
                                  <span>There are many </span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a data-toggle="pill" href="#chatbox4">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/08.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-success" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Developer</h6>
                                  <span>passages of Lorem</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a data-toggle="pill" href="#chatbox5">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/09.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-info" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Testing Team</h6>
                                  <span>Lorem Ipsum used</span>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                        <h5 className="mt-3">Direct Message</h5>
                        <ul className="iq-chat-ui nav flex-column nav-pills">
                          <li>
                            <a data-toggle="pill" href="#chatbox6">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/10.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-dark" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Paul Molive</h6>
                                  <span>translation by</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a data-toggle="pill" href="#chatbox7">
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
                                  <h6 className="mb-0">Paige Turner</h6>
                                  <span>Lorem Ipsum which</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <SingleChat />
                          <li>
                            <a data-toggle="pill" href="#chatbox9">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/07.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-danger" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Maya Didas</h6>
                                  <span> but also the leap</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a data-toggle="pill" href="#chatbox10">
                              <div className="d-flex align-items-center">
                                <div className="avatar mr-3">
                                  <img
                                    src="images/user/08.jpg"
                                    alt="chatuserimage"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-warning" />
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Monty Carlo</h6>
                                  <span>Contrary to popular</span>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
    );
}

export default Chats;
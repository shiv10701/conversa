import React from "react";

function Chat_Header(){
    return (
        <div className="chat-head">
                            <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                              <div className="d-flex align-items-center">
                                <div
                                  id="sidebar-toggle"
                                  className="sidebar-toggle"
                                >
                                  <i className="ri-menu-3-line" />
                                </div>
                                <div className="avatar chat-user-profile m-0 mr-3">
                                  <img
                                    src="images/user/05.jpg"
                                    alt="avatar"
                                    className="avatar-50 "
                                  />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-success" />
                                  </span>
                                </div>
                                <h5 className="mb-0">Team Discussions</h5>
                              </div>
                              <div className="chat-user-detail-popup scroller">
                                <div className="user-profile text-center">
                                  <button
                                    type="submit"
                                    className="close-popup p-3"
                                  >
                                    <i className="ri-close-fill" />
                                  </button>
                                  <div className="user mb-4">
                                    <a className="avatar m-0">
                                      <img
                                        src="images/user/05.jpg"
                                        alt="avatar"
                                      />
                                    </a>
                                    <div className="user-name mt-4">
                                      <h4>Nik Jordan</h4>
                                    </div>
                                    <div className="user-desc">
                                      <p>Cape Town, RSA</p>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="chatuser-detail text-left mt-4">
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Nik Name:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Nik
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Tel:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        072 143 9920
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Date Of Birth:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        July 12, 1989
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Gender:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Male
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-6 col-md-6 title">
                                        Language:
                                      </div>
                                      <div className="col-6 col-md-6 text-right">
                                        Engliah
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chat-header-icons d-flex">
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-phone iq-bg-primary"
                                >
                                  <i className="ri-phone-line" />
                                </a>
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-video iq-bg-primary"
                                >
                                  <i className="ri-vidicon-line" />
                                </a>
                                <a
                                  href="javascript:void();"
                                  className="chat-icon-delete iq-bg-primary"
                                >
                                  <i className="ri-delete-bin-line" />
                                </a>
                                <span className="dropdown iq-bg-primary">
                                  <i
                                    className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0"
                                    id="dropdownMenuButton02"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    role="menu"
                                  />
                                  <span
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton02"
                                  >
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-thumb-tack"
                                        aria-hidden="true"
                                      />{" "}
                                      Pin to top
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-trash-o"
                                        aria-hidden="true"
                                      />{" "}
                                      Delete chat
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="JavaScript:void(0);"
                                    >
                                      <i
                                        className="fa fa-ban"
                                        aria-hidden="true"
                                      />{" "}
                                      Block
                                    </a>
                                  </span>
                                </span>
                              </div>
                            </header>
                          </div>
    );
}

export default Chat_Header;
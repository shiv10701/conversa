import React from "react";

function New_Message(){
    return (
        <div className="chat-footer p-3 bg-white">
                            <form
                              className="d-flex align-items-center"
                              action="javascript:void(0);"
                            >
                              <div className="chat-attagement d-flex">
                                <a href="javascript:void();">
                                  <i
                                    className="fa fa-smile-o pr-3"
                                    aria-hidden="true"
                                  />
                                </a>
                                <a href="javascript:void();">
                                  <i
                                    className="fa fa-paperclip pr-3"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                              <input
                                type="text"
                                className="form-control mr-3"
                                placeholder="Type your message"
                              />
                              <button
                                type="submit"
                                className="btn btn-primary d-flex align-items-center p-2"
                              >
                                <i
                                  className="fa fa-paper-plane-o"
                                  aria-hidden="true"
                                />
                                <span className="d-none d-lg-block ml-1">
                                  Send
                                </span>
                              </button>
                            </form>
                          </div>
    );
}

export default New_Message;
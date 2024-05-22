import React, {useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch  } from 'react-redux';
import User_Chat from './chat_components/userchat';
import Empty_Chat from './chat_components/userchat/empty';
import Sidebar from './chat_components/sidebar';
import axios  from 'axios';
import {init_user} from '../components/actions/actions.js';



function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user=useSelector(state=>state);
  
  useEffect(() => {
    // Fade out the loading element after a delay when the component mounts
    const loadingElement = document.getElementById('loading');
    setTimeout(() => {
        if (loadingElement) {
            loadingElement.style.transition = 'opacity 1s ease';
            loadingElement.style.opacity = '0'; // Fade out
            setTimeout(() => {
                if (loadingElement) {
                    loadingElement.style.display = 'none'; // Hide after fading out
                }
            }, 200); // Adjust the duration of the fade-out animation as needed
        }
    }, 200); // Adjust the delay before fading out as needed
}, []); // Empty dependency array ensures this effect runs only once after the component mounts


    return (
  <div>
  {/* loader Start */}
  <div id="loading">
    <div id="loading-center"></div>
  </div>
  {/* loader END */}
  {/* Wrapper Start */}
  <div className="wrapper">
    {/* Page Content  */}
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-body chat-page p-0">
                <div className="chat-data-block">
                  <div className="row" style={{height:"95vh"}}>
                    <div className="col-12 col-lg-3 chat-data-left scroller active show">
                      <Sidebar />
                    </div>
                    <div className="col-lg-9 chat-data p-0 chat-data-right">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade  show"
                          id="default-block"
                          role="tabpanel"
                        >
                          <Empty_Chat />
                        </div>
                        <User_Chat />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Wrapper END */}
  {/* Footer */}
  {/* <footer className="iq-footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a href="privacy-policy.html">Privacy Policy</a>
            </li>
            <li className="list-inline-item">
              <a href="terms-of-service.html">Terms of Use</a>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 text-right">
          Copyright 2020 <a href="/">Vito</a> All Rights Reserved.
        </div>
      </div>
    </div>
  </footer> */}
 
  </div>)};



export default Chat;
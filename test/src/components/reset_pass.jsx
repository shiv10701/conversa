import React, { useEffect, useState } from 'react';
import { Link,useNavigate ,useLocation  } from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux';
import { init_user } from './actions/actions';
import AssignUserData from './local_storage_function';

function ResetPassword({dispatch}) {
    const navigate = useNavigate();
    const location = useLocation();

    const resetToken = new URLSearchParams(location.search).get('resettoken');
    console.log('resetToken=>',resetToken)
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

    const [formData, setFormData] = useState({
        password: '',
        confirm_pass: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [error_msg, set_error_msg] = useState('');
    const [success_msg, set_success_msg] = useState('');

    const resetPass = async (e) => {
        e.preventDefault();
        try {
            set_error_msg(''); 
            set_success_msg('')
            const response = await axios.post("https://9w1r6qz3-5000.inc1.devtunnels.ms/api/forgot-pass/reset", {
                password: formData.password,
                confirm_pass: formData.confirm_pass,
                resetToken: resetToken // Include the reset token in the request body
            });
            set_success_msg(response.data)
            console.log('response =', response)
        } catch (error) {
            console.log(error.response.data)
            set_error_msg(error.response.data);
        }
    };

    return (
        <div>

            <div>
                {/* loader Start */}
                <div id="loading">
                    <div id="loading-center"></div>
                </div>
                {/* loader END */}
                {/* Sign in Start */}
                <section className="sign-in-page">
                    <div className="container bg-white mt-5 p-0">
                        <div className="row no-gutters">
                            <div className="col-sm-6 align-self-center">
                                <div className="sign-in-from">
                                    <h1 className="mb-0 dark-signin"> Reset Password </h1>
                                    <h3 className="text-danger text-center" >{error_msg}</h3>
                                    <h3 className="text-success text-center" >{success_msg}</h3>
                                    <p >Enter your new password and confirm-password </p>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"> New Password </label>
                                            <input type="password" className="form-control mb-0" id="exampleInputEmail1" placeholder="password"
                                                name="password"
                                                value={formData.password} 
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1"> Confirm Password </label>
                                            <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Confirm password" name="confirm_pass"
                                                value={formData.confirm_pass}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="d-inline-block w-100">
                                            <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                                {/* <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label> */}
                                            </div>
                                            <button type="submit" onClick={resetPass} className="btn btn-primary float-right" > Reset Password </button>
                                        </div>
                                        <div className="sign-info">
                                            {/* <span className="dark-color d-inline-block line-height-2">Don't have an account? <a href="./sign-up.html">Sign up</a></span> */}
                                            <span className="dark-color d-inline-block line-height-2"> <Link to="/sign-in">Go to sign In</Link> </span>
                                            <ul className="iq-social-media">
                                                <li><a href="/"><i className="ri-facebook-box-line"></i></a></li>
                                                <li><a href="/"><i className="ri-twitter-line"></i></a></li>
                                                <li><a href="/"><i className="ri-instagram-line"></i></a></li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 text-center">
                                <div className="sign-in-detail text-white">
                                    {/* <a className="sign-in-logo mb-5" href="/"><img src="images/signUpLogo.png" style={{ height: '110px', width: '120px' }} className="img-fluid" alt="logo" /></a> */}
                                    <a className="sign-in-logo mb-5" href="/"><img src="./images/signUpLogo.png" style={{ height: '110px', width: '120px' }} className="img-fluid" alt="logo" /></a>
                                    <div className="slick-slider11" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                        <div className="item">
                                        <img src="images/login/image.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Discover a New Way to Communicate</h4>
                                            <p>Our innovative features and seamless design offer you a fresh and engaging way to stay in touch.</p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default ResetPassword;

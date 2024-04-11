import React from 'react';
import {Link} from 'react-router-dom'


function SignInPage() {
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
                                    <h1 className="mb-0 dark-signin">Sign in</h1>
                                    <p>Enter your email address and password to access admin panel.</p>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <a href="/" className="float-right">Forgot password?</a>
                                            <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div className="d-inline-block w-100">
                                            <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary float-right">Sign in</button>
                                        </div>
                                        <div className="sign-info">
                                            {/* <span className="dark-color d-inline-block line-height-2">Don't have an account? <a href="./sign-up.html">Sign up</a></span> */}
                                            <span className="dark-color d-inline-block line-height-2">Don't have an account?  <Link to="/sign-up">Sign Up</Link> </span>
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
                                            <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Manage your orders</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </div>
                                        <div className="item">
                                            <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Manage your orders</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </div>
                                        <div className="item">
                                            <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Manage your orders</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
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

export default SignInPage;

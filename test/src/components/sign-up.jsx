import React from 'react';
import {Link} from 'react-router-dom'


function SignUpPage() {
    return (
        <div>
            <div>
                {/* loader Start */}
                <div id="loading">
                    <div id="loading-center"></div>
                </div>
                {/* loader END */}
                {/* Sign in Start */}
                <section className="sign-in-">
                    <div className="container mt-5 p-0 bg-white">
                        <div className="row no-gutters " style={{ maxHeight: '90vh', overflow: 'hidden' }}>
                            <div className="col-sm-6 align-self-center" style={{ maxHeight: '90vh', overflow: 'auto', paddingBottom: '10vh' }}>
                                <div className="sign-in-from">
                                    <h1 className="mb-0">Sign Up</h1>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="fname_id">Your Full Name</label>
                                            <input type="email" className="form-control mb-0" id="fname_id" placeholder="Your Full Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_id">Email address</label>
                                            <input type="email" className="form-control mb-0" id="email_id" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="genderRadio">Gender</label><br />
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="maleRadio" name="gender" className="custom-control-input" value="male" />
                                                <label className="custom-control-label" htmlFor="maleRadio">Male</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="femaleRadio" name="gender" className="custom-control-input" value="female" />
                                                <label className="custom-control-label" htmlFor="femaleRadio">Female</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="otherRadio" name="gender" className="custom-control-input" value="other" />
                                                <label className="custom-control-label" htmlFor="otherRadio">Other</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dobInput">Date of Birth</label>
                                            <input type="date" className="form-control" id="dobInput" name="dob" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="country_id">Country</label>
                                            <select className="form-control" id="country_id">
                                                <option value="USA">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                {/* Add more options for other countries as needed */}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone_id">Phone</label>
                                            <input type="tel" className="form-control mb-0" id="phone_id" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="accountTypeRadio">Account Type</label><br />
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="personalRadio" name="accountType" className="custom-control-input" value="personal" />
                                                <label className="custom-control-label" htmlFor="personalRadio">Personal</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="buisnessRadio" name="accountType" className="custom-control-input" value="organization" />
                                                <label className="custom-control-label" htmlFor="buisnessRadio">Business</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="profilePhoto">Profile Photo</label>
                                            <input type="file" className="form-control-file" id="profilePhoto" accept="image/*" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="usernameInput">Username</label>
                                            <input type="text" className="form-control" id="usernameInput" name="username" placeholder="Username" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password_id">Password</label>
                                            <input type="password" className="form-control mb-0" id="password_id" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="conf_pass_id">Confirm Password</label>
                                            <input type="password" className="form-control mb-0" id="conf_pass_id" placeholder="Confirm Password" />
                                        </div>
                                        <div className="d-inline-block w-100">
                                            <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">I accept <a href="#">Terms and Conditions</a></label>
                                            </div>
                                            <button type="submit" className="btn btn-primary float-right">Sign Up</button>
                                        </div>
                                        <div className="sign-info pb-5">
                                            <span className="dark-color d-inline-block line-height-2">Already Have Account ?  <Link to="/sign-in">Log in </Link></span>
                                            <ul className="iq-social-media">
                                                <li><a href="#"><i className="ri-facebook-box-line"></i></a></li>
                                                <li><a href="#"><i className="ri-twitter-line"></i></a></li>
                                                <li><a href="#"><i className="ri-instagram-line"></i></a></li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 text-center">
                                <div className="sign-in-detail text-white">
                                    <a className="sign-in-logo mb-5" href="#"><img src="images/signUpLogo.png" className="img-fluid" style={{ height: '110px', width: '120px' }} alt="logo" /></a>
                                    <div className="slick-slider11">
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

export default SignUpPage;

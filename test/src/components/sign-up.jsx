import React,{useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Country} from 'country-state-city'
import axios from 'axios'


function SignUpPage() {

    const config = {
        headers: {
          // Include the custom header with its value
          'ngrok-skip-browser-warning': 'true',
          // Add other headers if needed
          // Example:
          // 'Authorization': 'Bearer your_access_token',
          // 'Content-Type': 'application/json'
        }
      };

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


    let name,email,password,phone_no,username,gender,dob,type,country,profile_pic,cnf_password;
    function submit_signup(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        save_data(formDataObject)
    }

    async function save_data(form_data){
        const result=await  axios.post('https://9w1r6qz3-5000.inc1.devtunnels.ms/api/auth/signup',{...form_data},{headers: {'Content-Type': 'multipart/form-data','ngrok-skip-browser-warning': 'true'}});
        console.log(result);
    }
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
                                    <form className="mt-4" onSubmit={submit_signup} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label htmlFor="fname_id">Your Full Name</label>
                                            <input type="text" className="form-control mb-0" id="fname_id" placeholder="Your Full Name" name="name" ref={node=>(name=node)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_id">Email address</label>
                                            <input type="email" className="form-control mb-0" id="email_id" placeholder="Enter email" name="email" ref={node=>(email=node)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="genderRadio">Gender</label><br />
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="maleRadio" name="gender" className="custom-control-input" value="male" ref={node=>(gender=node)}/>
                                                <label className="custom-control-label" htmlFor="maleRadio">Male</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="femaleRadio" name="gender" className="custom-control-input" value="female" ref={node=>(gender=node)}/>
                                                <label className="custom-control-label" htmlFor="femaleRadio">Female</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="otherRadio" name="gender" className="custom-control-input" value="other" ref={node=>(gender=node)}/>
                                                <label className="custom-control-label" htmlFor="otherRadio">Other</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dobInput">Date of Birth</label>
                                            <input type="date" className="form-control" id="dobInput" name="dob" ref={node=>(dob=node)}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="country_id">Country</label>
                                            <select className="form-control" id="country_id" defaultValue={""} name="country" ref={node=>(country=node)}>
                                                <option value="" disabled>Select Country</option>
                                                {Country.getAllCountries().map((country)=>{return <option value={country.isoCode}>{country.name}</option>})}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone_id">Phone</label>
                                            <input type="tel" className="form-control mb-0" id="phone_id" placeholder="Enter Phone no." name="phone_no" ref={node=>(phone_no=node)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="accountTypeRadio">Account Type</label><br />
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="personalRadio" name="type" className="custom-control-input" value="personal" ref={node=>(type=node)}/>
                                                <label className="custom-control-label" htmlFor="personalRadio">Personal</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="buisnessRadio" name="type" className="custom-control-input" value="business" ref={node=>(type=node)}/>
                                                <label className="custom-control-label" htmlFor="buisnessRadio">Business</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="profilePhoto">Profile Photo</label>
                                            <input type="file" className="form-control-file" id="profilePhoto" accept="image/*" name="profile_img" ref={node=>(profile_pic=node)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="usernameInput">Username</label>
                                            <input type="text" className="form-control" id="usernameInput" name="username" placeholder="Username" ref={node=>(username=node)}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password_id">Password</label>
                                            <input type="password" className="form-control mb-0" id="password_id" placeholder="Password" name="password" ref={node=>(password=node)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="conf_pass_id">Confirm Password</label>
                                            <input type="password" className="form-control mb-0" id="conf_pass_id" placeholder="Confirm Password" name="confirm_password" ref={node=>(cnf_password=node)}/>
                                        </div>
                                        <div className="d-inline-block w-100">
                                            <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">I accept <a href="#">Terms and Conditions</a></label>
                                            </div>
                                            <button type="submit" className="btn btn-primary float-right" >Sign Up</button>
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
                                        <img src="images/login/image.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Discover a New Way to Communicate</h4>
                                            <p>Our innovative features and seamless design offer you a fresh and engaging way to stay in touch.</p>
                                        </div>
                                        {/* <div className="item">
                                            <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Manage your orders</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </div>
                                        <div className="item">
                                            <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                            <h4 className="mb-1 text-white">Manage your orders</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </div> */}
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

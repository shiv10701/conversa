import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux';
import { init_user } from './actions/actions';
import AssignUserData from './local_storage_function';


function SignInPage({dispatch}) {

    const ipaddress1=process.env.REACT_APP_IPADDRESS;
    console.log("this is ip address variable",ipaddress1)
    console.log("This is env file :",JSON.stringify(process.env))
    const navigate = useNavigate();
    let [ipaddress,setIpAddress]=useState("")
    useEffect(()=>{
        const response=async ()=>{
            const response = await axios.get('https://api.ipify.org?format=json');
            console.log(JSON.stringify(response))
            setIpAddress(response.data.ip)
        }
        response()
    },[])

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

    useEffect(()=>{
        assign_user_data();
    },[])
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [error_msg, set_error_msg] = useState();

    const isValidUser = async (e) => {
        e.preventDefault();
        console.log("tried logging in ")
        try {
            set_error_msg(''); 
            const response = await axios.post(`http://localhost:5000/api/auth/login`, formData);
            console.log(response.data.user_data);

            dispatch(init_user(response.data.user_data))
            localStorage.setItem("user_data",JSON.stringify(response.data.user_data))
            navigate("/")
        } catch (error) {
            set_error_msg(error.response);
        }
    };

    async function assign_user_data(){
        const user_data=JSON.parse(localStorage.getItem("user_data"))||null;
        if(user_data!==null){
            dispatch(init_user(user_data))
            navigate("/");
        }
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
                <section className="sign-in-page">
                    <div className="container bg-white mt-5 p-0">
                        <div className="row no-gutters">
                            <div className="col-sm-6 align-self-center">
                                <div className="sign-in-from">
                                    <h1 className="mb-0 dark-signin">Sign in</h1>
                                    <h3 className="text-danger text-center" >{error_msg}</h3>
                                    <p >Enter your email address and password to access admin panel.</p>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <a href="/" className="float-right">Forgot password?</a>
                                            <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password" name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="d-inline-block w-100">
                                            <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                                {/* <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label> */}
                                            </div>
                                            <button type="submit" onClick={isValidUser} className="btn btn-primary float-right" >Sign in</button>
                                            
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

export default connect()(SignInPage);

// import logo from './logo.ico';
import './App.css';
import Chat from './components/chat';
import SignInPage from './components/sign-in';
import SignUpPage from './components/sign-up';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reduce from './components/reducers/reducer';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import AssignUserData from './components/local_storage_function';
import ForgetPassword from './components/forget_pass';
import ResetPassword from './components/reset_pass';




function App() {

  const user=useSelector(state=>state.user_data);
  let [loading,setLoading]=useState(true)
  useEffect(()=>{setTimeout(()=>{setLoading(false)},1000)},[])

  
  return (
    !loading?<>
      <Router>
      
        <Routes> 
          <Route exact path='/' element={Object.keys(user).length!=0?<Chat />:<Navigate to="/sign-in" />} />
          <Route exact path='/sign-in' element={<SignInPage />} />
          <Route exact path='/sign-up' element={<SignUpPage />} />
          <Route exact path='/forget-pass' element={<ForgetPassword />} />
          <Route exact path='/reset-pass' element={<ResetPassword />} />
          <Route path='*' element={<SignInPage />} />
        </Routes>
      </Router>
    </>:<>
    <div className='d-flex justify-content-center align-items-center w-100' style={{height:"90vh"}}>
    <div id="loading">
    <div id="loading-center"></div>
  </div>
    </div>
    </>
  );
}

export default App;

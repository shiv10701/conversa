// import logo from './logo.ico';
import './App.css';
import Chat from './components/chat';
import SignInPage from './components/sign-in';
import SignUpPage from './components/sign-up';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
      <>
      <Router>
        <Routes> 
          <Route exact path='/' element={<Chat />} />
          <Route exact path='/sign-in' element={<SignInPage />} />
          <Route exact path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

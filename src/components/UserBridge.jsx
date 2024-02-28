import { NavLink } from "react-router-dom";
import "../css/userBridge.css";
import LoginCrewButton from "./LoginCrewButton";
import LoginCaptainButton from "./LoginCaptainButton";
import Rudder from '../assets/images/rudder.svg';

const onClick = () => {
  console.log('Login button licked!');
};

const UserBridge = () => {
  return (
    <div className="userBridge-overlay">
        <div className="userBridge-content">
          
          <h2>Log in or Sign up</h2>
          <img src={Rudder} className="rudderImg" alt="Rudder"></img>
          <div>
            <div className="loginSignupSection">
              <NavLink to="/profile/CrewLogin">
                <LoginCrewButton onClick={onClick}/>
              </NavLink>
              <h4 className="smallQuestion">Don't have a crew account?</h4>
              <NavLink to="/profile/CrewSignup">
                <h5 className="signUp">Sign up</h5>
              </NavLink>
            </div>

            <div className="loginSignupSection">
              <NavLink to="/profile/CaptainLogin">
                <LoginCaptainButton onClick={onClick}/>
              </NavLink>
              <h4 className="smallQuestion">Don’t have a captain account?</h4>
              <NavLink to="/profile/CaptainSignup" className="signUp">
                <h5 className="signUp">Sign up</h5>
              </NavLink>
            </div>
          </div>
        </div>
  </div>
  )
}

export default UserBridge;
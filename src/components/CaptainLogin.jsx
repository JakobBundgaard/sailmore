import { useState } from "react";
import captainImage from "../assets/images/captain.svg";
import "../css/captainLogin.css";
import StandardLoginButton from "./StandardLoginButton";
import CancelButton from "./CancelButton";
import BackArrow from "./BackArrow";

const CaptainLogin = () => {
   const [formData, setFormData] = useState({
      captainEmail: "",
      captainPassword: "",
   });

   const [error, setError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   // Handle input changes
   const handleChange = e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault();
    
      try {
        // Send the form data to your server for insertion into the database
        const response = await fetch("/api/captain/captainLogin.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          console.log("User logged in successfully!");
          const jsonResponse = await response.json();
          if (jsonResponse["error"]) {
            console.log(jsonResponse["error"]);
            setError('');
            setPasswordError(jsonResponse["error"]);
          } else if (jsonResponse["success"]) {
            console.log(jsonResponse["success"]);
    
            const captainId = jsonResponse["captainId"];
            const captainName = jsonResponse["captainName"];
            const shipId = jsonResponse["shipId"];
    
            sessionStorage.setItem("captainId", captainId);
            sessionStorage.setItem("captainName", captainName);
            sessionStorage.setItem("shipId", shipId);
    
            //navigate to profile page
            window.location.href = "/captainProfile";
          }
        } else {
          setError('Error logging in');
          setPasswordError('');
        }
      } catch (error) {
        setError('Error: ' + error.message);
        setPasswordError('');
      }
    };

   return (
      <div className="page-wrapper">
         <BackArrow />
         <h2 className="loginTitle">Captain Login</h2>
         <img src={captainImage} alt="Beautiful Image" className="captainImageLogin" />
         <form className="loginForm">
            <label className="label">
               <p>Email:</p>
               <input type="email" name="captainEmail" value={formData.captainEmail} onChange={handleChange} className="loginInput" required />
            </label>

            <label className="label">
               <p>Password:</p>
               <input
                  type="password"
                  name="captainPassword"
                  value={formData.captainPassword}
                  onChange={handleChange}
                  className="loginInput"
                  required
               />
            </label>

            <div className="error-message">
               {error && <p>{error}</p>}
               {passwordError && <p>{passwordError}</p>}
            </div>

            <div className="flexRow">
               <StandardLoginButton onClick={handleSubmit} />
               <CancelButton />
            </div>
         </form>
      </div>
   );
};

export default CaptainLogin;

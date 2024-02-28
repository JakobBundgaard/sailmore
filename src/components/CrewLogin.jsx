import { useState } from 'react';
import crewImage from "../assets/images/crew.svg";
import "../css/crewLogin.css";
import BackArrow from "../components/BackArrow";
import LoginButton from "./StandardLoginButton";
import CancelButton from "./CancelButton";

const CrewLogin = () => {
  const [formData, setFormData] = useState({
    crewEmail: '',
    crewPassword: '',
  });

  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/crew/crewLogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log('User logged in successfully!');
          sessionStorage.setItem('crewId', responseData.crewData.crewId);
          window.location.href = "/crewProfile";
        } else {
          if (responseData.error === 'Email does not exist.') {
            setError(responseData.error);
            setPasswordError('');
          } else if (responseData.error === 'Incorrect password.') {
            setPasswordError(responseData.error);
            setError('');
          }
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

  const handleCancel = () => {
    console.log('Cancel button clicked!');
  };

  return (
    <div className="page-wrapper">
      <div className="top-panel">
        <BackArrow />
      </div>
      <h2 className='loginTitle'>Crew Login</h2>
      <img src={crewImage} alt="Beautiful Image" className="crewImageLogin" />
      <form onSubmit={handleSave} className='loginForm'>
        <label className='label'>
          <p>Email:</p>
          <input type="email" name="crewEmail" value={formData.crewEmail} onChange={handleChange} className='loginInput' required />
        </label>

        <label className='label'>
          <p>Password:</p>
          <input type="password" name="crewPassword" value={formData.crewPassword} onChange={handleChange} className='loginInput' required />
        </label>
        <div className="error-message">
          {error && <p>{error}</p>}
          {passwordError && <p>{passwordError}</p>}
        </div>

        <div className="flexRow">
          <LoginButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default CrewLogin;
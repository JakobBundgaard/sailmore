import PropTypes from 'prop-types';
import "../css/LogoutButton.css";

function LogoutButton({ onClick }) {
   
   return (
      <button className="logoutButton" onClick={onClick}>
         Logout
      </button>
   );
}

LogoutButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  

export default LogoutButton;
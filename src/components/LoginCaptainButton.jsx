import PropTypes from "prop-types";
import "../css/loginButton.css";

function LoginCaptainButton({ onClick }) {
   return (
      <button className="loginButton" onClick={onClick}>
         Login as captain
      </button>
   );
}

LoginCaptainButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default LoginCaptainButton;

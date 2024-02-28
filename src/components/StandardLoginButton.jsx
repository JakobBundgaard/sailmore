import "../css/saveButton.css";
import PropTypes from "prop-types";

function StandardLoginButton({ onClick }) {
   return (
      <button className="saveButton" onClick={onClick}>
         Log in
      </button>
   );
}

StandardLoginButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default StandardLoginButton;

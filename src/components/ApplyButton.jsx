import PropTypes from "prop-types";
import "../css/ApplyButton.css";

function ApplyButton({ onClick }) {
   return (
      <button className="applyButton" onClick={onClick}>
         Apply
      </button>
   );
}

ApplyButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};



export default ApplyButton;
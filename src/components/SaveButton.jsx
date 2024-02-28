import PropTypes from "prop-types";
import "../css/SaveButton.css";

function SaveButton({ onClick }) {
   return (
      <button className="saveButton" onClick={onClick}>
         Save
      </button>
   );
}

SaveButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};



export default SaveButton;
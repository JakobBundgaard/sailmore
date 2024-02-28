import PropTypes from "prop-types";
import "../css/SaveButton.css";
import editButton from "../assets/images/editButton.svg";
import "../css/EditButton.css";

function EditButton({ onClick }) {
   return (
      <button className="editButton" onClick={onClick}>
         <img src={editButton} alt="Edit button" />
      </button>
   );
}

EditButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default EditButton;

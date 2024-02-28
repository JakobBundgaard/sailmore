import PropTypes from "prop-types";
import deleteButton from "../assets/images/DeleteButton.svg";
import "../css/DeleteButton.css";

function DeleteButton({ onClick }) {
   return (
      <button className="deleteButton" onClick={onClick}>
         <img src={deleteButton} alt="Delete button" />
      </button>
   );
}

DeleteButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default DeleteButton;

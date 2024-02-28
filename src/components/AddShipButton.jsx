import PropTypes from "prop-types";
import addShip from "../assets/images/add-boat.svg";
import "../css/AddShipButton.css";

function AddShipButton({ onClick }) {
   return (
      <button className="addShipButton" onClick={onClick}>
         <img src={addShip} alt="add ship button" />
      </button>
   );
}

AddShipButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default AddShipButton;
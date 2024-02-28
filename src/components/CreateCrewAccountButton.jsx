import "../css/createCrewAccountButton.css";
import PropTypes from "prop-types";

function CreateCrewAccountButton({ props }) {
   return (
      <button className="createCrewAccountButton" onClick={props}>
         Create a crew account
      </button>
   );
}

CreateCrewAccountButton.propTypes = {
   props: PropTypes.func.isRequired,
};

export default CreateCrewAccountButton;

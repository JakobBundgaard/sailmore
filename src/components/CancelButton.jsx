import { useNavigate } from "react-router";
import "../css/cancelButton.css";

function CancelButton() {
   const navigate = useNavigate();
   const onClick = () => {
      navigate(-1);
   };
   return (
      <button className="cancelButton" onClick={onClick}>
         Cancel
      </button>
   );
}

export default CancelButton;

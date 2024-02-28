import "../css/BackArrow.css";
import backArrow from "../assets/images/BackArrow.svg";
import { useNavigate } from "react-router-dom";

function BackArrow() {
   const navigate = useNavigate();

   const goBack = () => {
      navigate(-1);
   };

   return (
      <div className="backArrow" onClick={goBack}>
         <img src={backArrow} alt="Back Arrow" />
      </div>
   );
}
export default BackArrow;

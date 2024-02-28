import "../css/banner.css";
import warning from "../assets/images/warning.svg";
import { useNavigate } from "react-router-dom";

function Banner() {

   return (
      <div className="banner">
         <img src={warning} alt="warning" />
         <div className="banner-center">
         <h4>This is a school project</h4>
         <p>Click <a href="https://sailmore.net/">here</a> to get redirected to the real site</p>
         </div>
         <img src={warning} alt="warning" />
      </div>
   );
}
export default Banner;

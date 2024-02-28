import { Outlet, NavLink } from "react-router-dom";
import placeholder from "../assets/images/boat.jpg";
import "../css/PreviewTrip.css";

const BoatPreview = ({shipName, shipModel, shipDescription, shipId}) => {

    return <>
        <NavLink to={`/boat/${shipId}`}>
            <div className="preview-wrapper">
                <div className="preview-image-container">
                    <img src={placeholder} alt="Preview Image" />
                </div>
                <div className="description-wrapper">
                    <div>
                        <h3>{shipName}</h3>
                        <p>{shipModel}</p>
                        <p>{shipDescription}</p>
                    </div>
                </div>
            </div>
        </NavLink>
        <Outlet />
    </>;
  };
  
  export default BoatPreview;
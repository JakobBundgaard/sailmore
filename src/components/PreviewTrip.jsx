import { Outlet, NavLink } from "react-router-dom";
import placeholder from "../assets/images/boat.jpg";
import "../css/PreviewTrip.css";

const PreviewTrip = ({ trip }) => {
  // Destructure trip to individual variables
  const { tripId, startLocation, endLocation, shipId, shipName, captainId, imagePath, price, equipment, rules } = trip;

  // Convert startDate and endDate to Date objects
  const startDateObj = new Date(trip.startDate);
  const endDateObj = new Date(trip.endDate);

  // Format startDate and endDate
  const options = { year: 'numeric', day: 'numeric', month: 'short' };
  const startDateFormatted = startDateObj.toLocaleDateString('en-GB', options);
  const endDateFormatted = endDateObj.toLocaleDateString('en-GB', options);

  // Check if the logged-in user is a captain and the ship was created by that captain
  const loggedInCaptainId = sessionStorage.getItem("captainId");
  const isCaptain = loggedInCaptainId !== null;
  const isCreatedByLoggedInCaptain = isCaptain && captainId === loggedInCaptainId;

  // Apply a class to the ship name based on the condition
  const shipNameClass = isCreatedByLoggedInCaptain ? 'orange-ship-name' : '';

  return (
    <>
      <NavLink to={`/trip/${tripId}`}>
        <div className={`preview-wrapper preview-container ${shipNameClass}`}>
          <div className="preview-image-container">
            <img src={placeholder} alt="Preview Image" />
            <div className="text-bubble preview-location">
              <p>{startLocation} - {endLocation}</p>
            </div>
          </div>
          <div className="description-wrapper">
            <div>
              <h3 className={shipNameClass}>{shipName}</h3>
              <p>{startDateFormatted} - {endDateFormatted} · 0 stops</p>
              <div className="hashtag-container">
                <div className="text-bubble hashtag">
                  <p>{equipment}</p>
                </div>
                <div className="text-bubble hashtag">
                  <p>{rules}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-bubble">
                <p>€{price}</p>
                <span>per day</span>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <Outlet />
    </>
  );
};

export default PreviewTrip;

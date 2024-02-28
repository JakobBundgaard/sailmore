import { Outlet, NavLink, useParams } from "react-router-dom";
import placeholder from "../assets/images/boat.jpg";
import pfp from "../assets/images/captain.jpg";
import certified from "../assets/images/certified-badge.svg";
import "../css/PreviewTrip.css";
import "../css/TripDetails.css";
import EditButton from '../components/EditButton';
import BackArrow from "../components/BackArrow";
import ApplyButton from "../components/ApplyButton";
import { useEffect, useState } from 'react';



const TripDetails = () => {
    const [tripData, setTripData] = useState(null);
    const { id } = useParams();

    const isCaptain = sessionStorage.getItem("captainId") !== null;
    const loggedInCaptainId = sessionStorage.getItem("captainId");
    const isGuest = !isCaptain;

    useEffect(() => {
        fetch(`/api/trip/readTrip.php?tripId=${id}`)
            .then(response => response.json())
            .then(data => {
                setTripData(data[0]);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, [id]);
// Destructure tripData to individual variables
const { startLocation, endLocation, shipId, shipName, captainId, imagePath, totalCrewSpaces, tripDescription, shipCrew, captainName, equipment, rules, price, shipDescription } = tripData || {};

// Convert startDate and endDate to Date objects
const startDateObj = new Date(tripData?.startDate);
const endDateObj = new Date(tripData?.endDate);

// Format startDate and endDate
const options = { year: 'numeric', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
const startDateFormatted = startDateObj.toLocaleDateString('en-GB', options);
const endDateFormatted = endDateObj.toLocaleDateString('en-GB', options);

function handleClick() {
    const loggedInCaptainId = sessionStorage.getItem("captainId");
    const loggedInCrewId = sessionStorage.getItem("crewId");
  
    console.log("loggedInCaptainId:", loggedInCaptainId);
    console.log("loggedInCrewId:", loggedInCrewId);
  
    if (loggedInCaptainId && String(loggedInCaptainId) === String(captainId)) {
      // Navigate to the edit page for the logged-in captain
      window.location.href = `/update-trip/${id}`;
    } else if (!loggedInCaptainId && loggedInCrewId) {
      const crewApplied = window.confirm("You have applied for the trip.");
      if (crewApplied) {
        console.log("Apply logic for crew");
        // Perform any additional logic here if needed
      }
    } else if (!loggedInCaptainId && !loggedInCrewId) {
      const userConfirmed = window.confirm("You need to log in to apply! Do you want to log in?");
      if (userConfirmed) {
        window.location.href = "/profile";
      }
      console.log("Apply logic for guests");
    }
  }
  
  
  
  
  
  
  

    return <div style={{padding: '1em', marginBottom: '80px'}}>
        <div className="preview-wrapper">
            <div className="top-panel">
                <BackArrow />
                <h1>{startLocation} - {endLocation}</h1>
            </div>
            <div className="preview-image-container">
                <img src={placeholder} alt="Preview Image" />
                <div className="text-bubble preview-location">
                    <p>{startLocation} - {endLocation}</p>
                </div>
            </div>
            <div className="description-wrapper">
            <div className="edit-profile">

          </div>
                <div>
                    <h3>{shipName}</h3>
                    <p>Departure: {startDateFormatted}</p>
                    <p>Arrival: {endDateFormatted}</p>
                    <p>0 stops</p>
                    <p>{totalCrewSpaces} / {shipCrew} gaster</p>
                </div>

                {isCaptain && String(loggedInCaptainId) === String(captainId) && (
                    // Render EditButton only if captainId matches loggedInCaptainId
                    <EditButton onClick={handleClick} />
                )}
                {(isGuest || !isCaptain) && <ApplyButton onClick={handleClick} />}
                <div>
                    <div className="text-bubble">
                        <p>€{price}</p>
                        <span>per day</span>
                    </div>
                </div>
            </div>
            
            <div>
                <p>{tripDescription}</p>
                <p>{startLocation} - {endLocation}</p>
                <div><div className="circle" /><div className="line" /><div className="circle" /></div>
                {loggedInCaptainId == captainId ? (
                    <NavLink to="/captainProfile">                    
                    <article className="pfp-wrapper">
                    <img src={pfp} alt="Profile picture of {captainName}" className="pfp" />
                    <div>
                        <img src={certified} alt="Certified Badge" />
                        <h4>{captainName}</h4>
                    </div>
                </article></NavLink>
                ) : (
                    <NavLink to={`/skipper/${captainId}`}>                    
                    <article className="pfp-wrapper">
                    <img src={pfp} alt="Profile picture of {captainName}" className="pfp" />
                    <div>
                        <img src={certified} alt="Certified Badge" />
                        <h4>{captainName}</h4>
                    </div>
                </article></NavLink>
                )}
                
                <Outlet />
                <p>{shipDescription}</p>
                <article>
                <h4>Equipment on board</h4>
                <ul>
                    <li>{equipment}</li>
                </ul>
                </article>

                <article>
                    <h4>Rules on board</h4>
                    <ul>
                        <li>{rules}</li>
                    </ul>
                </article>
            </div>
        </div>
        
    </div>

  };
  
  export default TripDetails;
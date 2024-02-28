import { NavLink, useParams } from "react-router-dom";
// import placeholder from "../assets/images/boat2.jpg";
import pfboat from "../assets/images/boat2.jpg";
import pfp from "../assets/images/captain.jpg";
import certified from "../assets/images/certified-badge.svg";
import "../css/BoatDetails.css";
import "../css/PreviewTrip.css";
import "../css/SkipperProfile.css";
import BackArrow from "../components/BackArrow";
import EditButton from "../components/EditButton";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function handleClick() {
  console.log("Clicked");
}

const BoatDetails = () => {
  const [boatData, setBoatData] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    fetch("../api/ship/getShip.php?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Viser data fra API i konsollen

        // Omdanner JSON-data til brugbare objekter og gemmer dem i state
        setBoatData(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
      });
  }, []);

  return (
    <div>
      <div className="top-panel">
        <BackArrow />
      </div>
      <div className="profile-images">
        <img src={pfboat} alt="Profile Image" />
      </div>
      <div className="page-wrapper">
        <div className="profile-top">
          <div>
            {boatData && (
              <div className="name-and-age">
                <h1 className="BoatName">{boatData.shipName}</h1>
                <h3 className="BoatYear">{boatData.shipYear}</h3>
              </div>
            )}
            {boatData && (
              <div className="model-and-crew">
                <h4 className="BoatModel">{boatData.shipModel}</h4>
                <h4 className="BoatCrew">
                  Space for {boatData.shipCrew} crewmates
                </h4>
              </div>
            )}
          </div>
          <div className="edit-profile">
            <Link to={`/EditShip/${id}`}>
              {/* 'to' angiver den sti, du vil navigere til */}
              <EditButton onClick={handleClick} />
            </Link>
          </div>
        </div>
        <hr />
        {boatData && (
          <>
            <h2 className="about-me-boat">About Me</h2>
            <p className="boat-description">{boatData.shipDescription}</p>
          </>
        )}
        <hr />
        <NavLink to="/skipper/:id">
          <article className="pfp-wrapper">
            <img
              src={pfp}
              alt="Profile picture of {username}"
              className="pfp"
            />
            <div>
              <img src={certified} alt="Certified Badge" />
              <h4>Skipper Skræk</h4>
            </div>
          </article>
        </NavLink>
      </div>
    </div>
  );
};

export default BoatDetails;

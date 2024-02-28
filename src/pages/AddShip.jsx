import { useState } from "react";
import "../css/AddShip.css";
import crewImage from "../assets/images/sailing-unsplash.jpg";
import SaveButton from "../components/SaveButton.jsx";
import CancelButton from "../components/CancelButton.jsx";
import BackArrow from "../components/BackArrow.jsx";

const AddShip = () => {
  const [formData, setFormData] = useState({
    shipName: "",
    shipModel: "",
    shipDescription: "",
    shipCrew: "",
    shipYear: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("../api/ship/addShip.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Assuming your PHP returns the new ship's ID
        console.log("responseData", responseData);
        // Redirect to the newly created ship's page using its ID
        if (responseData.shipId) {
          const newShipId = responseData.shipId;
          window.location.href = `/boat/${newShipId}`; // Redirect to the specific ship's page
        } else {
          console.error("No ship ID returned");
        }
      } else {
        console.error("Error adding trip");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  function handleClick() {
    console.log("Clicked");
 }
 
  return (
    <div className="page-wrapper">
    <BackArrow />
      <h1>Add ship</h1>
      <img src={crewImage} alt="Beautiful Image" className="crewImage" />
      <form onSubmit={handleSubmit} className="signupform">
        {/* Input fields for user details */}
        {/* <label className="label">
          Upload image of your ship:
          <input
            type="file"
            name="uploadImage"
            value={formData.uploadImage}
            onChange={handleChange}
            className="signupInput"
            required
          />
        </label> */}

        <label className="label">
          Ship name:
          <input
            type="text"
            name="shipName"
            value={formData.shipName}
            onChange={handleChange}
            className="signupInput"
            required
          />
        </label>

        <label className="label">
          Ship model:
          <input
            type="text"
            name="shipModel"
            value={formData.shipModel}
            onChange={handleChange}
            className="signupInput"
            required
          />
        </label>

        <label className="label">
          Describe your ship:
          <textarea
            name="shipDescription"
            value={formData.shipDescription}
            onChange={handleChange}
            className="bioField"
          ></textarea>
        </label>

        <div className="gender-age-container">
          <label className="label">
            Crew spaces:
            <input
              type="number"
              name="shipCrew"
              value={formData.shipCrew}
              onChange={handleChange}
              className="smallInputField"
            />
          </label>

          <label className="label">
            Year:
            <input
              type="number"
              name="shipYear"
              value={formData.crewYear}
              onChange={handleChange}
              className="smallInputField"
            />
          </label>
        </div>

        <div className="flexRow">
          <SaveButton onClick={handleClick} />
          <CancelButton />
        </div>
      </form>
    </div>
  );
};

export default AddShip;

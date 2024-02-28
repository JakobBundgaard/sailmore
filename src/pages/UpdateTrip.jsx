import "../css/AddShip.css";
import crewImage from "../assets/images/boat2.jpg";
import SaveButton from "../components/SaveButton.jsx";
import CancelButton from "../components/CancelButton.jsx";
import BackArrow from "../components/BackArrow.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTrip = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    tripDescription: "",
    startLocation: "",
    endLocation: "",
    totalCrewSpaces: "",
    price: "",
    equipment: "",
    rules: ""
  });
  const [tripData, setTripData] = useState(null);


  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`../api/trip/readTrip.php?tripId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setTripData(data[0]);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
      });
  }, [id]);

  const { startLocation, endLocation, tripDescription, equipment, rules, price } = tripData || {};
  const startDateObj = tripData?.startDate ? new Date(tripData.startDate) : new Date();
  const endDateObj = tripData?.endDate ? new Date(tripData.endDate) : new Date();
  
  // Format startDate and endDate
  const startDateFormatted = `${startDateObj.toISOString().split('.')[0]}`;
  const endDateFormatted = `${endDateObj.toISOString().split('.')[0]}`;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'datetime-local') {
        // Convert the datetime-local value to a Date object
        setFormData({ ...formData, [name]: new Date(value) });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data til backend:", { ...formData, tripId: id });
      // Send the form data to your server for insertion into the database
      const response = await fetch("../../api/trip/updateTrip.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, tripId: id }), // inkluder shipId i dataen
      });

      if (response.ok) {
        console.log("response ok");
        window.location.href = `/trip/${id}`;
      } else {
        console.error("Fejl ved opdatering af trip");
      }
    } catch (error) {
      console.error("Fejl:", error);
    }
  };

  const handleDelete = async () => {
        // Display a confirmation dialog
    const confirmed = window.confirm("Delete trip?");

    if (!confirmed) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }
    try {
      const response = await fetch(`../../api/trip/deleteTrip.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripId: id }), // Send tripId som JSON
      });
  
      if (response.ok) {
        console.log("Trip slettet!");
        navigate(`/trip`); // Naviger tilbage til en oversigt over trips
      } else {
        console.error("Fejl ved sletning af trip");
      }
    } catch (error) {
      console.error("Fejl:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <BackArrow />
      <DeleteButton onClick={handleDelete}/>
      <h1>Edit trip:</h1>
      <img src={crewImage} alt="Beautiful Image" className="crewImage" />
      <form className="signupform">

        <label className="label">
          Start Location:
          <input
            type="text"
            name="startLocation"
            defaultValue={startLocation}
            onChange={handleChange}
            className="signupInput"
            required
          />
        </label>

        <label className="label">
          End Location:
          <input
            type="text"
            name="endLocation"
            defaultValue={endLocation}
            onChange={handleChange}
            className="signupInput"
            required
          />
        </label>

        <label className="label">
          Trip Description:
          <textarea
            name="tripDescription"
            defaultValue={tripDescription}
            onChange={handleChange}
            className="bioField"
          ></textarea>
        </label>

          <label className="label">
            Start Date:
            <input
              type="datetime-local"
              name="startDate"
              defaultValue={startDateFormatted}
              onChange={handleChange}
              className="signupInput"
            />
          </label>

          <label className="label">
            End Date:
            <input
              type="datetime-local"
              name="endDate"
              defaultValue={endDateFormatted}
              onChange={handleChange}
              className="signupInput"
            />
          </label>

          <label className="label">
            Price €:
            <input
              type="number"
              name="price"
              defaultValue={price}
              onChange={handleChange}
              className="smallInputField"
            />
          </label>

          <label className="label">
            Equipment:
            <input
              type="text"
              name="equipment"
              defaultValue={equipment}
              onChange={handleChange}
              className="signupInput"
            />
          </label>

          <label className="label">
            Rules:
            <input
              type="text"
              name="rules"
              defaultValue={rules}
              onChange={handleChange}
              className="signupInput"
            />
          </label>

        <div className="flexRow">
          <SaveButton onClick={handleSubmit} />
          <CancelButton />
        </div>
      </form>
    </div>
  );
};

export default UpdateTrip;

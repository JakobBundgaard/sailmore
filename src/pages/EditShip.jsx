import "../css/AddShip.css";
import crewImage from "../assets/images/boat2.jpg";
import SaveButton from "../components/SaveButton.jsx";
import CancelButton from "../components/CancelButton.jsx";
import BackArrow from "../components/BackArrow.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const EditShip = () => {
  const [formData, setFormData] = useState({
    shipName: "",
    shipModel: "",
    shipDescription: "",
    shipCrew: "",
    shipYear: "",
  });

  const { id } = useParams();
  const navigate = useNavigate(); // Flyttet useNavigate uden for handleSubmit

  useEffect(() => {
    fetch(`../api/ship/getShip.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data til backend:", { ...formData, shipId: id });
      const response = await fetch("../../api/ship/editShip.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, shipId: id }),
      });

      if (response.ok) {
        console.log("Opdateret skibsinformation!");
        navigate(`/captainProfile`);
      } else {
        console.error("Fejl ved opdatering af skib");
      }
    } catch (error) {
      console.error("Fejl:", error);
    }
  };

  function handleClick() {
    console.log("Clicked");
  }
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`../../api/ship/deleteShip.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shipId: id }), // Send shipId as JSON
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        console.log("Båd slettet!");
        navigate(`/captainProfile`); // Navigate back to an overview of boats
      } else {
        console.error("Fejl ved sletning af båd");
      }
    } catch (error) {
      console.error("Fejl:", error);
    }
  };


  return (
    <div className="page-wrapper">
      <BackArrow />
      <DeleteButton onClick={handleDelete} />
      <h1>Edit ship</h1>
      <img src={crewImage} alt="Beautiful Image" className="crewImage" />
      <form onSubmit={handleSubmit} className="signupform">

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
              value={formData.shipYear}
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

export default EditShip;

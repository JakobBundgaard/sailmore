import { useState } from 'react';
import "../css/crewSignup.css";
import crewImage from "../assets/images/Asian_sunset.jpg";
import SaveButton from "../components/SaveButton.jsx";
import CancelButton from "../components/CancelButton.jsx";

const AddTrip = () => {
   const [formData, setFormData] = useState({
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      tripDescription: '',
      price: '',
      equipment: '',
      rules: '',
    });
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }

  fetch('/api/trip/addTrip.php', {
      method: 'POST',
      body: data
  })
  .then(response => response.text())
  .then(data => {
      console.log(data); // Optional: Log the response data
      window.location.href = "/trip";
  })
  .catch(error => console.log(error));
    console.log(formData);
};
  
    return (
      <div className="page-wrapper">
        <h1>Add Trip</h1>
        <img src={crewImage} alt="Beautiful Image" className='crewImage' />
        <form onSubmit={handleSubmit} className='signupform'>
  
          {/* Input fields for user details */}

          <label className='label'>
            From:
            <input type="text" name="startLocation" value={formData.startLocation} onChange={handleChange} className='signupInput startLocation' required />
          </label>
  
          <label className='label'>
            To:
            <input type="text" name="endLocation" value={formData.endLocation} onChange={handleChange} className='signupInput endLocation'required />
          </label>
  
          <label className='label'>
            Start Date:
            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className='signupInput startDate' required />
          </label>
  
          <label className='label'>
            End Date:
            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} className='signupInput endDate' />
          </label>

          
          <label className='label'>
            Description:
            <textarea name="tripDescription" value={formData.tripDescription} onChange={handleChange} className='bioField tripDescription'></textarea>
          </label>

          <label className='label'>
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} className='signupInput price' required />
          </label>
          <label className='label'>
            Equipment:
            <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} className='signupInput equipment' required />
          </label>
          <label className='label'>
            Rules:
            <input type="text" name="rules" value={formData.rules} onChange={handleChange} className='signupInput rules' required />
          </label>
  
          <div className="flexRow">
                <SaveButton props={handleSubmit}/>
                <CancelButton />
          </div>
   
        </form>
      </div>
    );
  };
  
export default AddTrip;
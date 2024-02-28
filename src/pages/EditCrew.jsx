import { useState, useEffect } from 'react';
import "../css/crewSignup.css";
import crewImage from "../assets/images/Asian_sunset.jpg";
import BackArrow from "../components/BackArrow";
import SaveButton from "../components/SaveButton";
import CancelButton from "../components/CancelButton";
import DeleteButton from "../components/DeleteButton.jsx";

const EditCrew = () => {
  const [formData, setFormData] = useState({
    crewName: '',
    crewAge: '',
    crewPassword: '',
    crewPasswordRepeat: '',
    crewEmail: '',
    crewGender: '',
    crewNationality: '',
    crewExperience: '',
    crewDescription: '',
    crewSkill: [''],
  });

  const [genderOptions, setGenderOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  const [passwordData, setPasswordData] = useState({
    crewPassword: '',
    crewPasswordRepeat: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillResponse, nationalityResponse, genderResponse, crewInfoResponse] = await Promise.all([
          fetch('/api/crew/getSkillOptions.php'),
          fetch('/api/crew/getNationalityOptions.php'),
          fetch('/api/crew/getGenderOptions.php'),
          fetch('/api/crew/getLoggedInCrewInfo.php'),
        ]);
  
        if (skillResponse.ok) {
          const skillData = await skillResponse.json();
          setSkillOptions(skillData);
        } else {
          console.error('Error fetching skill options');
        }
  
        if (nationalityResponse.ok) {
          const nationalityData = await nationalityResponse.json();
          setNationalityOptions(nationalityData);
        } else {
          console.error('Error fetching nationality options');
        }
  
        if (genderResponse.ok) {
          const genderData = await genderResponse.json();
          setGenderOptions(genderData);
        } else {
          console.error('Error fetching gender options');
        }
  
        if (crewInfoResponse.ok) {
          const crewInfoData = await crewInfoResponse.json();
  
          // Update formData state with crew information
          setFormData((prevData) => ({
            ...prevData,
            crewName: crewInfoData.crewName || '',
            crewAge: crewInfoData.crewAge || '',
            crewEmail: crewInfoData.crewEmail || '',
            crewPassword: '',  // Since you might not want to populate the password field
            crewPasswordRepeat: '',  // Reset password repeat
            crewGender: crewInfoData.crewGender || '',
            crewNationality: crewInfoData.crewNationality || '',
            crewExperience: crewInfoData.crewExperience || '',
            crewDescription: crewInfoData.crewDescription || '',
            crewSkill: crewInfoData.crewSkill || [''],
          }));
        } else {
          console.error('Error fetching crew information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (nationalityOptions.length === 0 && genderOptions.length === 0 && skillOptions.length === 0) {
      fetchData();
    }
  }, [nationalityOptions, genderOptions, skillOptions]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'crewNationality') {
      setFormData({ ...formData, [name]: value });
    } else if (name === 'crewGender') {
      setFormData({ ...formData, [name]: value });
    } else if (name.startsWith('crewSkill')) {
      const index = parseInt(name.replace('crewSkill', ''), 10);
      const newSkills = [...formData.crewSkill];
      newSkills[index] = value;
      setFormData({ ...formData, crewSkill: newSkills });
    } else if (name === 'crewPasswordRepeat') {
      setFormData({ ...formData, crewPasswordRepeat: value });
    } else {
      setFormData({ ...formData, [name]: value, crewPasswordRepeat: formData.crewPasswordRepeat });
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.crewSkill];
    newSkills[index] = value;
    setFormData({ ...formData, crewSkill: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, crewSkill: [...formData.crewSkill, ''] });
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    // Add password validation
    if (passwordData.crewPassword !== passwordData.crewPasswordRepeat) {
      console.error('Passwords do not match.');
      return;
    }

    const crewId = sessionStorage.getItem('crewId');
    console.log('Crew ID:', crewId); // Check the crewId in the console
  
    try {
      console.log('Save button clicked!');
      const response = await fetch('/api/crew/updateCrewInfo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crewId: crewId,// Get the crewId from your authentication or wherever it's stored,
          crewName: formData.crewName,
          crewAge: formData.crewAge,
          crewEmail: formData.crewEmail,
          crewGender: formData.crewGender,
          crewNationality: formData.crewNationality,
          crewExperience: formData.crewExperience,
          crewDescription: formData.crewDescription,
          crewSkill: formData.crewSkill,
          crewPassword: passwordData.crewPassword,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log('Profile edited successfully!');
          // Redirect only if the signup was successful
          window.location.href = "/crewProfile";
        } else {
          console.error('Error editing profile:', responseData.error);
          // Handle the error (e.g., display an error message to the user)
        }
      } else {
        console.error('Error editing profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {

    // Display a confirmation dialog
  const confirmed = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");

  if (!confirmed) {
    // If the user clicks "Cancel" in the confirmation dialog, do nothing
    return;
  }

    const crewId = sessionStorage.getItem('crewId');

    try {
      const response = await fetch('/api/crew/deleteCrew.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crewId: crewId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log('Crew deleted successfully!');
          // Redirect or perform other actions if needed
          sessionStorage.clear();
          window.location.href = "/profile";
        } else {
          console.error('Error deleting crew:', responseData.error);
          // Handle the error (e.g., display an error message to the user)
        }
      } else {
        console.error('Error deleting crew');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    console.log('Cancel button clicked!');
  };

  return (
    <div className="page-wrapper">
      <div className="top-panel">
        <BackArrow />
        <DeleteButton onClick={handleDelete} />
      </div>
      <h2 className='signupTitle'>Edit Profile</h2>
      <img src={crewImage} alt="Beautiful Image" className='crewImage' />
      <form onSubmit={handleSave} className='signupform'>

        {/* Input fields for user details */}
        <label className='label'>
          Name:
          <input type="text" name="crewName" value={formData.crewName} onChange={handleChange} className='signupInput' required />
        </label>

        <label className='label'>
          Email:
          <input type="email" name="crewEmail" value={formData.crewEmail} onChange={handleChange} className='signupInput'required />
        </label>

        <label className='label'>
            Password:
            <input
              type="password"
              name="crewPassword"
              value={passwordData.crewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, crewPassword: e.target.value })}
              className='signupInput'
            />
        </label>
        
        <label className='label'>
            Password Repeat:
            <input
              type="password"
              name="crewPasswordRepeat"
              value={passwordData.crewPasswordRepeat}
              onChange={(e) => setPasswordData({ ...passwordData, crewPasswordRepeat: e.target.value })}
              className='signupInput'
            />
        </label>

        {/* <label className='label'>
          Password:
          <input type="password" name="crewPassword" value={formData.crewPassword} onChange={handleChange} className='signupInput' required />
        </label>

        <label className='label'>
          Password Repeat:
          <input type="password" name="crewPasswordRepeat" value={formData.crewPasswordRepeat} onChange={handleChange} className='signupInput' required />
        </label> */}

        <label className='label'>
          Nationality:
          <select name="crewNationality" value={formData.crewNationality} onChange={handleChange} className='genderSelect'>
            <option value="">Select Nationality</option>
            {nationalityOptions.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </label>

        <label className='label'>
          Experience:
          <input type="text" name="crewExperience" value={formData.crewExperience} onChange={handleChange} className='signupInput' />
        </label>

        {formData.crewSkill.map((skill, index) => (
        <div key={index} className='skillContainer'>
          <label className='label'>
            Skill {index + 1}:
            <div className="skillSelectContainer">
              <select
                name={`crewSkill${index}`}
                className='skillSelect'
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              >
                <option value="">Select Skill</option>
                {skillOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {/* "Plus" button */}
          {index === formData.crewSkill.length - 1 && (
            <button type="button" onClick={addSkill} className='skillButton'>
              +
            </button>
          )}
        </div>
      ))}
        
        <label className='label'>
          Bio:
          <textarea name="crewDescription" value={formData.crewDescription} onChange={handleChange} className='bioField'></textarea>
        </label>

        <div className="gender-age-container">

        <label className='label'>
          Gender:
          <select name="crewGender" value={formData.crewGender} onChange={handleChange} className='genderSelect'>
            <option value="">Select Gender</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>

          <label className='label'>
            Age:
            <input type="number" name="crewAge" value={formData.crewAge} onChange={handleChange} className='crewAge'/>
          </label>
        </div>

        <div className="flexRow">
              <SaveButton onClick={handleSave} />
              <CancelButton onClick={handleCancel}/>
        </div>
 
      </form>
    </div>
  );
};

export default EditCrew;
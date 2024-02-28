import "../css/captainSignup.css";
import { useState, useEffect } from "react";
import SaveButton from "../components/SaveButton";
import CancelButton from "../components/CancelButton";
import BackArrow from "../components/BackArrow";
import captainImage from "../assets/images/captain.jpg";
import DeleteButton from "../components/DeleteButton";

function EditSkipper() {
   const [captainData, setCaptainData] = useState({
      captainName: "",
      captainEmail: "",
      captainPassword: "",
      captainPasswordRepeat: "",
      captainNationality: "",
      captainDescription: "",
      captainGender: "",
      captainAge: "",
   });

   const [genderOptions, setGenderOptions] = useState([]);
   const [nationalityOptions, setNationalityOptions] = useState([]);

   const [passwordData, setPasswordData] = useState({
      captainPassword: "",
      captainPasswordRepeat: "",
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [genderResponse, nationalityResponse, captainResponse] = await Promise.all([
               fetch("/api/captain/getGenders.php"),
               fetch("/api/captain/getNationality.php"),
               fetch("/api/captain/getLoggedInCaptainInfo.php"),
            ]);

            if (genderResponse.ok) {
               const genderData = await genderResponse.json();
               setGenderOptions(genderData);
            } else {
               console.error("Error fetching gender options");
            }

            if (nationalityResponse.ok) {
               const nationalityData = await nationalityResponse.json();
               setNationalityOptions(nationalityData);
            } else {
               console.error("Error fetching nationality options");
            }

            if (captainResponse.ok) {
               const captainData = await captainResponse.json();

               //opdate form with captain data
               setCaptainData(prevdata => ({
                  ...prevdata,
                  captainId: captainData.captainId,
                  captainName: captainData.captainName,
                  captainEmail: captainData.captainEmail,
                  captainPassword: "",
                  captainPasswordRepeat: "",
                  captainGender: captainData.captainGender,
                  captainNationality: captainData.captainNationality,
                  captainDescription: captainData.captainDescription,
                  captainAge: captainData.captainAge,
               }));
            } else {
               console.error("Error fetching captain data");
            }
         } catch (error) {
            console.error(error);
         }
      };

      if (nationalityOptions.length === 0 && genderOptions.length === 0) {
         fetchData();
      }
   }, [genderOptions, nationalityOptions]);

   const handleInputChange = event => {
      const { name, value } = event.target;
      setCaptainData(prevState => ({ ...prevState, [name]: value }));
   };

   const handleSubmit = async event => {
      event.preventDefault();
      if (passwordData.captainPassword !== passwordData.captainPasswordRepeat) {
         alert("Passwords do not match");
         return;
      }

      fetch("../../api/captain/updateCaptain.php", {
         method: "POST",
         body: JSON.stringify({
            captainId: captainData.captainId,
            captainName: captainData.captainName,
            captainEmail: captainData.captainEmail,
            captainPassword: passwordData.captainPassword,
            captainNationality: captainData.captainNationality,
            captainDescription: captainData.captainDescription,
            captainGender: captainData.captainGender,
            captainAge: captainData.captainAge,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then(response => {
            if (!response.ok) {
               throw new Error("Error updating profile");
            }
            return response.json();
         })
         .then(data => {
            if (data.success) {
               console.log("Success: ", data.success);
               window.location.href = "/captainProfile";
            } else if (data.error) {
               console.log("Error: ", data.error);
            }
         })
         .catch(error => {
            console.error("Error: ", error);
         });
   };

   const handleDelete = async event => {
      event.preventDefault();
      if (window.confirm("Are you sure you want to delete your profile?")) {
         fetch("../../api/captain/captainDelete.php", {
            method: "POST",
            body: JSON.stringify({
               captainId: captainData.captainId,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then(response => {
               if (!response.ok) {
                  throw new Error("Error deleting profile");
               }
               return response.json();
            })
            .then(data => {
               if (data.success) {
                  console.log("Success: ", data.success);
                  sessionStorage.clear();
                  window.location.href = "/profile";
               } else if (data.error) {
                  console.log("Error: ", data.error);
               }
            })
            .catch(error => {
               console.error("Error: ", error);
            });
      }
   };

   return (
      <div className="capLoginPage page-wrapper">
         <BackArrow />
         <DeleteButton onClick={handleDelete} />
         <h1 className="h1Item">Edit Profile</h1>
         <img className="imgItem" src={captainImage} alt="Edit Captain" />
         <div className="flexGrid">
            <form>
               <label className="flexItem labelItem" htmlFor="name">
                  Name
               </label>
               <input
                  className="flexItem inputItem"
                  type="text"
                  name="captainName"
                  value={captainData?.captainName}
                  onChange={handleInputChange}
                  required
               />
               <label className="flexItem labelItem" htmlFor="email">
                  Email
               </label>
               <input
                  className="flexItem inputItem"
                  type="text"
                  name="captainEmail"
                  value={captainData?.captainEmail}
                  onChange={handleInputChange}
                  required
               />
               <label className="flexItem labelItem" htmlFor="password">
                  Password
               </label>
               <input
                  className="flexItem inputItem"
                  type="password"
                  name="captainPassword"
                  value={passwordData?.captainPassword}
                  onChange={e => setPasswordData({ ...passwordData, captainPassword: e.target.value })}
               />
               <label className="flexItem labelItem" htmlFor="passwordRepeat">
                  Repeat password
               </label>
               <input
                  className="flexItem inputItem"
                  type="password"
                  name="captainPasswordRepeat"
                  value={passwordData?.captainPasswordRepeat}
                  onChange={e => setPasswordData({ ...passwordData, captainPasswordRepeat: e.target.value })}
               />
               <label className="flexItem labelItem" htmlFor="nationality">
                  Nationality
               </label>
               <select
                  className="flexItem inputItem"
                  type="text"
                  name="captainNationality"
                  value={captainData?.captainNationality}
                  onChange={handleInputChange}
               >
                  <option value={""}>Select Nationality</option>
                  {nationalityOptions.map((option, index) => (
                     <option key={index} value={option.nationalityId}>
                        {option.nationality}
                     </option>
                  ))}
               </select>

               <label className="flexItem labelItem" htmlFor="bio">
                  Bio
               </label>
               <textarea
                  className="flexItem textareaItem"
                  type="text"
                  name="captainDescription"
                  value={captainData?.captainDescription}
                  onChange={handleInputChange}
               />
               <div className="flexRow">
                  <div className="flexCol">
                     <label className="flexItem slim labelItem" htmlFor="gender">
                        Gender
                     </label>
                     <select
                        className="flexItem inputItem"
                        id="gender"
                        name="captainGender"
                        value={captainData?.captainGender}
                        onChange={handleInputChange}
                     >
                        <option value={""}>Select Gender</option>
                        {genderOptions.map((option, index) => (
                           <option key={index} value={option.genderId}>
                              {option.genderName}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flexCol">
                     <label className="flexItem slim labelItem" htmlFor="age">
                        Age
                     </label>
                     <input
                        className="flexItem slim inputItem"
                        type="number"
                        name="captainAge"
                        value={captainData?.captainAge}
                        onChange={handleInputChange}
                     />
                  </div>
               </div>
               <div className="flexRow">
                  <SaveButton onClick={handleSubmit} />
                  <CancelButton />
               </div>
            </form>
         </div>
      </div>
   );
}

export default EditSkipper;

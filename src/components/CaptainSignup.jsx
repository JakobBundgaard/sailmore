import "../css/captainSignup.css";
import captainImage from "../assets/images/captain.jpg";
import { useState, useEffect } from "react";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import BackArrow from "./BackArrow";

function CaptainSignup() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [nationality, setNationality] = useState("");
   const [bio, setBio] = useState("");
   const [gender, setGender] = useState("");
   const [age, setAge] = useState("");
   const [passwordRepeat, setPasswordRepeat] = useState("");
   const [genderOptions, setGenderOptions] = useState([]);
   const [nationalityOptions, setNationalityOptions] = useState([]);

   const handleInputChange = event => {
      switch (event.target.name) {
         case "name":
            setName(event.target.value);
            break;
         case "email":
            setEmail(event.target.value);
            break;
         case "password":
            setPassword(event.target.value);
            break;
         case "passwordRepeat":
            setPasswordRepeat(event.target.value);
            break;
         case "nationality":
            setNationality(event.target.value);
            break;
         case "bio":
            setBio(event.target.value);
            break;
         case "gender":
            setGender(event.target.value);
            break;
         case "age":
            setAge(event.target.value);
            break;
         default:
            console.log("Invalid input");
            break;
      }
   };

   //Get all genders from the server
   useEffect(() => {
      // Fetch gender options from your API here
      fetch("/api/captain/getGenders.php")
         .then(response => {
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
         })
         .then(data => setGenderOptions(data))
         .catch(error => console.log("Fetch or parsing error: ", error));
   }, []);

   //Get all nationalities from the server
   useEffect(() => {
      fetch("/api/captain/getNationality.php")
         .then(response => {
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
         })
         .then(data => setNationalityOptions(data))
         .catch(error => console.log("Fetch or parsing error: ", error));
   }, []);

   //Submit handler here
   const handleSubmit = async event => {
      event.preventDefault();
      console.log("Form submitted");

      // Prepare the data
      const data = {
         name: name,
         email: email,
         password: password,
         passwordRepeat: passwordRepeat,
         nationality: nationality,
         bio: bio,
         gender: gender,
         age: age,
      };

      // Send the form data to your server here
      const response = await fetch("/api/captain/captainSignup.php", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      if (response.ok) {
         const jsonResponse = await response.json();
         if (jsonResponse["error"]) {
            console.log(jsonResponse["error"]);
         } else if (jsonResponse["success"]) {
            //Clear the form here
            setName("");
            setEmail("");
            setPassword("");
            setPasswordRepeat("");
            setNationality("");
            setBio("");
            setGender("");
            setAge("");

            console.log("Captain signed up successfully!");
            console.log(jsonResponse["success"]);

            //navigate to login page
            window.location.href = "/profile/CaptainLogin";
         }

         //Handle success, e.g., redirect or show a success message
      } else {
         //Handle errors, e.g., show an error message
         console.error("Error signing up");
      }
   };

   return (
      <div className="capLoginPage page-wrapper">
         <BackArrow />
         <h1 className="h1Item">Captain Signup</h1>
         <img className="imgItem" src={captainImage} alt="Captain Signup" />
         <div className="flexGrid">
            <form>
               <label className="flexItem labelItem" htmlFor="name">
                  Name
               </label>
               <input className="flexItem inputItem" type="text" name="name" value={name} onChange={handleInputChange} required />
               <label className="flexItem labelItem" htmlFor="email">
                  Email
               </label>
               <input className="flexItem inputItem" type="text" name="email" value={email} onChange={handleInputChange} required />
               <label className="flexItem labelItem" htmlFor="password">
                  Password
               </label>
               <input className="flexItem inputItem" type="password" name="password" value={password} onChange={handleInputChange} required />
               <label className="flexItem labelItem" htmlFor="passwordRepeat">
                  Repeat password
               </label>
               <input
                  className="flexItem inputItem"
                  type="password"
                  name="passwordRepeat"
                  value={passwordRepeat}
                  onChange={handleInputChange}
                  required
               />
               <label className="flexItem labelItem" htmlFor="nationality">
                  Nationality
               </label>
               <select className="flexItem inputItem" type="text" name="nationality" value={nationality} onChange={handleInputChange}>
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
               <textarea className="flexItem textareaItem" type="text" name="bio" value={bio} onChange={handleInputChange} />
               <div className="flexRow">
                  <div className="flexCol">
                     <label className="flexItem slim labelItem" htmlFor="gender">
                        Gender
                     </label>
                     <select className="flexItem inputItem" id="gender" name="gender" value={gender} onChange={handleInputChange}>
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
                     <input className="flexItem slim inputItem" type="number" name="age" value={age} onChange={handleInputChange} />
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

export default CaptainSignup;

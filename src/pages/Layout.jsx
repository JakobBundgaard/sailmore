import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import sailboat from "../assets/images/sailboat.svg";
import info from "../assets/images/info.svg";
import inbox from "../assets/images/speech-bubble.svg";
import profile from "../assets/images/profile.svg";
import PlusButton from "../components/PlusButton";

const Layout = () => {
  const [userType, setUserType] = useState((sessionStorage.getItem("captainId") != null) ? "guest" : "captain" );

  useEffect(() => {

    console.log("captainId in sessionStorage:", sessionStorage.getItem('captainId'));
    console.log("crewId in sessionStorage:", sessionStorage.getItem('crewId'));


    const fetchUserType = async () => {
      try {
        // Assuming you have an endpoint to check the user's type
        const response = await fetch("/api/utils/checkUserType.php");
        const data = await response.json();

        console.log("User Type Response:", data);

        // Set the userType state based on the user type
        setUserType(data.userType);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);
  console.log(userType)
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/trip"><img src={sailboat} alt="Sailboat Icon" /></NavLink>
          </li>
          <li>
            <NavLink to="/info"><img src={info} alt="Info Icon" /></NavLink>
          </li>
          
          {userType === 'captain' && <PlusButton />}
          <li>
            <NavLink to="/inbox"><img src={inbox} alt="Messages and Notifications Icon" /></NavLink>
          </li>
          <li>
            {userType !== 'guest' ? (
              <NavLink to={userType === 'captain' ? "/captainProfile" : "/crewProfile"}>
                <img src={profile} alt="Profile Icon" />
              </NavLink>
            ) : (
              <NavLink to="/profile">
                <img src={profile} alt="Profile Icon" />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;

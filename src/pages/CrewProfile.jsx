import { useState, useEffect } from 'react';
import pfp from '../assets/images/crew-pfp.jpg';
import '../css/SkipperProfile.css';
// import PreviewTrip from "../components/PreviewTrip";
import EditButton from '../components/EditButton';
import BackArrow from "../components/BackArrow";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

const CrewProfile = () => {
    const [loggedInCrewInfo, setLoggedInCrewInfo] = useState(null);

    useEffect(() => {
        // Fetch logged-in crew information
        const fetchLoggedInCrewInfo = async () => {
            try {
                const response = await fetch('/api/crew/getLoggedInCrewInfo.php');
                if (response.ok) {
                    const data = await response.json();
                    setLoggedInCrewInfo(data);
                }
            } catch (error) {
                console.error('Error fetching logged-in crew information:', error);
            }
        };

        fetchLoggedInCrewInfo();
    }, []);

    const handleLogout = async () => {
        try {
            // Send a request to the server to perform logout
            const response = await fetch('/api/crew/crewLogout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                sessionStorage.removeItem('captainId');
                sessionStorage.removeItem('crewId');
                window.location.reload();
            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    function handleClick() {
        console.log("Clicked");
      }

    return (
        <div>
            <div className="top-panel">
                <BackArrow />
            </div>
            <div className='profile-images'>
                <img src={pfp} alt="Profile Image" />
            </div>
            <div className="page-wrapper">
                <div className='profile-top'>
                    {loggedInCrewInfo && (
                        <div>
                            <div className='name-and-age'>
                                <h1>{loggedInCrewInfo.crewName}</h1>
                                <h3>{loggedInCrewInfo.crewAge}</h3>
                            </div>
                            <div className='profile-hashtags'>
                                <div className="text-bubble profile-hashtag">
                                    <p>{loggedInCrewInfo.crewGender}</p>
                                </div>
                                <div className="text-bubble profile-hashtag">
                                    <p>{loggedInCrewInfo.crewNationality}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='edit-profile'>
                    <Link to="/EditCrew">
                        {/* 'to' angiver den sti, du vil navigere til */}
                        <EditButton onClick={handleClick} />
                    </Link>
                    </div>
                </div>

                <hr />
                <h2>About Me</h2>
                {loggedInCrewInfo && <p>{loggedInCrewInfo.crewDescription}</p>}
                <hr />
                <h2>My Skills</h2>
                {/* Display crew skills as needed */}
                {loggedInCrewInfo && loggedInCrewInfo.crewSkill && (
                    <div className="text-bubble">
                        <p>{loggedInCrewInfo.crewSkill}</p>
                    </div>
                )}
                <hr />
                <h2>My Trips</h2>
                <details className='drop-down'>
                    <summary>
                        Booked Trips
                    </summary>
                    <br />
                    {/* <PreviewTrip /> */}
                </details>
                <hr />
                <details className='drop-down'>
                <summary>
                    Requested Trips
                </summary>
                <br />
                {/* <PreviewTrip/> */}
            </details>
            <hr />
            <details className='drop-down'>
                <summary>
                    Past Trips
                </summary>
                <br />
                {/* <PreviewTrip/> */}
            </details>
            <hr />
            <Link to="/">
                <LogoutButton onClick={handleLogout} />
            </Link>
            </div>
        </div>
    );
};

export default CrewProfile;

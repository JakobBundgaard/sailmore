import { useEffect, useState } from 'react';
import PreviewTrip from "../components/PreviewTrip";
import Banner from "../components/Banner";
import SearchBar from "../components/Searchbar";
import Logo from "../assets/images/sailmore-logo-arc.svg";
import "../css/Home.css";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // New state for search results

  useEffect(() => {
    fetch('/api/trip/readTrip.php')
      .then(response => response.json())
      .then(data => {
        setTrips(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to update search results based on criteria
  const updateSearchResults = (searchResults) => {
    setSearchResults(searchResults);
  };

  return (
    <div>
      <Banner />
      <div className='gradient-wrapper'></div>

      <div className='home-top'>
        <img src={Logo} alt="Sailmore Logo" className='logo' />
      </div>

      <div className="page-wrapper">
        <SearchBar updateSearchResults={updateSearchResults} />
        <h2 className='white-text'>Recommended trips</h2>
        <br />
        {/* Display either search results or all trips based on the condition */}
        <div className='previewtrip-container'>
          {(searchResults.length > 0 ? searchResults : trips).map((trip, index) => (
            <PreviewTrip key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
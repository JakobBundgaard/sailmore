import "./App.css";
import "./css/Navbar.css"
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Info from "./pages/Info";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import TripDetails from "./pages/TripDetails";
import SkipperProfile from "./pages/SkipperProfile";
import UserBridge from "./components/UserBridge";
import CrewLogin from "./components/CrewLogin";
import CaptainLogin from "./components/CaptainLogin";
import CrewSignup from "./components/CrewSignup";
import CaptainSignup from "./components/CaptainSignup";
import AddTrip from "./pages/AddTrip";
import BoatDetails from "./pages/BoatDetails";
import ScrollToTopOnRender from "./components/ScrollToTopOnRender";
import AddShip from "./pages/AddShip";
import EditShip from "./pages/EditShip";
import EditCrew from "./pages/EditCrew";
import UpdateTrip from "./pages/UpdateTrip";
import EditSkipper from "./pages/EditSkipper";

function App() {
   return (
      <>
         <BrowserRouter>
            <ScrollToTopOnRender />
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route path="" element={<Home />} />
                  <Route path="trip" element={<Home />} />
                  <Route path="info" element={<Info />} />
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="crewProfile" element={<Profile />} />
                  <Route path="captainProfile" element={<SkipperProfile />} />
                  <Route path="profile" element={<UserBridge />} />
                  <Route path="profile/CrewLogin" element={<CrewLogin />} />
                  <Route path="profile/CaptainLogin" element={<CaptainLogin />} />
                  <Route path="profile/CrewSignup" element={<CrewSignup />} />
                  <Route path="profile/CaptainSignup" element={<CaptainSignup />} />
                  <Route path="trip/:id" element={<TripDetails />} />
                  <Route path="skipper/:id" element={<SkipperProfile />} />
                  <Route path="addtrip" element={<AddTrip />} />
                  <Route path="addship" element={<AddShip />} />
                  <Route path="editship/:id" element={<EditShip />} />
                  <Route path="editcrew" element={<EditCrew />} />
                  <Route path="editskipper" element={<EditSkipper />} />
                  <Route path="update-trip/:id" element={<UpdateTrip />} />
                  <Route path="boat/:id" element={<BoatDetails />} />
                  <Route path="*" element={<NoPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;

import plus from "../assets/images/plus-icon.svg";
import { NavLink } from "react-router-dom";

let skipper = true;

const PlusButton = () => {
    if (skipper) {
        return (
            <>
                <li>
                    <NavLink to="/addtrip"><img src={plus} alt="Add trip" /></NavLink>
                </li>
            </>
        )
    }
};

export default PlusButton;
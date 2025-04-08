import { NavLink, useNavigate } from 'react-router-dom';
import CafeLogo from "../assets/Cafe-logo.png";
import AppLayout from "../pages/AppLayout.jsx";

function NavBar(){

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div className={'header'}>
            <div>
                <img src={CafeLogo} alt="Cafe logo" />
            </div>
            <div className="nav-links">
                <NavLink to="/pos">
                    <h1>Home</h1>
                </NavLink>
                <NavLink to="/orders">
                    <h1>Orders</h1>
                </NavLink>
                <NavLink to="/dashboard">
                    <h1>Dashboard</h1>
                </NavLink>
                <NavLink to="/calendar">
                    <h1>Calendar</h1>
                </NavLink>
                <button
                    onClick={handleLogout}
                >
                    <h1>Log out</h1>
                </button>
            </div>
        </div>
    );
}
export default NavBar;
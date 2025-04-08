import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

function AppLayout() {
    const location = useLocation();
    const hideHeaderOn = ['/login']; // add more paths if needed

    return (
        <>
            {!hideHeaderOn.includes(location.pathname) && <NavBar />}
            {/*
                If the current path is not on login or (in hideHeaderOn), show the NavBar
                Then, always show any child page that is currently active (e.g. POS, Orders, Dashboard)
            */}
            <Outlet /> {/* Anything inside the route nest will appear */}
        </>
    );
}

export default AppLayout;

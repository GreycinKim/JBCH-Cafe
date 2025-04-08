import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Pos from './pages/Pos';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard.jsx';
import Calendar from './pages/Calendar.jsx';
import AppLayout from "./pages/AppLayout.jsx";


function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/pos" element={<Pos />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
            </Route>
        </Routes>
    );
}

export default App;

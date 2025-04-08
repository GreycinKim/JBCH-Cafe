import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {/* add other routes later */}
        </Routes>
    );
}

export default App;

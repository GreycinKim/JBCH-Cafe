import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../services/authService';
import logo from '/JBCH_Logo.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    function handleUsername(e) {
        setUsername(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            const data = await loginUser(username, password);

            // Save Session
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            navigate('/pos');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            setError('Invalid username or password');
        }


        setUsername('');
        setPassword('');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white px-16 py-12 rounded-2xl shadow-2xl flex flex-col items-center gap-8 w-full max-w-2xl"
            >
                <h1 className="text-4xl font-extrabold text-gray-800">JBCH Cafe</h1>
                <img className="w-40 h-auto" src={logo} alt="logo" />
                {error && <div className="flex flex-col items-center gap-6">
                    <h1 className={`text-red-600`}>{error}</h1>
                </div>}
                <input
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Password"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onSubmit={handleSubmit}
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;

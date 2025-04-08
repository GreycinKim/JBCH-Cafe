import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Used to programmatically redirect users after login

import { loginUser } from '../services/authService';// backend login service
import logo from '/JBCH_Logo.png';

function Login() {
    // State hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // redirecting after successful login
    const navigate = useNavigate();

    // Directions to the password input
    const passwordRef = useRef(null);


    function handleUsername(e) {
        setUsername(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    // When user submits the form
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent page reload on form submit

        try{
            const data = await loginUser(username, password); // Attempt to log in with the provided username and password

            // If successful save token and user role to local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Then redirect to POS page
            navigate('/pos');
        } catch (error) {
            // IF login fails then LOG and setError to display and prompt user to retry again
            console.error('Login failed:', error.response?.data?.message || error.message);
            setError('Invalid username or password. Try again');
        }
        // Clear fields so user can type again
        setUsername('');
        setPassword('');
    }

    // If user presses Enter while in the username field, move focus to password input
    function handleUsernameKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submit
            passwordRef.current?.focus(); // Where is the reference currently? I want to focus there
        }
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
                    autoFocus={true} // So user can type write away
                    value={username}
                    onChange={handleUsername}
                    onKeyDown={handleUsernameKeyDown} // For if user presses enter while in username field
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Username"
                />
                <input
                    type="password"
                    ref={passwordRef} // Set the reference flag here so useRef knows the location where to focus
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

import { useState } from 'react';
import logo from '/JBCH_Logo.png';

function Login() {
    const [input, setInput] = useState('');

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // You can add additional logic here (like sending input to backend)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">Log In</h1>
                <img className="w-32 h-auto" src={logo} alt="logo" />
                <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    className="border px-4 py-2 rounded shadow"
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={input}
                    onChange={handleInput}
                    className="border px-4 py-2 rounded shadow"
                    placeholder="Password"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;

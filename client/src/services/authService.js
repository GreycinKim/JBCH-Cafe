import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const API_BASE_URL = `${VITE_API_URL}`;

// A function that sends login data to the backend
export async function loginUser(username, password) {
    const response = await axios.post(`${API_BASE_URL}/login`, { // This sends an HTTP post request to server endpoint
        username,
        password,
    });

    return response.data;
}


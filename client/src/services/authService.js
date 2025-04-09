import axios from "axios";

const API_BASE_URL = 'http://192.168.86.97:5000'; // REPLACE LATER (Flask Backend URL

// A function that sends login data to the backend
export async function loginUser(username, password) {
    const response = await axios.post(`${API_BASE_URL}/login`, { // This sends an HTTP post request to server endpoint
        username,
        password,
    });

    return response.data;
}


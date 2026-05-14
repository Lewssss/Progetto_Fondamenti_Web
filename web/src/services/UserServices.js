import axios from "axios";
import api from "../Config/axiosConfig";

const API_URL = "http://localhost:5000/user/";

export const register = async (username, email, password) => {
    const userData = { username, email, password };
    // Effettua una richiesta POST al backend per registrare l'utente
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
};

export const login = async (email, password) => {
    const userData = { email, password };
    // Effettua una richiesta POST al backend per autenticare l'utente
    const response = await axios.post(API_URL + "login", userData);

    // Se la risposta contiene un token, salviamo il token e le informazioni dell'utente nel localStorage
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

export const getUser = async () => {
    //Effettua una richiesta GET al backend con header che contiene il token da cui ricaviamo i dati dell'utente
    const response = await api.get("/me");
    return response.data;
};
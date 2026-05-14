import { createContext, useState, useEffect } from "react";
import { getUser } from "../services/UserServices";

export const userContext = createContext({});

export function UserContextProvider ({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        //Cerchiamo se già esiste un token salvato 
        const token = localStorage.getItem("token");
        if (token) {
            //Prendiamo i dati dell'utente
            getUser()
            .then(data => {
                setUser(data);
                setReady(true);
            })
            //Se fallisce rimuoviamo il token 
            .catch(() => {
                localStorage.removeItem("token");
                setReady(true);
            });
        } else {
            setReady(true);
        }
    }, []);

    return (
        <userContext.Provider value={{ user, setUser, ready }}>
            {children}
        </userContext.Provider>
    );
}

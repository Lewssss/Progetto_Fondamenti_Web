import express from "express";
const router = express.Router();
import UserServices from "../Services/UserServices.js";
import User from "../models/Users.js";
import { authenticateToken, refreshToken, deleteToken } from "../Middleware/authMiddleware.js";
router.get("/userData/:id",getUserData);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", deleteToken);
router.get("/checkandget", authenticateToken, getUser);

export default router;

async function getUserData(req,res){
    const user = await User.findById(req.params.id)
    console.log(user);
    return res.json({username: user.username, profilePicture: user.profilePicture}); //inutile passare dal service e dalla response prestabilita, e' solo una get al volo
}


async function createUser(req, res) {
    try {
        //Recuperiamo i dati dal body della richiesta
        const { username, email, password } = req.body;  

        //Chiamiamo il servizio di registrazione
        const [status, response] = await UserServices.registerUser(username, email, password);

        //Restituiamo la risposta al client
        res.status(status).json(response); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function loginUser(req, res) {
    try {
        //Recuperiamo i dati dal body della richiesta
        const { email, password } = req.body;

        //Chiamiamo il servizio di login
        const [status, response] = await UserServices.loginUser(email, password);

        //Restituiamo la risposta al client
        res.status(status).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}
import express from "express";
const router = express.Router();
import UserServices from "../Services/UserServices.js";
import Post from "../Services/PostService.js";
import User from "../models/Users.js";
import UserService from "../Services/UserServices.js";
import multer from 'multer';
import { authenticateToken, refreshToken, deleteToken } from "../Middleware/authMiddleware.js";
const filestorage = multer.diskStorage({destination:"uploads/", filename: (req,file,cb)=> {cb(null,req.body.username +"_"+ file.originalname)}})
const upload = multer({storage: filestorage});
router.get("/userData/:id",getUserData);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", deleteToken);
router.get("/checkandget", authenticateToken, getUser);
router.put("/updateUserImage", authenticateToken, upload.single("img"), updateUserImage);

export default router;

async function getUserData(req,res){
    const user = await User.findById(req.params.id)
    return res.json({id:user._id, username: user.username, profilePicture: user.profilePicture}); //inutile passare dal service e dalla response prestabilita, e' solo una get al volo
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
async function updateUserImage(req,res) {
    const userId = req.user.userId;
    const ImgUrl = '/uploads/'+req.file.filename;
    UserService.updateUserImage(userId,ImgUrl)
    .then(
        (response) => {
            return res.status(response[0]).json(response[1]);
        }
    );
}
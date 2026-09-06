import User from "../models/Users.js";
import response, { responseWithData } from "../util/response/user.response.js";
import bcrypt from "bcrypt";    // Importa bcrypt per l'hashing delle password
import jwt from "jsonwebtoken";  // Importa jsonwebtoken per la generazione dei token
export default {
    registerUser,
    loginUser,
    updateUserImage,
    updateFollow,
    searchUsers
}
async function registerUser(username, email, password) {
    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return [400, response.userAlreadyExists()];
    }
    // Se l'utente non esiste, procedi con la registrazione
    // Hash della password prima di salvarla nel database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,  // Salva la password hashata
    });
    await newUser.save();
    return [201, response.userRegistered()];
}
async function loginUser(email, password) {
    // Verifica se l'utente esiste
    const user = await User.findOne({ email: email });
    if (!user) {
        return [400, response.invalidCredentials()];
    }
    // Verifica se la password è corretta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return [400, response.invalidCredentials()];
    }
    // Se le credenziali sono valide, genera un token JWT
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '30min' }); // Token di accesso con scadenza breve
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' }); // Token di refresh con scadenza più lunga    
    user.refreshToken = refreshToken; // Salva il token di refresh nel database
    await user.save();
    
    return [200, { 
        success: true, 
        token: accessToken,
        refreshToken: refreshToken,
        user: { 
            _id: user._id, 
            username: user.username, 
            email: user.email 
            } 
        }];
}
async function updateUserImage(userId,ImgUrl) {
    const updateUser = await User.findByIdAndUpdate(userId,{profilePicture:ImgUrl},{new:true});
    return [200,response.responseWithDataAndMessage(updateUser,"Immagine profilo aggiornata!")];
}
async function updateFollow(myId, targetId){
    if(myId === targetId) {
        return [400, { message: 'Non puoi seguire te stesso' }];
    }
    const targetUser = await User.findById(targetId)
    if(!targetUser) {
        return [404, { message: 'Nessun utente trovato' }];
    }
    const alreadyFollowing = targetUser.followers.some((followersId) => followersId.toString() === myId);  //controlla elemento per elemento se myId si trova nell'array
    if(alreadyFollowing) {
        await User.findByIdAndUpdate(targetId, {$pull: {followers: myId}});
        await User.findByIdAndUpdate(myId, {$pull: {following: targetId}});
    } else {
        await User.findByIdAndUpdate(targetId, {$addToSet: {followers: myId}});     //addtoset invece di push perché controlla che non ci siano duplicati
        await User.findByIdAndUpdate(myId, {$addToSet: {following: targetId}});
    }
    const newTargetUser = await User.findById(targetId).select("-password");
    return [200, responseWithData(newTargetUser)];
}
async function searchUsers(query) {
    //facciamo un controllo qui, perche' se mette cose come . ? o * manda in crash tutto (lo usiamo direttamente in query)
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const users = await User.find({
        username: { $regex: safe, $options: "i" }
    }).select("-password -refreshToken").limit(20);
    return [200, responseWithData(users)];
}

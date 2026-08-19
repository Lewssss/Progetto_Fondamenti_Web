import express from "express";
const router = express.Router();
import ChatsServices from "../Services/ChatsServices.js";

router.post("/newChat", newChat);
router.get("/getChats/:id", getChats);
router.delete("/deleteChat", deleteChat);
router.post("/clearChat", clearChat);

function newChat(req, res) {
  const { userId, friendId } = req.body; // Qui vogliamo l'id dell'utente registrato e dell'amoco di modo da creare la chat
  ChatsServices.newChat(userId, friendId).then((response) => {
    return res.status(response[0]).json(response[1]);
  });
}

function getChats(req, res, next) {
  const { id } = req.params; // Usiamo req.params per ottenere l'ID dalla route
  ChatsServices.getChats(id)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
  console.log("Body della richiesta", req.body);
}

function deleteChat(req, res) {
  ChatsServices.deleteChat(req.body.id).then((response) => {
    //const { chatid } = req.body;
    //ChatsServices.deleteChat(chatid).then((response) => {
    //Idem di getChats
    return res.status(response[0]).json(response[1]);
  });
}

function clearChat(req, res) {
  ChatsServices.clearChat(req.body.id).then((response) => {
    return res.status(response[0]).json(response[1]);
  });
}

export default router;

import express from "express";
const router = express.Router();
import MessageServices from "../Services/MessageServices.js";

router.post("/newMessage", newMessage);
router.get("/getMessages", getMessages);
router.delete("/deleteMessage", deleteMessage);

function newMessage(req, res, next) {
  const { chatId, userId, message } = req.body; // Qui vogliamo l'id dell'utente registrato e dell'amoco di modo da creare la chat
  MessageServices.newMessage(chatId, userId, message)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function getMessages(req, res, next) {
  MessageServices.getMessages(req.body.id)
    .then((response) => {
      //Capire se necesarrio anche l'id dell'utente visto che sono gia "dentro"
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function deleteMessage(req, res) {
  const { message_id } = req.body;
  MessageServices.deleteMessage(message_id).then((response) => {
    //Idem di getChats
    return res.status(response[0]).json(response[1]);
  });
}

export default router;

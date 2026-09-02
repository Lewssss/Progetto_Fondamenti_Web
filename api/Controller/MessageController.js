import express from "express";
const router = express.Router();
import MessageServices from "../Services/MessageServices.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

router.post("/newMessage", authenticateToken, newMessage);
router.get("/getMessages", authenticateToken, getMessages);
router.delete("/deleteMessage", authenticateToken, deleteMessage);
router.patch("/readMessages", authenticateToken, MessagesAsRead); //Usiamo patch perchè quest'ultimo è usato quando vogliamo aggiornare una risorsa esistente, in questo caso i messaggi, per segnalarli come letti.

function newMessage(req, res, next) {
  const { chatId, message } = req.body; // Qui vogliamo l'id dell'utente registrato e dell'amoco di modo da creare la chat
  const userId = req.user.userId; // Ottieni l'ID dell'utente autenticato dal token
  MessageServices.newMessage(chatId, userId, message)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function getMessages(req, res, next) {
  const { chatId } = req.query;
  const userId = req.user.userId; // Ottieni l'ID dell'utente autenticato dal token
  MessageServices.getMessages(chatId, userId)

    //MessageServices.getMessages(req.user.userId)
    .then((response) => {
      //Capire se necesarrio anche l'id dell'utente visto che sono gia "dentro"
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function MessagesAsRead(req, res, next) {
  const { chatId } = req.body;
  const userId = req.user.userId;

  MessageServices.MessagesAsRead(chatId, userId)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function deleteMessage(req, res, next) {
  const { message_id, who } = req.body;
  const userId = req.user.userId;

  MessageServices.deleteMessage(message_id, userId, who)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

export default router;

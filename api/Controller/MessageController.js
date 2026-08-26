import express from "express";
const router = express.Router();
import MessageServices from "../Services/MessageServices.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

router.post("/newMessage", authenticateToken, newMessage);
router.get("/getMessages", authenticateToken, getMessages);
router.delete("/deleteMessage", authenticateToken, deleteMessage);

function newMessage(req, res, next) {
  const { chatId, userId, message } = req.body; // Qui vogliamo l'id dell'utente registrato e dell'amoco di modo da creare la chat
  MessageServices.newMessage(chatId, userId, message)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

function getMessages(req, res, next) {
  const { chatId } = req.query;
  MessageServices.getMessages(chatId)

    //MessageServices.getMessages(req.user.userId)
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

const loadMessages = async () => {
  try {
    const { data } = await api.post("/messages/getMessages", {
      id: "ID_CHAT",
    });

    const mappedMessages = data.map((msg) => ({
      fromMe: msg.sender === "USER_ID_LOGGATO",
      text: msg.text,
    }));

    setMessages(mappedMessages);
  } catch (error) {
    console.error("Errore nel caricamento messaggi:", error);
  }
};

export default router;

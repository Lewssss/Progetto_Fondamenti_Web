import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import ChatsController from "./Controller/ChatsController.js";
import MessageController from "./Controller/MessageController.js";
import UserController from "./Controller/UserController.js";
import PostController from "./Controller/PostController.js";
import StoriesController from "./Controller/StoriesController.js";
import cors from "cors";
import { createServer } from "node:http"; // Importa la funzione createServer dal modulo "node:http"
import { Server } from "socket.io"; // Importa la classe Server dal modulo "socket.io"
import jwt from "jsonwebtoken"; // Importa il modulo "jsonwebtoken" per la gestione dei token JWT
import Chat from "./models/Chat.js";
import MessageServices from "./Services/MessageServices.js";

const app = express();
const port = 5000;

connectDB();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/chats", ChatsController);
app.use("/messages", MessageController);
app.use("/user", UserController);
app.use("/post", PostController);
app.use("/stories", StoriesController);

const httpServer = createServer(app); // Crea un server HTTP utilizzando la funzione createServer

const io = new Server(httpServer, {
  // Crea un'istanza del server Socket.IO utilizzando il server HTTP creato
  cors: {
    //Cors vuol dire Cross-Origin Resource Sharing, che permette di specificare quali domini possono accedere alle risorse del server (opzioni che ho)
    origin: "http://localhost:3000", // Consente le richieste CORS solo dal dominio specificato
    methods: ["GET", "POST"], // Consente solo i metodi GET e POST per le richieste CORS
  },
});

io.use((socket, next) => {
  // Middleware per l'autenticazione dei socket
  const token = socket.handshake.auth.token; // Estrae il token JWT dall'oggetto di handshake del socket
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    // Verifica il token JWT utilizzando la chiave segreta specificata
    if (err) return next(new Error("Token non valido")); // Se il token non è valido, passa un errore al middleware successivo
    socket.userId = user.userId; // Se il token è valido, assegna l'ID dell'utente al socket
    next(); // Passa al middleware successivo
  });
});

io.on("connection", (socket) => {
  socket.on("join_chat", async (chatId, callback) => {
    const chat = await Chat.findOne({
      _id: chatId,
      participants: socket.userId,
    });

    if (!chat) {
      return callback?.({ success: false, message: "Accesso negato" }); // Se l'utente non è un partecipante della chat, invia un messaggio di errore al client
    }
    socket.join(`chat:${chatId}`); // Se l'utente è un partecipante della chat, lo aggiunge alla stanza della chat
  });

  socket.on("send_message", async ({ chatId, text }, callback) => {
    try {
      const chat = await Chat.findOne({
        _id: chatId,
        participants: socket.userId,
      });

      if (!chat) {
        return callback?.({
          success: false,
          message: "Accesso negato",
        });
      }

      const [status, result] = await MessageServices.newMessage(
        chatId,
        socket.userId,
        text,
      );

      if (status !== 200) {
        return callback?.({
          success: false,
          message: "Errore durante l'invio",
        });
      }

      io.to(`chat:${chatId}`).emit("message:new", result.data);

      callback?.({
        success: true,
        message: result.data,
      });
    } catch (error) {
      console.error(error);

      callback?.({
        success: false,
        message: "Errore del server",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Utente disconnesso: ${socket.userId}`);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

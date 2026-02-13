import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import ChatsController from "./Controller/ChatsController.js";
import MessageController from "./Controller/MessageController.js";

const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.use("/chats", ChatsController);
app.use("/messages", MessageController);

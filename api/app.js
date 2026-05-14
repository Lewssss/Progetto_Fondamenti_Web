import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import ChatsController from "./Controller/ChatsController.js";
import MessageController from "./Controller/MessageController.js";
import UserController from "./Controller/UserController.js";
import PostController from "./Controller/PostController.js";
import cors from "cors";

const app = express();
const port = 5000;
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());


app.use("/chats", ChatsController);
app.use("/messages", MessageController);
app.use("/user", UserController);
app.use("/post", PostController);

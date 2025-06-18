import mongoose from "mongoose";
 
export default function connectDB() {
  const url = "mongodb+srv://francescocarriero94:WjPHaJwQF70DaUtp@progetto.f5rhe1m.mongodb.net/?retryWrites=true&w=majority&appName=Progetto";
 
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
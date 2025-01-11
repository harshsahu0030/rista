import app from "./app.js";
import connectDb from "./config/db.js";
import { chats } from "./data/data.js";

app.get("/api/chat", (req, res) => {
  try {
    res.send(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).send("Failed to fetch chats");
  }
});

//db connect
connectDb()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

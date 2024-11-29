import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
dotenv.config();
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("socketio", io);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});


app.use("/api/auth", auth);


app.get("/api/profile", (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

app.listen(process.env.PORT, () =>
  console.log(` Server running on port ${process.env.PORT}`)
);

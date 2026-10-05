const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notesRouter = require("./routes/notes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
    res.json({
        message: "McRae Mission Notes API is running!"
    });
});

mongoose
    .connect("mongodb://127.0.0.1:27017/exp06-mcrae_mission_notes")
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
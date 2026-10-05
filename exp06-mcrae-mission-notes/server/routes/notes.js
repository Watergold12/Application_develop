const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET one note
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE note
router.post("/", async (req, res) => {
    try {
        const { title, content, category, pinned } = req.body;

        const note = await Note.create({
            title,
            content,
            category,
            pinned
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE note
router.put("/:id", async (req, res) => {
    try {
        const { title, content, category, pinned } = req.body;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                category,
                pinned
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE note
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
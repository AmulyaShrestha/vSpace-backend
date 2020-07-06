const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

router.post('/notes', async (req, res) => {
    // Add new note
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).send(note)
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.patch('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedNote) => {
            if (error) throw new Error(error);
            res.status(200).send(updatedNote);
        });
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id, req.body);
        res.status(200).send({ message: "Deleted!" });
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.get('/notes/:id', async (req, res) => {
    try {
        const notes = await Note.findOne({ _id: req.params.id });
        if (!notes) throw new Error();
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).send({ error: 'No notes available at the moment!' })
    }
});

/**
 * Filter notes routes section --
 * **/
router.post('/notes/filter', async (req, res) => {
    try {
        const notes = await Note.find(req.body);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).send({ error: 'No notes available at the moment!' })
    }
});

module.exports = router;

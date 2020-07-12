const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

router.post('/todo', async (req, res) => {

    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send(todo)
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.patch('/todo/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedTodo) => {
            if (error) throw new Error(error);
            res.status(200).send(updatedTodo);
        });
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.delete('/todo/:id', async (req, res) => {
    try {
        await Todo.findByIdAndRemove(req.params.id, req.body);
        res.status(200).send({ message: "Deleted!" });
    } catch (error) {
        res.status(400).send({ error: error })
    }
});

router.get('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });
        if (!todo) throw new Error();
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).send({ error: 'No Todo available at the moment!' })
    }
});

router.post('/todo/filter', async (req, res) => {
    try {
        const todo = await Todo.find(req.body);
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).send({ error: 'No todo available at the moment!' })
    }
});

module.exports = router;

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    _reference: {
        type: String
    },
},
    { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
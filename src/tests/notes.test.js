// use the path of your model
const Note = require('../models/Note');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/test-database';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Note Schema save testing', () => {
    /**
     * Insert Testing --
     * **/
    it('Note addition testing', () => {
        const notes = {
            title: 'test Title',
            content: 'test Content Content Content'
        };

        return Note.create(notes)
            .then((pro_ret) => {
                expect(pro_ret.title).toEqual('test Title');
            });
    });

    /**
     * Update Testing --
     * **/
    it('Update sticky notes testing', async () => {

        const updatedTitle = 'mock updated title';
        const updatedContent = 'mock updated content content';

        const stickyNote = {
            title: 'test Title',
            content: 'test Content Content Content content end'
        };
        const existingStickyNote = new Note(stickyNote);
        await existingStickyNote.save()

        await Note.findOneAndUpdate({ _id: existingStickyNote._id },
            { $set: { title: updatedTitle } },
            { new: true },
            (error, doc) => {
                return expect(doc.title).toEqual(updatedTitle)
            })
    });

    /**
     * Bulk delete widgets Testing --
     * **/
    it('Delete notes testing', async () => {
        const status = await Note.deleteMany();
        expect(status.ok).toBe(1);
    });
});

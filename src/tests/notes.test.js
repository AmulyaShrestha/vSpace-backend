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
     * Delete entire document within a collection Testing --
     * **/
    it('Delete notes testing', async () => {
        const status = await Note.deleteMany();
        expect(status.ok).toBe(1);
    });

    /**
     * Update Testing --
     * **/
    /* it('Update notes testing', async () => {

        const existingNoteId = '5e392e2f86c7f747c099ec3b';
        await Note.findOneAndUpdate({ _id: existingNoteId },
            { $set: { title: 'title' } },
            { new: true },
            (error, doc) => {
                return expect(doc.title).toEqual('title')
            })
    }); */


});

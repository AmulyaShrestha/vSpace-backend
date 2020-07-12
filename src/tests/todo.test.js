// use the path of your model
const Todo = require('../models/Todo');
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

describe('Todo Schema save testing', () => {
    /**
     * Insert Testing --
     * **/
    it('Todo addition testing', () => {
        const todo = {
            title: 'test Title',
            content: 'test Content Content Content'
        };

        return Todo.create(todo)
            .then((pro_ret) => {
                expect(pro_ret.title).toEqual('test Title');
            });
    });


    /**
     * Mark as completed or incomplete To-Dos --
     * **/
    it('Mark as completed or incomplete To-Dos', async () => {

        const mockDoneStatus = false;

        const newToDo = {
            title: 'test Title',
            doneStatus: mockDoneStatus,
            content: 'test Content Content Content'
        };
        const existingToDo = new Todo(newToDo);
        await existingToDo.save()

        /**
         * @example Checked or done status should be opposite to mock done status
         * -- (mockDoneStatus === !mockDoneStatus) --
         * **/
        await Todo.findOneAndUpdate({_id: existingToDo._id},
            {$set: {doneStatus: !mockDoneStatus}},
            {new: true},
            (error, doc) => {
                return expect(doc.doneStatus).toEqual(!mockDoneStatus)
            })
    });


    /**
     * Update To-Dos Title testing--
     * **/
    it('Update To-Dos Title testing', async () => {

        const updatedTitle = 'mock updated title'

        const newToDo = {
            title: 'test Title',
            doneStatus: false,
            content: 'test Content Content Content'
        };
        const existingToDo = new Todo(newToDo);
        await existingToDo.save()

        await Todo.findOneAndUpdate({_id: existingToDo._id},
            {$set: {title: updatedTitle}},
            {new: true},
            (error, doc) => {
                return expect(doc.title).toEqual(updatedTitle)
            })
    });


    /**
     * Delete entire document within a collection Testing --
     * **/
    it('Delete todo testing', async () => {
        const status = await Todo.deleteMany();
        expect(status.ok).toBe(1);
    });

});

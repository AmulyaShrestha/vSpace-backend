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
     * Delete entire document within a collection Testing --
     * **/
    it('Delete todo testing', async () => {
        const status = await Todo.deleteMany();
        expect(status.ok).toBe(1);
    });

});

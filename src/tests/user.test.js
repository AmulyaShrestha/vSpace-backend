// use the path of your model
const User = require('../models/User');
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

describe('User Schema save testing', () => {
    /**
     * Insert Testing --
     * **/
    it('User addition testing', () => {
        const user = {
            fullName: 'test Name',
            username: 'testName',
            age: '20',
            email: 'test@test.com',
            password: 'test123'
        };

        return User.create(user)
            .then((pro_ret) => {
                expect(pro_ret.username).toEqual('testName');
            });
    });

    /**
     * Delete entire document within a collection Testing --
     * **/
    it('Delete entire user documents', async () => {
        const status = await User.deleteMany();
        expect(status.ok).toBe(1);
    });

    /**
 * Login testing --
 * **/
    /* it('Login user!', async () => {
        const user = {
            fullName: 'test Name',
            username: 'testName',
            age: '20',
            email: 'test@test.com',
            password: 'test123'
        };
        await user.save()
        const token = await user.generateAuthToken()
        const testUser = await User.findByCredentials(user.email, user.password)
        expect(testUser.email).toEqual(user.email);
    }); */
});

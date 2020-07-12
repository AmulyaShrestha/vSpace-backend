// use the path of your model
const User = require('../models/User');
const mongoose = require('mongoose');
const NumberUtility = require('../utils/NumberUtility');
const bcrypt = require('bcryptjs')
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
     * Login testing --
     * **/
    it('Login user!', async () => {
        const user = {
            fullName: 'test Name',
            username: 'test2Name',
            age: '20',
            email: 'test2@test.com',
            password: 'test123'
        };
        const existingUser = new User(user);
        await existingUser.save()
        const testUser = await User.findByCredentials(user.email, user.password)
        expect(testUser.email).toEqual(user.email);
    });


    /**
     * Forgot password --
     * **/
    it('Reset user password', async () => {
        const token = NumberUtility.generateRandom(1000, 9999);
        const user = {
            fullName: 'test Name',
            username: 'testName3',
            age: '20',
            email: 'test3@test.com',
            password: 'test123',
            passResetToken: token
        };
        const existingUser = new User(user);
        await existingUser.save();

        // Choose new password and hash --
        const newPassword = await bcrypt.hash('updated-Password-123', 8);
        // Checking token validity ---
        if (existingUser.passResetToken !== token) {
            return;
        }
        // Reset password with new one --
        await User.findOneAndUpdate({_id: existingUser._id},
            {$set: {password: newPassword}},
            {new: true},
            (error, doc) => {
                return expect(doc.username).toEqual('updatedUsername')
            })
    });


    /**
     * Update Testing --
     * **/
    it('Update user testing', async () => {

        const user = {
            fullName: 'test Name',
            username: 'testName1',
            age: '20',
            email: 'test1@test.com',
            password: 'test123'
        };
        const existingUser = new User(user);
        await existingUser.save()
        await User.findOneAndUpdate({_id: existingUser._id},
            {$set: {username: 'updatedUsername'}},
            {new: true},
            (error, doc) => {
                return expect(doc.username).toEqual('updatedUsername')
            })
    });

    /**
     * Delete entire document within a collection Testing --
     * **/
    it('Delete entire user documents', async () => {
        const status = await User.deleteMany();
        expect(status.ok).toBe(1);
    });
});

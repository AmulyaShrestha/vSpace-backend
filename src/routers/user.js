const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const NumberUtility = require('../utils/NumberUtility');
const mailSender = require('../utils/mail-sender-utility');

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/users/update', auth, async (req, res) => {
    try {
        const user = new User(req.body);
        await User.findByIdAndUpdate(req.body._id, user);
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})

router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})

router.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.get(`/users/reset-password/:email`, async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ error: "User not found!" });
        }
        const token = NumberUtility.generateRandom(1000, 9999);
        user.passResetToken = token;
        await user.save();
        // send mail with reset token.
        mailSender.sendEmail(
            email,
            "Reset Password",
            token
        );
        res.send();
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

router.post(`/users/reset-password`, async (req, res) => {
    try {
        const email = req.body.email;
        const token = req.body.passResetToken;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (user.passResetToken !== token) {
            return res.status(401).send({ error: "Token did not match" });
        }

        user.passResetToken = null;
        user.password = password;
        await user.save();
        res.send({ message: 'successfully updated password!' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router

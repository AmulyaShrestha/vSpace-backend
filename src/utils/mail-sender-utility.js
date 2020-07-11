const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

module.exports = {
    sendEmail: (toUser, subject, token) => {
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'ancedre1@gmail.com',
                pass: 'mynameisancedre'
            }
        });

        transporter.use('compile', hbs({
            viewEngine: 'express-handlebars',
            viewPath: './'
        }));

        let mailOptions = {
            to: toUser,
            subject: subject,
            template: 'main',
            context: {
                token: token
            }
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error(error);
            }
            console.log(`Message ${info.messageId} sent: ${info.response}`);
        });
    }
};

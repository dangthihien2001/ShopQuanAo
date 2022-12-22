const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user,
        pass
    }
});


module.exports.sendConfirmationEmail = (name, email, activation_code) => {
    transport.sendMail({
        from : "no-reply@accounts.shopping.com",
        to: email,
        subject : "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:4000/auth/confirm/${activation_code}> Click here </a>
        </div>`,
    }).catch(err => console.log(err))
}
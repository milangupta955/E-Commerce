const nodemailer = require("nodemailer");
const email = process.env.email || require('../secrets').email;
const password = process.env.password || require('../secrets').password;
module.exports = async function sendMail(email,otp) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: email, 
              pass: password,
            },
          });
          let info = await transporter.sendMail({
            from: 'milanguta95@gmail.com',
            to: email,
            subject: "OTP",
            text: otp,
          });
    } catch(err) {
    }
}

const nodemailer = require("nodemailer");
const emaili = require('../secrets').email;
module.exports = async function sendMail(email,otp) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: emaili.user, 
              pass: emaili.pass,
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

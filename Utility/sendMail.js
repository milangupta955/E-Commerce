const nodemailer = require("nodemailer");
const email = process.env.email;
const password = process.env.password
module.exports = async function sendMail(email,message,subject="OTP") {
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
            subject: subject,
            text: message,
          });
    } catch(err) {
      console.log(err);
    }
}

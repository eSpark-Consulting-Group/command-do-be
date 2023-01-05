const SendMail = (toUser, user) => {
  console.log("send mail running");
  const nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: process.env.MAIL_EMAIL, //"4e4c0b32d63976",
      pass: process.env.MAIL_PASSWORD, //"5fa31bb53598d2"
    },
  });

  let from = `Commandدو App <lunchdepartment@esparkconsultants.com>`;
  message = {
    from: from,
    to: toUser,
    subject: "Account For Commandدو App",
    html: `<div>
        <p>Respected ${user?.name}<br/>
        <p>Welcome to Commandدو App <br/>
            Your account is created for using <b>Commandدو Application</b> for login use below credentials. 
            <br/><br/>
            <b> Email: ${user?.email}, <br/> Password: ${user?.password} </b>
        </p>
        <br /> <br /> <br />
        <strong>eSpark Consulting Group © ${new Date().getFullYear()}</strong>
        <br />
        <strong>Commandدو</strong>
        </div>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log("error transporter", err);
    } else {
      console.log("transporter info", info);
    }
  });
};

const SendForgotMail = (toUser, otp) => {
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: process.env.MAIL_EMAIL, //"4e4c0b32d63976",
      pass: process.env.MAIL_PASSWORD, //"5fa31bb53598d2"
    },
  });
  let from = `Commandدو App <lunchdepartment@esparkconsultants.com>`;
  message = {
    from: from,
    to: toUser,
    subject: "Account Verification",
    text: `your registration OTP is ${otp} `,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log("error transporter", err);
    } else {
    }
  });
};
module.exports = { SendMail, SendForgotMail };

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const client = require("twilio")(
  process.env.MY_TWILIO_ACCOUNT_SID,
  process.env.MY_TWILIO_AUTH_TOKEN
);
const app = express();

app.get("/", (req, res) => {
  res.send(`<html>
  <body>
    <h1>For E-mail send</h1>
    <p>Go to <b>/send/email</b> for sending email to user (I got email in my emailbox)</p>
    <br />
    <h1>For Text message send</h1>
    <p>Go to <b>/send/text</b> for sending sms to user (I got sms in my smsbox)</p>
  </body>
</html>
`);
});

// Using twilio consoles
app.get("/send/text", (req, res) => {
  client.messages
    .create({
      body: "Hi zain ul iman",
      to: process.env.MY_TWILIO_NUMBER_TO, // Text your number
      from: process.env.MY_TWILIO_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
});

// Using nodemailer
app.get("/send/email", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_GMAIL,
      //   for password go to 2 step verification and app password from your email
      pass: process.env.MY_GMAIL_PASS,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: process.env.MY_GMAIL,
      to: "habobin464@tutoreve.com",
      subject: "Hello zain",
      text: "Hello world",
      html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
  }
  main().catch(console.error);
});
app.listen(5000, () => {
  console.log(`Server is Listening on 5000`);
});

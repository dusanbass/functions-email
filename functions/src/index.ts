import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as c from 'cors';
import { email, password, destination } from './secret/secret';
const cors = c({ origin: true });
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

export const sendMail = functions.https.onRequest((req, res): void => {
  cors(req, res, () => {

    // getting dest email by query string
    const dest = destination;

    const mailOptions = {
      from: 'Your Account Name <yourgmailaccount@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: 'This is the subject', // email subject
      html: `<p style="font-size: 48px;">Hello World!</p>
                <br />
                <img src="https://cdn.pixabay.com/photo/2017/09/01/00/15/png-2702691_1280.png" />
            ` // email content in HTML
    };

    // returning result
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send('Sended');
    });
    return;
  });
});

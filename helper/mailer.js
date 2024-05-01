require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//045SDVEiqXDi1CgYIARAAGAQSNwF-L9IrNjGpx-Hm0QgBB4eIaDYjI0wrsqxNIKp-v59zBwc7fZtKlCEn0C4BhVvitmBwMp-kcNg";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(name, email, message) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "binfluence.aus@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: email,
      to: "binfluence.aus@gmail.com",
      subject: "Hello there is a new feedback",
      text: message,
      html: `<h1>Here is a new feedback from ${name} -- ${message}</h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("response in mailer", result);
    return result;
  } catch (error) {
    return error;
  }
}

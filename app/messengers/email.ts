import { config } from '../config';
import NodeMailer from 'nodemailer';

const smtpTransport = NodeMailer.createTransport(
  config.mailer
);

const sendMail = async (
  to: string,
  cc: string[],
  subject: string,
  text: string
) => {
  try {
    return await smtpTransport.sendMail({
      from: config.mailFrom,
      to,
      cc,
      subject,
      text
    });
  } catch(e) {
    console.log(e);
  }
}

export default sendMail;
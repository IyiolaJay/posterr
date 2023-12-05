import nodemailer from "nodemailer";

export const sendToMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: { rejectUnauthorized: false },       
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(mailOptions);
  return;
};

import nodemailer from "nodemailer";

export const sendEmail = async (email: string, url: string) => {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const options = {
    from: `"GraphQL Test Boilerplate" <foo@example.com>`,
    to: `${email} <${email}>`,
    subject: `"Hello!`,
    text: "Hello world?",
    html: `<p>Confirm your email now! @<a href="${url}">${url}</a></p>`,
  };

  const info = await transporter.sendMail(options);

  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "developoment"
  ) {
    console.log("Preview url: ", nodemailer.getTestMessageUrl(info));
  }
};

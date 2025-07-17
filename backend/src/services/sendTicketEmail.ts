import nodemailer from 'nodemailer';

export const sendTicketEmail = async (to: string, code: string) => {


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Entradas" <${process.env.EMAIL_FROM}>`,
    to,
    subject: '🎟️ Tu entrada',
    html: `
      <h2>🎫 Tu entrada</h2>
      <p>Mostrá este código QR en el evento</p>
      <img src="cid:qr-code" />
    `,
    attachments: [
      {
        filename: `qr-${code}.png`,
        content: "",
        cid: "qr-code",
      },
    ],
  });

  console.log("✅ Email enviado");
};

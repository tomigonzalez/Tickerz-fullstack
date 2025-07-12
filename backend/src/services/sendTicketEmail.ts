import nodemailer from 'nodemailer';
import { generateTicketQRBuffer } from '../utils/generateTicketQr';


interface TicketInfo {
  code: string;
  type: string;
}

interface EmailOptions {
  to: string;
  name: string;
  tickets: TicketInfo[];
}

export const sendTicketEmail = async ({ to, name, tickets }: EmailOptions) => {
  // 1. Adjuntar los QRs como buffers
  const attachments = await Promise.all(
    tickets.map(async (ticket) => {
      const qrBuffer = await generateTicketQRBuffer(ticket.code);
      return {
        filename: `${ticket.code}.png`,
        content: qrBuffer,
        cid: `qr-${ticket.code}`, // este CID se usará en el HTML
      };
    })
  );

  // 2. Generar el HTML del email con los cid
  const html = `
    <h2>🎫 Hola ${name}, aquí están tus entradas</h2>
    <p>Mostrá estos códigos QR en la entrada del evento.</p>

    ${tickets.map((t) => `
      <div style="margin-bottom: 30px;">
        <h3>${t.type}</h3>
        <img src="cid:qr-${t.code}" alt="QR ${t.code}" style="width: 200px;" />
        <p><strong>Código:</strong> ${t.code}</p>
      </div>
    `).join('')}

    <p>¡Gracias por tu compra!</p>
  `;

  // 3. Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 4. Envío del correo con attachments
  await transporter.sendMail({
    from: `"Tickerz" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "🎟️ Tus entradas",
    html,
    attachments,
  });
};

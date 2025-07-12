import nodemailer from 'nodemailer';
import { generateTicketQR } from '../utils/generateTicketQr';


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
  const qrTickets = await Promise.all(
    tickets.map(async (ticket) => {
      const qr = await generateTicketQR(ticket.code);
      return { ...ticket, qr };
    })
  );

  const html = `
    <h2>🎫 Hola ${name}, aquí están tus entradas</h2>
    <p>Mostrá estos códigos QR en la entrada del evento.</p>

    ${qrTickets.map((t) => `
      <div style="margin-bottom: 30px;">
        <h3>${t.type}</h3>
        <img src="${t.qr}" alt="QR ${t.code}" style="width: 200px;" />
        <p><strong>Código:</strong> ${t.code}</p>
      </div>
    `).join('')}

    <p>¡Gracias por tu compra!</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Tickerz" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "🎟️ Tus entradas",
    html,
  });
};

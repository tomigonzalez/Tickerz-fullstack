import QRCode from 'qrcode';

export const generateTicketQR = async (text: string): Promise<string> => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.error("Error generando QR:", err);
    throw err;
  }
};
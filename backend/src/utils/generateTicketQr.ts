import QRCode from 'qrcode';

export const generateTicketQRBuffer = async (text: string): Promise<Buffer> => {
  try {
    return await QRCode.toBuffer(text);
  } catch (err) {
    console.error("Error generando el buffer del QR:", err);
    throw err;
  }
};

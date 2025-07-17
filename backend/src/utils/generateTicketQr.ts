// import QRCodeStyling from "qr-code-styling-node";
// import path from "path";

// export const generateStyledQR = async (data: string, fileName = "qr.png"): Promise<Buffer> => {
//   const qr = new QRCodeStyling({
//     width: 300,
//     height: 300,
//     data,
//     image: path.join(__dirname, "..", "assets", "logo.png"),
//     dotsOptions: {
//       color: "#1a1a1a",
//       type: "rounded",
//     },
//     backgroundOptions: {
//       color: "#ffffff",
//     },
//     imageOptions: {
//       crossOrigin: "anonymous",
//       margin: 10,
//     },
//   });

//   const raw = await qr.getRawData("png");

//   if (!raw) {
//     throw new Error("No se pudo generar el QR");
//   }

//   // Si ya es un Buffer, devolvemos directamente
//   if (Buffer.isBuffer(raw)) {
//     return raw;
//   }

//   // Si es un Blob, lo convertimos a Buffer
//   const arrayBuffer = await raw.arrayBuffer();
//   return Buffer.from(arrayBuffer);
// };

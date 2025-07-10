//index.ts
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/userRouter';
import eventRoutes from './routes/eventRoutes';
import orderRouter from './routes/orderRouter';
import mpRouter from './routes/mpRouter';

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api', routes,eventRoutes,orderRouter,mpRouter);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(3000, () => {
      console.log('Servidor corriendo en el puerto 3000');
    });
  })
  .catch((err) => console.log('Error al conectar con MongoDB:', err));

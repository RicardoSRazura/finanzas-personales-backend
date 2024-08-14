import express from "express";
import { PORT } from "./config.js";
import authRoutes from './routes/auth.routes.js';
import altasRoutes from './routes/altas.routes.js';
import bajasRoutes from './routes/bajas.routes.js'
import cambiosRoutes from './routes/cambios.routes.js'
import consultasRoutes from './routes/consultas.routes.js'
import morgan from 'morgan';
import cors from "cors";
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())
app.use('/api', authRoutes);
app.use('/api', altasRoutes);
app.use('/api', bajasRoutes);
app.use('/api', consultasRoutes);
app.use('/api', cambiosRoutes);

app.listen(PORT);
console.log('Server on port', PORT); 
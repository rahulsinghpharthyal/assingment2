import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Connection from './connection/dbconnection.js';

dotenv.config({path: './config/.env'});
const app = express();

app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

// ---------------------Routes-------------------------
import userRoute from './routes/userRoute.js';
import AuthenticateRoute from './routes/authenticateRoute.js';
import availabilityRoute from './routes/availabitityRoute.js';

app.use('/api/auth', userRoute);
app.use('/api/authenticate', AuthenticateRoute);
app.use('/api/auth', availabilityRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
        await Connection();
        console.log(`Server Started at ${PORT}`);
});
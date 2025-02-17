import express from 'express';
import {PORT} from './config/.env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import membershipRouter from "./routes/membership.routes.js";


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', membershipRouter);


app.get('/', (req,res) => {
    res.send('Valar Morghulis, mori');
});
app.listen(PORT,()=>{
    console.log(`Just Tracker API is running on http://localhost:${PORT}`);
});

export default app;
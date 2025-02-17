import express from 'express';
import {PORT} from './config/.env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import membershipRouter from "./routes/membership.routes.js";
import connectToDatabase from "./database/mongoDb.js";


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/memberships', membershipRouter);


app.get('/', (req,res) => {
    res.send('Valar Morghulis, mori');
});
app.listen(PORT, async ()=>{
    console.log(`Just Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase()
});

export default app;
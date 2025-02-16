import express from 'express';
const app = express();

app.get('/', (req,res) => {
    res.send('Valar Morghulis, mori');
})
app.listen(3000,()=>{
    console.log('Just Tracker API is running on http://localhost:3000');
});
app.listen(3001,()=>{})

export default app;
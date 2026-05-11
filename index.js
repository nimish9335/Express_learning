const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello Worlds');
});

app.get('/about',(req,res)=>{
    res.send(`Hey there, I am ${req.query.name}`);
});

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})
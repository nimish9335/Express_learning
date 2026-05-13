const express=require('express');
const users=require('./Data');

const app=express();
const port=8000;
//server side rendering(SSR)
app.get('/users',(req,res)=>{
    const html=`
    <h1>Users</h1>
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
});
//Rest_api
app.get('/api/users',(req,res)=>{
    res.json(users);
});

app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((u)=>u.id===id);
    if(!user){
        return res.status(404).send('User not found');
    }
    return res.json(user);
});


app.listen(8000,()=>{
    console.log(`server is running on port ${port}`);
})
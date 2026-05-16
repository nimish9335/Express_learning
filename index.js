const express=require('express');
const fs=require('fs');
const users=require('./RawData.json');

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
    //Hearder creation syntax: res.setHeader(name,value)
    res.setHeader('X-custom-header','my custom header');
    console.log(req.headers);
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

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use((req,res,next)=>{
//     console.log("middleware");
// })
//post routes
app.post('/api/users', (req, res) => {
    try {
        const user = req.body;

        const data = fs.readFileSync('./RawData.json', 'utf-8');
        const users = JSON.parse(data);

        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        user.id = id;

        users.push(user);

        fs.writeFileSync('./RawData.json', JSON.stringify(users, null, 2));

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(8000,()=>{
    console.log(`server is running on port ${port}`);
})
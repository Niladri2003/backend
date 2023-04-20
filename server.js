const express=require('express');
const app=express();



app.get("/",(req,res)=>{
    res.send("hello");
})
app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted done");
})
app.listen(3000,()=>{
    console.log('server started at 3000');
})
const mongoose=require("mongoose");
mongoose.connect('mongodb:://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection done")
}).catch((Error)=>{
    console.log("error");
})
require('./mongoose/connection/connection')
const userRouter=require('./routes/user');
const taskRouter=require('./routes/task');

const express=require('express');

const app=express();

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(5000,()=>{
    console.log("listening port is "+5000);
});



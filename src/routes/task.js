const Task=require('../mongoose/models/task');
const auth=require('../middleware/auth');
const User=require('../mongoose/models/user')

const express=require('express')

const router=new express.Router();

router.post('/task',auth,(req,res)=>{
    req.body.author=req.user._id;
    new Task(req.body).save().then((result)=>{
        res.status(201).send(result)
    }).catch((e)=>{
        res.status(403).send("error in post task "+e);
    })
})

router.get('/task',auth,async (req,res)=>{
    // Task.find({author:req.user._id.toString()}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch('/task',(req,res)=>{
    const _id=req.body._id;
    const {update}=req.body

    Task.findOneAndUpdate(_id,{completed:update},{new:true}).then((result)=>{
        res.send(result);
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

module.exports=router;
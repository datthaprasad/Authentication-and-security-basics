const express=require('express');

const User=require('../mongoose/models/user')
const auth=require('../middleware/auth')
const errorMessage=require('../utils/errorMessage')

const router=new express.Router();

router.post('/user',async (req,res)=>{

    try{
        const {name,email,phone,password,gender}=req.body;
        const user = new User({name,phone,email,password,gender})
        // await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user,token})

    }
    catch(e){
            errorMessage(e,res);
    }

            
})

router.get('/user/logout/all',auth,async (req,res)=>{
    try{
        req.user.tokens=[];
        req.user.save();
        res.send()
    }
    catch(e){
        res.status(500).send("server error")
    }
})

router.get('/user',async (req,res)=>{
    const {email,password}=req.query;
    try {
        const user = await User.findByCredentials(email, password)
        
        const token=await user.generateAuthToken();
        // await user.save();
        res.send({user,token})
    } catch (e) {
        res.status(400).send(String(e).split(": ")[1])
    }
})

router.get('/profile',auth,(req,res)=>{
    res.send(req.user)
})

router.get('/user/logout',auth,(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>req.token!=token.token);
        req.user.save();
        res.send(req.user.tokens)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/user', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'gender','phone']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        errorMessage(e,res)
    }
})

router.delete('/user', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports=router;
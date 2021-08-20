const mongoose=require('../connection/connection')

Task= mongoose.model("Task",{
    description:{
        type:String,
        required:true,
        lowercase:true,
        minlength:5
    },
    completed:{
        type:Boolean,
        default:false
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

module.exports=Task;
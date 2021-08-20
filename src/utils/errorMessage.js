const errorMessage=(e,res)=>{
    let message;

            try{
                message=e.errors[Object.keys(e["errors"])[0]].properties.reason.message
            }
            catch(err){
                if(String(e).includes('email_1 dup key'))
                    message="Email already used"
                else
                    message="Something went wrong";
            }

            res.status(400).send(message)
}

module.exports=errorMessage;
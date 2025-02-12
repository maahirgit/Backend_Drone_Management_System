const validateSchema = (schema) => async(req,res,next) => {
    try{
        await schema.parseAsync({
            body : req.body
        })
    }catch(e){
        res.status(400).json({
            message : e
        })
    }
}

module.exports = {
    validateSchema
}
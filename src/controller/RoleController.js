const roleSchema = require("../model/RoleModel")

const createRole = async(req,res) => {
    const role = req.body
    const savedUser = await roleSchema.create(role)

    res.status(200).json({
        message : "Role Created Successfully",
        data : savedUser
    })
}

const getRole = async(req,res) => {
    const getRole = await roleSchema.find()
    if(getRole){
        res.status(200).json({
            message : "Roles fetched successfully",
            data : getRole
        })
    }
    else{
        res.status(500).json({
            message : "Error in in fetching roles"
        })
    }
}
module.exports = {
    createRole,
    getRole
}
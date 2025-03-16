const zod = require('zod')

const LoginValidationSchema = zod.object({
    body : zod.object({
         Email: zod.string().email("Invalid email address"),
                Password: zod.string().min(8, "Password must be at least 8 characters long").max(100, "Password must be at most 100 characters long")
    })
})

module.exports = LoginValidationSchema
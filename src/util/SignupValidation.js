const zod = require('zod')

const SignupValidationSchema = zod.object({
    body : zod.object({
        Fname : zod.string().min(2, "First name must be at least 2 characters long").max(50, "First name must be at most 50 characters long").regex(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
        Lname: zod.string().min(2, "Last name must be at least 2 characters long").max(50, "Last name must be at most 50 characters long").regex(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
        Email: zod.string().email("Invalid email address"),
        Password: zod.string().min(8, "Password must be at least 8 characters long").max(100, "Password must be at most 100 characters long")
    })
})

module.exports = SignupValidationSchema
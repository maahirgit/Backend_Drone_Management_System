const nodemailer = require('nodemailer')

const sendMail = async(to,subject,mailtext) => {
    const mailOption = {
        from : "programmers752@gmail.com",
        to : to,
        subject : subject,
        text : mailtext
    }

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "programmers752@gmail.com",
            pass : "nexhtmiodniykvai"
        }
    })

    const res = await transporter.sendMail(mailOption)
}

module.exports = {
    sendMail
}
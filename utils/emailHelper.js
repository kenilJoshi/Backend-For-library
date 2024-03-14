const nodemailer = require('nodemailer')

const mailHelper = async (option) => {
    console.log(option);
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jennyfer.medhurst@ethereal.email',
            pass: '7Fm3gaBnFBAY7ywms6'
        }
    });

    const message = {
        from: 'keniljoshi3@gmail.com',
        to: option.email,
        subject: option.subkect,
        text: option.message
    }
    try{
        await transporter.sendMail(message)
    }catch(e){
        console.log(e);
    }
}

module.exports = mailHelper
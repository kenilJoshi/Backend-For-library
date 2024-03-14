const jwt = require("jsonwebtoken")
require('dotenv').config();


const cookieToken = (user, res) => {
    
    const token = jwt.sign({email: user.email, role: user.role}, process.env.JWT_SECRET)

    res.status(200).cookie("token", token).json({
        success: true,
        user,
        token
    })
}

module.exports = {
    cookieToken
}
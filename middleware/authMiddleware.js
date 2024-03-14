const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization').replace("Bearer ", "")
    console.log(token);

    if(!token){
        return next(new Error('Token is not present'))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await prisma.user.findUnique({
        where:{
            email: decoded.email
        }
    })

    next()
}

exports.customRoles = (roles) => {
    return (req, res, next) => {
        if(!req.roles == roles){
            return new Error("You are not allowed")
        }
        next()
    }
}
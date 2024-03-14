const { cookieToken } = require("../utils/cookieToken")
const { validateUser, validatePassword } = require("../utils/validatorUtil")
const crypto = require("crypto")
const nodeMailer = require('../utils/emailHelper')
const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()


exports.userSignUp = async (req, res) => {
    const userInfo = req.body

    console.log(userInfo);

    try{
        if(!userInfo.name || !userInfo.email || !userInfo.password){
            throw new Error("Details shouldnt be empty")
        }
        const data = await validateUser({name: userInfo.name, email: userInfo.email, password: userInfo.password})
        // console.log(data==Error);
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        }) 
        cookieToken(newUser, res)
    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.userSignIn = async (req, res) => {
    const userInfo = req.body

    try{
        if(!userInfo.email || !userInfo.password){
            throw new Error("Details shouldnt be empty")
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            }
        })

        const isPasswordCorrect = await validatePassword(userInfo.password, user.password)

        if(isPasswordCorrect){
            cookieToken(user, res)
        }else{
            throw new Error("Password is not right")
        }

    }catch(e){
        res.status(400).json(e.message)
    }
}

exports.logout = (req, res) => {
    res.cookie("token", null)
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    if(!email){
        res.status(400).send('Email is not provided')
    }

    let token = crypto.randomBytes(20).toString("hex")

    const forgot_Password_Token = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            forgot_password_token: token
        }
    })
    console.log(forgot_Password_Token);
    if(forgot_Password_Token == null){
        res.status(400).send('User is not present')
    }

    const myUrl = `${req.protocol}://localhost:5173/reset/${token}`
    const message = `Copy paste the url to reset the password \n\n ${myUrl}`;


    try{
        await nodeMailer({
            email: email,
            subject: "library Password reset",
            message: message
        })

        res.status(200).json({
            success: true,
            message: 'Email sent'
        })

    }catch(e){
        res.status(400).send(e)
    }
}

exports.resetPassword = async(req, res) => {
    const forgotPasswordToken = req.params.id
    const {password} = req.body

    if(!password){
        res.status(400).send('no password')
    }
    
    const hashed_Password = await bcrypt.hash(password, 10);
    try{

        

        const response = await prisma.user.update({
            where: {
                forgot_password_token: forgotPasswordToken,
            },
            data:{
                password: hashed_Password
            }
        })

        // console.log(response);   
     res.status(200).send(response)   

    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.getUserDetails = (req, res) => {
    res.status(200).json({...req.user})
}

exports.adminCreate = async (req, res) => {
    const userInfo = req.body

    

    try{
        if(!userInfo.name || !userInfo.email || !userInfo.password){
            throw new Error("Details shouldnt be empty")
        }
        const data = await validateUser({name: userInfo.name, email: userInfo.email, password: userInfo.password})
        // console.log(data==Error);
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role:"admin"
            }
        }) 
        cookieToken(newUser, res)
    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.librarianCreate = async (req, res) => {
    const userInfo = req.body

    

    try{
        if(!userInfo.name || !userInfo.email || !userInfo.password){
            throw new Error("Details shouldnt be empty")
        }
        const data = await validateUser({name: userInfo.name, email: userInfo.email, password: userInfo.password})
        // console.log(data==Error);
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role:"librarian"
            }
        }) 
        res.status(200).json({
            success: true,
            newUser
        })
    }catch(e){
        res.status(400).send(e.message)
    }
}

// exports.createBook = async (req, res) => {
//     const bookInfo = req.body

//     try{
//         if(!bookInfo.name|| !bookInfo.description|| !bookInfo.quantity){
            
//                 throw new Error("Details shouldnt be empty")
//             }
//             const newBook = await prisma.book.create({
//                 data:{
//                     name: bookInfo.name,
//                     description: bookInfo.description,
//                     quantity: bookInfo.quantity
//                 }
//             })
//         res.status(200).json({
//             success: true,
//             newBook
//         })

//     }catch(e){
//         res.status(400).send(e.message)
//     }
// }
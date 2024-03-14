const {z} = require("zod")
const bcrypt = require("bcryptjs")

const validateUser = async (data) => {
    const userValidateSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5)
    })

    try{
        let info = userValidateSchema.safeParse({name: data?.name, email: data?.email, password: data?.password})

        if(info.success == true){
        let hashed_password = await bcrypt.hash(data.password, 10)
        
        let user = {
            name: data.name,
            email: data.email,
            password: hashed_password
        }

        return user
    }else{
        throw new Error(info.error)
    }
    }catch(e) {
        throw new Error(e)
    }
}

const validatePassword = async (password, hashed_password) => {

    return await bcrypt.compare(password, hashed_password)
}

module.exports = {
    validateUser,
    validatePassword
}
require("dotenv").config()
const server = require("./app")

server.listen(process.env.PORT, () =>{ 
    console.log(`Server is running at ${process.env.PORT}`);
})
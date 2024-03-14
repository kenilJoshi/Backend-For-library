const { PrismaClient } = require("@prisma/client")
const { param } = require("../app")

const prisma = new PrismaClient()


exports.createBook = async (req, res) => {
    const bookInfo = req.body

    try{
        if(!bookInfo.name|| !bookInfo.description|| !bookInfo.quantity){
            
                throw new Error("Details shouldnt be empty")
            }
            const newBook = await prisma.book.create({
                data:{
                    name: bookInfo.name,
                    description: bookInfo.description,
                    quantity: bookInfo.quantity
                }
            })
        res.status(200).json({
            success: true,
            newBook
        })

    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.getBooks = async (req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 10; 
        const offset = parseInt(req.query.offset) || 0;

        const data = await prisma.book.findMany({
            take: limit,
            skip: offset
        });
        const totalCount = await prisma.book.count();

        res.status(200).json({
            successs: true,
            data,
            totalCount
        })

    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.singleBook = async (req, res) => {
    const id = req.params.id

    try{
        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            successs: true,
            book
        })

    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.deleteBook = async(req, res) => {
    const id = req.params.id

    try{
        const deleteBook = await prisma.book.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            successs: true,
        })

    }catch(e){
        res.status(400).send(e.message)
    }
}



exports.borrowedBook = async(req, res) => {
    const bookId = req.params.id
    const user_id = req.user.id

    const today_date = new Date()

    today_date.setDate(today_date.getDate() + 5)

    try {
        // Create a borrowed book entry

        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(bookId)
            }
        })
        
        if (!book || book.quantity==0) {
            throw new Error('Book not found or there is quantity is 0')
        }else{
            const borrowed_Book = await prisma.borrowed.create({
                data:{
                    user_id: user_id,
                    book_id: parseInt(bookId),
                    duedate: today_date
                }
            })

            const updateQuantity = await prisma.book.update({
                where: {
                    id: parseInt(bookId)
                },
                data: {
                    quantity: book.quantity !== 0 ? book.quantity - 1 : 0
                }
            })

        res.status(200).json({
            successs: true,
            borrowed_Book,
            updateQuantity
        })
    }
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.extendDate = async (req, res) => {
    const bookId = req.params.id
    const date = new Date(req.body.date)

    try{
        const updateDate = await prisma.borrowed.update({
            where: {
              id: parseInt(bookId),
            },
            data: {
                // name: 
                duedate: date,
            },
          })

        res.status(200).json({
            successs: true,
            updateDate
        })
        

    }catch(e){
        res.status(400).send(e.message)

    }
}

exports.punchBooks = async(req, res) => {
    const borrowedBookID = req.params.id
    try{
        const updateborrowed = await prisma.borrowed.update({
            where: {
                id: parseInt(borrowedBookID)
            },
            data: {
                submited: true,
                book: {
                    update: {
                        quantity: {
                            increment: 1
                        }
                    }
                }
            },
            include: {
                book: true
            }
        })
        
        
        res.status(200).json({
            successs: true,
            updateborrowed
        })


    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.checkDueDate = async (req, res) => {
    try{
        const duePending = await prisma.borrowed.findMany({
            where: {
                user_id: req.user.id,
                duedate: {
                    gt: new Date(),
                },
                submited: false
            }
        })

        res.status(200).json({
            successs: true,
            duePending
        })
    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.getTheUserThatBorrowed = async (req, res) => {
    const bookId = req.params.id 
    try{    
        const getusers = await prisma.borrowed.findMany({
            where: {
                book_id: parseInt(bookId)
            },
            include: {
                user: true
            }
        })

        res.status(200).json({
            successs: true,
            getusers
        })
    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.submitBorrowed = async(req, res) => {
    const borrowId = req.params.id
    try{
        const submitBorrow = await prisma.submit.create({
            data:{
                user_id: req.user.id,
                borrowe_id: borrowId
            }
        })
        res.status(200).json({
            successs: true,
            submitBorrow
        })

    }catch(e){
        res.status(400).send(e.message)
    }
}
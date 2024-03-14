const express = require("express")
const router = express.Router()

const {createBook, getBooks, singleBook, deleteBook, borrowedBook, extendDate, punchBooks, checkDueDate, getTheUserThatBorrowed, submitBorrowed} = require("../controllers/book")
const {isLoggedIn, customRoles} = require("../middleware/authMiddleware")

router.route("/createBook").post(isLoggedIn, customRoles("librarian"), createBook)
router.route("/books").get(getBooks)
router.route('/submitBorrow').post(submitBorrowed)

router.route("/book/:id").get(singleBook)
router.route("/book/:id").delete(deleteBook)

router.route("/borrowedBook/:id").post(isLoggedIn, borrowedBook)
router.route("/extendDate/:id").put(isLoggedIn, customRoles("librarian"), extendDate)
router.route("/punchBook/:id").put(isLoggedIn, customRoles("librarian"), punchBooks)

router.route("/checkdueDate").get(isLoggedIn, checkDueDate)
router.route("/getTheUserThatBorrowed/:id").get(isLoggedIn, customRoles("admin"), getTheUserThatBorrowed)

module.exports = router
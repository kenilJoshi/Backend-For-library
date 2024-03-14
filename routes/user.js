const express = require("express")
const router = express.Router()

const {userSignUp, userSignIn, logout, forgotPassword, resetPassword, getUserDetails, adminCreate, librarianCreate, } = require("../controllers/user")
const {isLoggedIn, customRoles} = require("../middleware/authMiddleware")

router.route("/userSignUp").post(userSignUp)
router.route("/userSignIn").post(userSignIn)
router.route("/logout").get(logout)
router.route("/forgotPassword").put(forgotPassword)
router.route("/reset/:id").put(resetPassword)

router.route("/userDashboard").get(isLoggedIn, getUserDetails)
router.route("/adminCreate").post(adminCreate)
router.route("/librarianCreate").post(isLoggedIn, customRoles("admin"), librarianCreate)
// router.route("/createBook").post(isLoggedIn, customRoles("librarian"), createBook)

module.exports = router
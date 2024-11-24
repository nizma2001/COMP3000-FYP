const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

//Admin access only
 router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
    res.json({message: "WELCOME ADMIN"});
 });

//Admin and User access
router.get("/user", verifyToken, authorizeRole("user"), (req, res) => {
    res.json({message: "WELCOME USER"});
 });

 module.exports = router;
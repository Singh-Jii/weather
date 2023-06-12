const {Router } = require("express");



const { login, signup, logout } = require("../controllers/user.controller");


const { authen } = require("../middlewares/auth");



const ur = Router();


ur.post("/login",login);


ur.post("/signup",signup);


ur.get("/logout",authen,logout);



module.exports = {ur};


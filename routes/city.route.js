
const {Router } = require("express");


const { authen } = require("../middlewares/auth");


const { gcd, msc } = require("../controllers/city.controller");



const rl = require("../middlewares/redisLimiter");



const cr = Router();


cr.get("/mostsearchedcity",msc);



cr.get("/:city",authen,gcd);




module.exports = cr;
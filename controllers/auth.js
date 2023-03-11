const express = require("express")
const router = express.Router();
const register = require("./register");
const login = require("./login");
const userinfo = require("./userinfo");
const addinternship = require("./addinternship");
const search = require("./search");


router.post("/register",register);
router.post("/login",login);
router.post("/userinfo",userinfo);
router.post("/addinternship",addinternship);
router.get("/search",search);



module.exports = router;

const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async(req,res)=>{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({status:"error",error:"Please enter your email and password both"})

        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            console.log(results);
            if(err) throw err;
            if (!results[0] || !await bcrypt.compare(password, results[0].password)) {
                console.log("If may aya login")
                return res.json({status:"error",error:"Incorrect email or password"})
            } else {
                console.log("else may aya login")
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expiresIn: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userRegistered', token, cookieOptions);
                return  res.json({status:"success",success:"user logged in successfully"})
            }
        })
   
}

module.exports = login;
const db = require("../routes/db-config")
const bcrypt = require("bcryptjs")

const register= async (req, res)=>{
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;

    if(!name || !email || !password || !passwordConfirm) {
        console.log(name+" "+email+" "+password+" "+passwordConfirm)
        return res.json({status : "error", error: "Please enter all fields"});
    }
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            throw err;
        } 
        if(results[0]) {
            console.log("Email has already been used")
            return res.json({status:"error",error:"Email has already been used"})
        }else if(password != passwordConfirm){
            console.log("password doesn't match confirm password")
            return res.json({status:"error",error:"password doesn't match confirm password"})
        }else{
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
    
            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
                if (err) {
                    throw err;
                } else {
                    return res.json({status:"success",success:"User has been registered"})

                }
            })
           
        }
   
    })
}

module.exports = register; 
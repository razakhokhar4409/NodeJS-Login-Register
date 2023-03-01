const db = require("../routes/db-config")
const jwt = require("jsonwebtoken");
const loggedIn = (req,res,next)=>{

    if (req.cookies.userRegistered) {
        try {
            // 1. Verify the token
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET );
            console.log(decoded);

            // 2. Check if the user still exist
            db.query('SELECT * FROM users WHERE id = ?', [decoded['id']], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }


}

module.exports = loggedIn;
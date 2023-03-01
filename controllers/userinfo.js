const db = require("../routes/db-config")
const jwt = require("jsonwebtoken");

const userinfo= async (req, res)=>{
    console.log(req.body);
    const { mobileno } = req.body;

    if(!mobileno) {
        console.log(mobileno)
        return res.json({status : "error", error: "Please enter all fields"});
    }
       

    // logged in code

    let tempUser;
    console.log("Recommended lineeeee : "+req.cookies.userRegistered)

        if (req.cookies.userRegistered) {
            try {
                // 1. Verify the token
                console.log("BEFOREEE Decoded values isss");
                const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET );
                console.log("Decoded values isss"+decoded['id'] + " Email is "+ decoded['email']);
    
                // 2. Check if the user still exist

                // db.query('SELECT * FROM users WHERE id = ?', [decoded.id],  async(error, results, fields) => {
                //     if (error) {
                //       console.error(error.message);
                //       return res.json({status : "error", error: "issue while usinf database"});
                //     }
                //     console.log('Query results:', results);
                //     if (results && results.length > 0) {
                //       // do something with the query results
                //       tempUser = results[0];
                //       console.log('User:', tempUser);
                //     } else {
                //       console.log('No results found for query');
                //     }

                // });
         
                // for part time using id instead of email

                db.query('INSERT INTO users_additional_info_test SET ?', { id:decoded.id, mobileno:mobileno }, (err, results) => {
                    if (err) {
                        console.log("No cokkies found in userinfo wala section 2")
    
                        throw err;
                    } else {
                        return res.json({status:"success",success:"User extra info has been added"})
    
                    }
                })

                // end of for part time using id instead of email

            } catch (err) {
                console.log(err)
                return res.json({status : "error", error: "issue while usinf database"});
            }
        } else {
            console.log("No cokkies found in userinfo wala section")
        }
    
    
    
   // console.log(tempUser.body.email)

            // db.query('INSERT INTO users_additional_info_test SET ?', { id:tempUser.email, mobileno:mobileno }, (err, results) => {
            //     if (err) {
            //         console.log("No cokkies found in userinfo wala section 2")

            //         throw err;
            //     } else {
            //         return res.json({status:"success",success:"User extra info has been added"})

            //     }
            // })

}

module.exports = userinfo; 
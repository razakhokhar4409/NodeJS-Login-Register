const db = require("../routes/db-config")
//const jwt = require("jsonwebtoken");

const addinternship = async (req, res) => {
    console.log(req.body);
    const { company_name,
        internship_catagory,
        internship_title,
        opening_positions,
        company_city,
        comapny_country,
        company_address,
        about_company,
        internship_description,
        salary,
        perks } = req.body;

    if (!company_name || !internship_catagory || !internship_title || !opening_positions || !company_city ||
        !comapny_country || !company_address || !about_company || !internship_description ||
        !salary || !perks) {

        console.log(company_name + " " + internship_catagory + " " + internship_title + " " + opening_positions + " " + company_city + " " + comapny_country + " " + company_address + " " + about_company + " " + internship_description + " " + salary + " " + perks)
        return res.json({ status: "error", error: "Please enter all fields" });
    }


    db.query('select * from internships where company_name = ? and internship_catagory = ? and internship_title= ? ',[company_name, internship_catagory, internship_title],async (err, results) => {

        if (err) {
            throw err;
        } 
        if(results[0]) {
            console.log("Internship already added with this company of such catagory and job title")
            return res.json({status:"error",error:"Internship already added with this company of such catagory and job title"})
        }else{
            db.query('INSERT INTO internships SET ?', { company_name :company_name,
                internship_catagory: internship_catagory,
                internship_title : internship_title,
                opening_positions : opening_positions,
                company_city : company_city,
                comapny_country : comapny_country,
                company_address : company_address,
                about_company : about_company,
                internship_description : internship_description,
                salary : salary, 
                perks : perks }, (err, results) => {
                if (err) {
                    console.log("No cokkies found in userinfo wala section 2")
        
                    throw err;
                } else {
                    return res.json({ status: "success", success: "Internship has been added" })
        
                }
            })
        }

    })

}

module.exports = addinternship; 
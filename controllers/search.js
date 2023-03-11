
const db = require("../routes/db-config")

const search = (request, response, next) =>{

    try{
    var search_query = request.query.search_query;

    var query = `SELECT company_name,internship_catagory,internship_title FROM internships 
    WHERE company_name LIKE '%${search_query}%'
    UNION
    SELECT company_name,internship_catagory,internship_title FROM internships 
    WHERE internship_catagory LIKE '%${search_query}%'
    UNION
    SELECT company_name,internship_catagory,internship_title FROM internships 
    WHERE internship_title LIKE '%${search_query}%'
    LIMIT 2`;

    db.query(query, function(error, data){
        if(error) {
            console.log("DB aya search kay "+ error)
            return response.json('');
        }
        console.log("QRY IS :  "+ data[0].company_name + "  "+  data[0].internship_title)
        return response.json(data);

    });

    }catch(error){
        console.log("Catch may aya search kay "+ error)
        return response.json('');
    }
};

module.exports = search;
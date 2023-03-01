
const db = require("../routes/db-config")

const search = (request, response, next) =>{

    try{
    var search_query = request.query.search_query;

    var query = `
    SELECT company_name FROM internships 
    WHERE company_name LIKE '%${search_query}%' 
    LIMIT 3`;

    db.query(query, function(error, data){
        if(error) {
            console.log("DB aya search kay "+ error)
            return response.json('');
        }
        return response.json(data);

    });
    }catch(error){
        console.log("Catch may aya search kay "+ error)
        return response.json('');
    }
};

module.exports = search;
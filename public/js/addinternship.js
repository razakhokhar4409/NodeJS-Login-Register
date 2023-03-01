form.addEventListener("submit",()=>{
    console.log("Caliing ha bahiiiii")

    const addinternship = {
        company_name : company_name.value,
        internship_catagory: internship_catagory.value,
        internship_title : internship_title.value ,
        opening_positions : opening_positions.value,
        company_city : company_city.value,
        comapny_country : comapny_country.value,
        company_address : company_address.value,
        about_company : about_company.value,
        internship_description : internship_description.value,
        salary : salary.value,
        perks : perks.value

    }

    fetch("/api/addinternship",{
        method: "POST",
        body: JSON.stringify(addinternship),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
        .then(data=>{
            if(data.status == "error"){
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else{
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
            }
        })
})
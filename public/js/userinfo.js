form.addEventListener("submit",()=>{
    console.log("Caliing ha bahiiiii in userinfo")

    const userinfo = {
        mobileno : mobileno.value

    }

    fetch("/api/userinfo",{
        method: "POST",
        body: JSON.stringify(userinfo),
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
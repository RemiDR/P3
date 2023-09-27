var submit = document.querySelector("form")

console.log(submit)
submit.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    const obj={
        email:e.target.email.value,
        password:e.target.motDePasse.value,
    }
    console.log(JSON.stringify(obj))
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:   JSON.stringify(obj),
    })
    .then(r=>r.json())
    .then(resp=>{
        console.log(resp)
        localStorage.setItem("token", resp.token)
    })
    if(e.target.email.value==="sophie.bluel@test.tld" &&e.target.motDePasse.value === "S0phie")
        {
        location.href="/FrontEnd"
        }
        else{
            alert("Erreur mauvais email ou mot de passe")
        }
})



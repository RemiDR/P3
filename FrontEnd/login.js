var submit = document.querySelector("form")

console.log(submit)
submit.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    alert("ok")
    const obj={
        email:e.target.email.value,
        password:e.target.motDePasse.value,
    }
    console.log(JSON.stringify(obj))
    fetch("https://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:   JSON.stringify(obj),
    })
    .then(r=>r.json())
    .then(resp=>{console.log(resp)})
})

if (email != "sophie.bluel@test.tld" || password != "S0phie")
{
    alert("email ou mot de passe invalide")
}


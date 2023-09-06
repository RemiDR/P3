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
    fetch("user/login", { method: "POST", body: JSON.stringify(obj), "Content-Type": "application/json" })
    .then(r=>r.json()).then(resp=>{console.log(resp)})
})


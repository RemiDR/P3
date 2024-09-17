/*var submit = document.querySelector("form")

console.log(submit)
submit.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    const obj = {
        email: e.target.email.value,
        password: e.target.motDePasse.value,
    }
    console.log(JSON.stringify(obj))
    if (e.target.email.value === "sophie.bluel@test.tld" && e.target.motDePasse.value === "S0phiee") {
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
        })
            .then(r => r.json())
            .then(resp => {
                console.log(resp)
                localStorage.setItem("token", resp.token)
                location.href = "/FrontEnd"
            })
    }
    else {
        alert("Erreur mauvais email ou mot de passe")
    }
})*/

const erreurDejaConnecter = document.querySelector(".erreurDejaConnecter");
const erreurMail = document.querySelector(".erreurMail");
const erreurMotDePasse = document.querySelector(".erreurMotDePasse");

const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const urlApi = "http://localhost:5677/api/users/login";

verifLogin();
function verifLogin() {
    if(localStorage.getItem("token")){
        localStorage.removeItem("token");
    }
}

submit.addEventListener("click",(event)=>{
    event.preventDefault();
    let user = {
        email: email.value,
        password: password.value,
    };
    login(user);
})

async function login(user){
    console.log(user);
    erreurMail.innerHTML="";
    erreurMotDePasse.innerHTML="";
    console.log(user);
    console.log("Test",user);
    if(!user.email.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/g ) || !user.password.match(/^[a-zA-Z0-9]+$/g) ){
        return;
    }
    try{
        const response = await fetch(urlApi,{
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(user),
        });
        const resultat = await response.json();
        console.log(resultat);
        if(resultat.error || resultat.message){
            const erreurMessage = document.createElement("p");
            erreurMessage.innerHTML = "Erreur mauvais email ou mot de passe";
            erreurMotDePasse.appendChild(erreurMessage); 
        }
        else if(resultat.token) {
            localStorage.setItem("token",resultat.token);
            window.location.href = "index.html";
        }
    } catch(error){
        console.log(error);
    }
    
}
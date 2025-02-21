import { signin } from "../firebase.js"

let password = document.querySelector("#password")
let email = document.querySelector("#email")
let loginBtn = document.querySelector("#loginBtn")

loginBtn.addEventListener("click", signin)
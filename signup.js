import {
    signup,
isUserExist,
} from "../firebase.js"

let signupBtn = document.querySelector("#signupBtn")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

signupBtn.addEventListener("click", signup)
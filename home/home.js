import {
    isUserExist,
    getSingleDocument,
    logout
} from "../firebase.js"

const logoutBtn = document.querySelector(".logoutBtn")
const recipeSearchInput = document.querySelector(".recipeSearchInput")
const recipeSearchBtn = document.querySelector(".recipeSearchBtn")
const recipesContainer = document.querySelector(".recipesContainer")
isUserExist()

logoutBtn.addEventListener("click", logout)

let starter = async ()=> {
    let uid = await isUserExist()
    // console.log (uid , "==>> uid")
   let {firstName, lastName, userName, description, email, password} = await getSingleDocument(uid)
  
}

starter()

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pasta
// https://forkify-api.herokuapp.com/api/v2/recipes/:id

let displayRecipes = async ()=> {
    recipesContainer.innerHTML = ""
    console.log (recipeSearchInput.value)
let recipesData = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearchInput.value}`)
let recipeJson = await recipesData.json()
let {data} = recipeJson
let {recipes} = data

if (!data.recipes || data.recipes.length === 0) {
    recipesContainer.innerHTML = `<div class="noRecipeFound">No recipe found!</div>`;
    recipesContainer.classList.add("flexCenter")
} else{
    recipesContainer.classList.remove("flexCenter")
}

recipes.forEach((data) => {

    try {
        let {publisher, image_url, title, id} = data
        let shortTitle = title.slice(0,14) + "..."
// console.log (id)
let div = document.createElement("div")
div.classList.add("recipe")
div.innerHTML = `<img src="${image_url}" alt="">

<div class="recipeTextContainer">
<div class="recipeName">${shortTitle}</div>
<div class="recipeResturantName">${publisher}</div>

</div>`
document.querySelector(".recipesContainer").appendChild(div)
recipeSearchInput.value = ""

div.addEventListener("click", async (e)=> {
let displaySingleRecipe = async ()=> {
    console.log (id, "==>> id")
    try{

        let singleRecipe = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        let singleRecipeJson = await singleRecipe.json()
        console.log (singleRecipeJson)
    } catch(err) {
        console.log (err)
    }
}

await displaySingleRecipe();

});

}catch (err){
    console.log (err)
}

});
}

recipeSearchBtn.addEventListener("click", displayRecipes)
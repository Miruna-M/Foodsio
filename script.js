const appId = "81884f9c";
const appKey = "4113cdb0e54b7cafcec9aa589529e29a";

//Source API
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;

// From HTML
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
const loadingEle=document.querySelector("#loading");

// Search Button
btnFind.addEventListener("click", () => loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if(e.keyCode===13) {
        loadRecipes(inputVal);
    }
})

// Scroll Bar
const toggleLoad=(element, isShow) => {
    element.classList.toggle("hide", isShow);
}

const setScrollPosition = () => {
    recipeContainer.scrollTo({top:0, behavior: "smooth" });
}

// Search Functionality
function loadRecipes(type="fish"){ // default value
    toggleLoad(loadingEle, false);
    const url=baseUrl + `&q=${type}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            renderRecipes(data.hits);
            toggleLoad(loadingEle, true);
        })
        .catch((error) => toggleLoad(loadingEle, true))
        .finally(() => setScrollPosition());
}

loadRecipes();

const getRecipeStepsStr = (ingredientLines = []) => {
    let str = "";
    for(var step of ingredientLines) {
        str = str+`<li>${step}<li>`;
    }
    return str;
}

const renderRecipes = (recipeList=[]) => {
    recipeContainer.innerHTML="";
    recipeList.forEach(recipeObj => {
        const { 
            label: recipeTitle, 
            ingredientLines, 
            image: recipeImage 
        } = recipeObj.recipe;
        const RecipeStepStr = getRecipeStepsStr(ingredientLines);

        // Render HTML
        const htmlStr= `<div class="recipe">
            <div class="recipe-title">${recipeTitle}</div>
            <div class="recipe-image">
                <img src="${recipeImage}" alt="Recipe" />
            </div>
            <div class="recipe-text">
                <ul>
                    ${recipeStepStr}
                </ul>
            </div>
        </div>`;
      recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    })
}

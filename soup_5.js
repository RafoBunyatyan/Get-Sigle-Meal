const mealForm = document.querySelector(".meal_form"),  
    mealInput = document.querySelector(".meal_input"),
    mealBtn = document.querySelector(".meal_btn"),
    randomBtn = document.querySelector(".random_btn"),
    result = document.querySelector(".result"); 

let url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
let urlRandom = (`https://www.themealdb.com/api/json/v1/1/random.php`);

result.innerText = "Here Will be display your search result";

function findMeal() {
    inputValue = mealInput.value;
    if (mealInput.value) {
        fetch(`${url}${inputValue}`, {
            method: "GET",
            }).then(data => {
                return data.json();  
            }).then(data => {
                if (data.meals) {
                    drawMeal(data.meals);
                    mealInput.value = "";
                } else {
                    result.innerHTML = `Enter a valis meal name`;
                    mealInput.value = "";
                }
            });  
    } else {
        alert("Enter a meal name");
    }  
};

function drawMeal(meals) {
    result.innerHTML = meals.map(meal => {
        return `<div class="meal_block">
                    <img class="meal_img" data-id=${meal.idMeal} src=${meal.strMealThumb}> 
                    <h2>${meal.strMeal}</h2>
                </div>`;
    }).join("")    
};          

function getSigleMeal(mealId) { 
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, {
    method: "GET",
    }).then(data => {
        return data.json();
    }).then(data =>
        result.innerHTML = data.meals.map(meal => {
            const ingredient = [];
            for (let i = 1; i < 20; i++) {
                // console.log(meal[`strIngredient${i}`]);
                if (meal[`strIngredient${i}`]) {
                    ingredient.push(meal[`strIngredient${i}`]);
                } else { 
                    break 
                }
            };
            console.log(ingredient);
            return `<div class="single_meal">
                        <a href="${meal.strYoutube}" terget="_blank">Meal video</a>  
                        <img src=${meal.strMealThumb}>
                        <h4>${meal.strMeal}</h4>
                        <span>Category: ${meal.strCategory}</span>
                        <ul>${ingredient.map(ing => { return `<span> ${ing}</span>` })}</ul>
                    </div>`;
        }))
};

randomBtn.addEventListener("click", () => {
    fetch(`${urlRandom}`, {
        method: "GET",
    }).then(data => { 
        return data.json();
    }).then(data => drawMeal(data.meals));
});

mealForm.addEventListener("submit", (e) => {
    e.preventDefault();  
    findMeal();
});

result.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG" ) {
        const mealId = e.target.getAttribute("data-id");
        getSigleMeal(mealId);
    }   
});
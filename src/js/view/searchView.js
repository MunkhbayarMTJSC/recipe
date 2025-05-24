import { elements } from "./base"

// image_url: "http://forkify-api.herokuapp.com/images/PizzaMonkeyBread67f8.jpg"
// publisher: "What's Gaby Cooking"
// publisher_url: "http://whatsgabycooking.com"
// recipe_id: "ead4e0"
// social_rank: 99.99999570141472
// source_url: "http://whatsgabycooking.com/pizza-monkey-bread/"
// title: "Pizza Monkey Bread"
const renderRecipe = (recipe) => {
    const markup = `<li>
                    <a class="results__link " href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`
    elements.resultList.insertAdjacentHTML('beforeend', markup);
}

export const clearInput = () => {
    elements.searchField.value = '';
}

export const clearResult = () => {
    elements.resultList.innerHTML = '';
}

export const getInput = () => elements.searchField.value;

export const renderRecipes = recipes => {
    recipes.forEach(renderRecipe);
}
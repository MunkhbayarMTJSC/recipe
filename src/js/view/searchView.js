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

const createButton = (page, type,direction) => `
                <button class="btn-inline results__btn--${type}" data-goto=${page}>
                    <span>Хуудас ${page}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                </button>
                `;

export const clearInput = () => {
    elements.searchField.value = '';
}

export const clearResult = () => {
    elements.resultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
}

export const getInput = () => elements.searchField.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    // Хуудаслалтын товчуудыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
}

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if (currentPage === 1 && totalPages > 1) {
        // Өмнөх хуудас гэсэн товч хасаад дараах гэсэн товчийг гаргана
        buttonHtml = createButton(2,'next','right')
    }else if(currentPage < totalPages){
        // Аль аль товчийг гаргана
        buttonHtml = createButton(currentPage-1, 'prev', 'left')
        buttonHtml += createButton(currentPage+1, 'next','right')
    }
    else if (currentPage === totalPages) {
        // Өмнөх хуудас товч харагдана дараах гэсэн товч харагдахгүй
        buttonHtml = createButton(totalPages-1, 'prev', 'left')
    } 
    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
}

// Товчний type prev, next


                
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView"
import Recipe from "./model/recipe";
import { renderRecipe, clearRecipe } from "./view/recipeView";

/* 
    Вэб аппын төлөв
        Хайлтын query үр дүн
        Тухайн үзүүлж байгаа жор
        Лайкласан жорууд
        Харуулж байгаа жорийн найрлагууд
*/

const state = {};
/**
 * Хайлтын контроллер
 */
const controllSearch = async () => {
    // Вэбээс хайлтын түлхүүр үгийг гаргаж авна
    const query = searchView.getInput();
    if (query) {
        // Шинээр хайлтын обьектийг үүсгээд state рүү хийнэ
        state.search = new Search(query);
        // Хайлт хийхэд зориулж UI бэлтгэнэ
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchResultDiv);
        // Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
        // Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
        clearLoader();
        if (state.search.result !== undefined) {
            searchView.renderRecipes(state.search.result);
        } else {
            alert('Хайлтын үр дүн илэрцгүй!!!')
        }
    }
}
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controllSearch();
})


elements.pageButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const pageNum = parseInt(btn.dataset.goto);
        console.log(pageNum);
        searchView.clearResult();
        searchView.renderRecipes(state.search.result,pageNum)
    }
})

/**
 * Жорын контроллер
 */
const controlRecipe = async () => {
    // URL- аас ID салгаж авна
    const id = window.location.hash.replace('#','');
    // Жорын моделийг үүсгэж өгнө
    state.recipe = new Recipe(id);
    // UI бэлтгэнэ
    clearRecipe();
    // Жороо татаж авчрана
    renderLoader(elements.recipeDiv);
    await state.recipe.getRecipe();
    clearLoader();

    // Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcNumOfPeople();
    // Жороо дэлгэцэнд харуулна
    renderRecipe(state.recipe);
}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
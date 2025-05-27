import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView"
import Recipe from "./model/recipe";
import { renderRecipe, clearRecipe, activeRecipe } from "./view/recipeView";
import List from "./model/list";
import * as listView from "./view/listView";
import * as likeView from "./view/likeView"
import Like from "./model/like";

/* 
    Вэб аппын төлөв
        Хайлтын query үр дүн
        Тухайн үзүүлж байгаа жор
        Лайкласан жорууд
        Харуулж байгаа жорийн найрлагууд
*/

const state = {};

likeView.toggleLikeMenu(0);

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
        searchView.clearResult();
        searchView.renderRecipes(state.search.result,pageNum)
    }
})

/**
 * Жорын контроллер
 */
const controlRecipe = async () => {
    // URL- аас ID салгаж авна
    const id = window.location.hash.replace('#', '');
    
    // Лайкын моделийг үүсгэнэ
    if (!state.likes) state.likes = new Like();
    
    if (id) {
        // Жорын моделийг үүсгэж өгнө
        state.recipe = new Recipe(id);
        // UI бэлтгэнэ
        clearRecipe();
        activeRecipe(id);
        // Жороо татаж авчрана
        renderLoader(elements.recipeDiv);
        await state.recipe.getRecipe();
        clearLoader();

        // Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
        state.recipe.calcTime();
        state.recipe.calcNumOfPeople();
        // Жороо дэлгэцэнд харуулна
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/**
 * Найрлагын контроллер
 */

const controllerList = () => {
    // state.recipe.ingredients
    // Найрлагны моделыг үүсгэнэ
    state.list = new List();
    // Ур найрлагруу харагдаж байгаа жорын найрлагыг хийнэ
    listView.clearItem();
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el);
        listView.renderItem(item);
    });
    // 
}

//**
// Like товчны контроллер
//  */

const controlLike = () => {
    // Одоо харагдаж байгаа жорын ID-г олж авах
    const currentRecipeID = state.recipe.id;
    // Энэ жорыг лайк хийсэн эсэхийг шалгах
    // Лайк хийсэн бол лайк авна үгүй бол дарна
    if (state.likes.isLiked(currentRecipeID)) {
        state.likes.removeLike(currentRecipeID);
        likeView.removeLike(currentRecipeID);
        likeView.toggleLikeButton(false)
    } else {
        const newLike = state.likes.addLike(currentRecipeID, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        likeView.renderLike(newLike);
        likeView.toggleLikeButton(true);
    }
    likeView.toggleLikeMenu(state.likes.getNumOfLikes());
}


elements.recipeDiv.addEventListener('click', (e) => {
    if (e.target.matches('.recipe__btn, .recipe__btn *')) {
        controllerList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
})

elements.listItem.addEventListener('click', e => {
    // клик хийсэн li элемэнтийн data-itemid аттрибутыг шүүж гаргаж авна
    const id = e.target.closest(".shopping__item").dataset.itemid;
    // олдсан ID тай найрлагыг моделоос устгана
    state.list.removeItem(id);
    // дэлгэцэн дээрээс устгана
    listView.deleteItem(id);
})

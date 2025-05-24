import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView"
/* 
    Вэб аппын төлөв
        Хайлтын query үр дүн
        Тухайн үзүүлж байгаа жор
        Лайкласан жорууд
        Харуулж байгаа жорийн найрлагууд
*/

const state = {};
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
    console.log('Дарсан товч:', e.target);
});
// elements.pageButtons.addEventListener('click', (e) => {
//     const btn = e.target.closest('.btn-inline');
//     console.log('Дарсан товч:', e.target);
//     if (btn) {
//         searchView.clearResult();
//         searchView.renderRecipes(state.search.result,2)
//     }
// })
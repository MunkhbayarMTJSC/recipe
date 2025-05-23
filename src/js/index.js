import Search from "./model/search";

document.querySelector('.search__btn').addEventListener('click', (e) => {
    e.preventDefault();
    let search = new Search('pasta');
    search.doSearch().then(r => console.log(r));
})
export const elements = {
    searchForm: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    searchResultDiv: document.querySelector('.results'),
    pageButtons: document.querySelector('.results__pages'),
    recipeDiv: document.querySelector('.recipe'),
    ingredientsDiv: document.querySelector('.recipe__ingredient-list'),
    listItem: document.querySelector('.shopping__list')
}
export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = (parent) => {
    const loaderHtml = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div> 
        `
    parent.insertAdjacentHTML('afterbegin', loaderHtml);
}
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}
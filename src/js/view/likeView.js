import { elements } from "./base";

export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numOfLikes => {
    elements.likesMenu.style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
    console.log(numOfLikes);
}

export const renderLike = like => {
    // rendering likes
    const html = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `
    elements.likesList.insertAdjacentHTML('beforeend', html);
}

export const removeLike = id => {
    const el = document.querySelector(`.likes__list a[href*="${id}"]`);
    if (el) el.parentElement.remove();
}
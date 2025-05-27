export default class Like{
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }
    removeLike(id) {
        // ID гэдэг элемэнттэй орцийн индексийг likes-аас хайж олно
        const index = this.likes.findIndex(el => el.id === id);
        // Уг index дээрх элементийг массиваас устгана
        this.likes.splice(index, 1);
    }
    isLiked(id) {

        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumOfLikes() {
        return this.likes.length;
    }
}
import uniqid from 'uniqid';
export default class List {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        // Жорын бүрэлдэхүүн нэмэх
        let newItem = {
            id: uniqid(),
            item
        }
        this.items.push(newItem);
        return newItem;
    }
    removeItem(id) {
        // Жорын бүрэлдэхүүн хасах
        // ID гэдэг элемэнттэй орцийн индексийг массиваас хайж олно
        const index = this.items.findIndex(el => el.id === id);
        // Уг index дээрх элементийг массиваас устгана
        this.items.splice(index, 1);
    }
}
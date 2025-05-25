import axios from "axios";
import { result } from "lodash";

// image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
// ingredients: []
// publisher: "101 Cookbooks"
// publisher_url: "http://www.101cookbooks.com"
// recipe_id: "47746"
// social_rank: 100
// source_url: "http://www.101cookbooks.com/archives/001199.html"
// title: "Best Pizza Dough Ever"

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.publisher = result.data.recipe.publisher;
        this.ingredients = result.data.recipe.ingredients;
        this.source_url = result.data.recipe.source_url;
        this.image_url = result.data.recipe.image_url;
        this.publisher_url = result.data.recipe.publisher_url;
        this.title = result.data.recipe.title;
        this.social_rank = result.data.recipe.social_rank;
    }
    calcTime() {
        // Найрлага бүрт ойролцоогоор 5 мин зарцуулахаар тооцов
        const perTimeIng = 5;
        this.time = this.ingredients.length * perTimeIng;
    }
    calcNumOfPeople() {
        this.numOfPeople = 4;
    }
}

class Recipe {
    constructor(id, image, name, servings, ingredients, time, description, appliance, utensils) {
        this.id = id;

        let imageNumber = parseInt(image.replace("Recette", "").replace(".jpg", ""), 10);
        if (id === imageNumber) {
            this.image = `assets/pictures/${image}`;
        } else if (id < 10) {
            this.image = `assets/pictures/Recette0${id}.jpg`;
        } else {
            this.image = `assets/pictures/Recette${id}.jpg`;
        }

        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit));
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = utensils;
    }
}
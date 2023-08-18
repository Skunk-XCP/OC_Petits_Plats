class TagFilters {
    constructor(recipes){
        this.recipes = recipes;
    }

    filteredIngredients() {
        let allIngredients = [];
        let uniqueIngredient;
        for (let i = 0 ; i < this.recipes.length ; i++) {
            for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
                allIngredients.push(this.recipes[i].ingredients[j].ingredient)
                uniqueIngredient = [... new Set(allIngredients)]
            }
        }
    }

    filteredAppliance() {
        let allAppliances = [];
        let uniqueAppliance;
            for (let i = 0; i < this.recipes.length; i++) {
                allAppliances.push(this.recipes[i].appliance)
                uniqueAppliance = [... new Set(allAppliances)]
            }
    }

    filteredUstensils() {
        let allUstensils = [];
        let uniqueUstensil;
        for (let i = 0 ; i < this.recipes.length ; i++) {
            for (let j = 0; j < this.recipes[i].ustensils.length; j++) {
                allUstensils.push(this.recipes[i].ustensils[j])
                uniqueUstensil = [... new Set(allUstensils)]
            }
        }
    }
}
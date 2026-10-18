"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Sara Lagerquist
 */

const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const recipeSection = document.querySelector("#recipe");
const message = document.querySelector("#message");

// Validering av sökformulär
// Validering av sökformulär
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Hämtar sökfrasen och tar bort extra mellanslag
    const searchTerm = searchInput.value.trim();

    // Kontrollerar att sökfrasen inte är tom
    if (searchTerm === "") {
        errorMessage.textContent = "Vänligen skriv en sökfras!";
        return;
    }

    // Tar bort tidigare felmeddelande
    errorMessage.textContent = "";

    // Hämtar recept från API:et
    fetchRecipes(searchTerm);
});

// Hämtar recept från API:et
async function fetchRecipes(searchTerm) {
    try {
        message.textContent = "";
        recipeSection.innerHTML = "";

        // Hämtar recept 
        const response = await fetch(
            `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`
        );

        // Kontroll av resultat
        if (!response.ok) {
            throw new Error("Kunde inte hämta recept");
        }

        // Omvandlar JSON
        const data = await response.json();

        if (!data || !Array.isArray(data.recipes)) {
            throw new Error("Ogiltigt svar från API:et");
        }

        // Kontroll om sökningen gav recept
        if (data.recipes.length === 0) {
            message.textContent =
                "Inga recept hittades, prova en annan sökfras.";
            return;
        }

        const recipe = data.recipes[0];
        displayRecipe(recipe);

    } catch (error) {
        console.error("Något gick fel:", error);
        
        message.textContent =
            "Could not fetch recipes. Please try again later.";

        recipeSection.innerHTML = "";
    }
}

// Receptets innehåll 
function displayRecipe(recipe) {
    // Artikel för recept
    const article = document.createElement("article");
    recipeSection.appendChild(article);

    // Receptets namn
    const heading = document.createElement("h3");
    heading.textContent = recipe.name;
    article.appendChild(heading);

    // Receptets bild
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    article.appendChild(image);

    // Receptinformation
    const recipeInfo = document.createElement("div");
    recipeInfo.className = "recipe-info";
    article.appendChild(recipeInfo);

    // Portioner
    const servings = document.createElement("p");
    const servingsLabel = document.createElement("strong");
    servingsLabel.textContent = "Servings: ";
    servings.appendChild(servingsLabel);
    servings.append(recipe.servings);
    recipeInfo.appendChild(servings);

    // Förberedelsetiden
    const prepTime = document.createElement("p");
    const prepTimeLabel = document.createElement("strong");
    prepTimeLabel.textContent = "Prep time: ";
    prepTime.appendChild(prepTimeLabel);
    prepTime.append(`${recipe.prepTimeMinutes} minutes`);
    recipeInfo.appendChild(prepTime);

    // Tillagningstiden
    const cookTime = document.createElement("p");
    const cookTimeLabel = document.createElement("strong");
    cookTimeLabel.textContent = "Cooking time: ";
    cookTime.appendChild(cookTimeLabel);
    cookTime.append(`${recipe.cookTimeMinutes} minutes`);
    recipeInfo.appendChild(cookTime);

    // Svårighetsgraden
    const difficulty = document.createElement("p");
    const difficultyLabel = document.createElement("strong");
    difficultyLabel.textContent = "Difficulty: ";
    difficulty.appendChild(difficultyLabel);
    difficulty.append(recipe.difficulty);
    recipeInfo.appendChild(difficulty);

    // Rubrik för ingredienser
    const ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredients";
    article.appendChild(ingredientsHeading);

    // Punktlista för ingredienser
    const ingredientsList = document.createElement("ul");
    article.appendChild(ingredientsList);

    // Lägger till varje ingrediens i listan
    recipe.ingredients.forEach(function (ingredient) {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });

    

    
}
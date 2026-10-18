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

    
}
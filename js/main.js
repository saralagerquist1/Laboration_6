"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Sara Lagerquist
 */

const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");

// Validering av sökformulär
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Felmeddelande för tom sökväg
    const searchTerm = searchInput.value;
    if(searchTerm === "") {
        errorMessage.textContent = "Vänligen skriv en sökfras!";
        return;
    }

    errorMessage.textContent = "";
    fetchRecipes(searchTerm);
})

// Hämtar från API:et
async function fetchRecipes(searchTerm) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`);

        if (!response.ok) {
            throw new Error("Kunde inte hämta recept");
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Något gick fel:", error);
    }
}


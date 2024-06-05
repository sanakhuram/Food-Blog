const apiKey = 'ee055035371842639c3a3ed8b74e0390';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (recipeId) {
        fetchRecipeDetails(recipeId);
    }
});

function fetchRecipeDetails(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayRecipeDetails(data);
        })
        .catch(error => console.error('Error fetching recipe details:', error));
}

function displayRecipeDetails(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-summary').innerHTML = recipe.summary;
    document.getElementById('recipe-image').src = recipe.image;

    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = '';
    recipe.extendedIngredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient.original;
        ingredientsList.appendChild(listItem);
    });

    const instructionsList = document.getElementById('recipe-instructions');
    instructionsList.innerHTML = '';
    recipe.analyzedInstructions[0].steps.forEach(step => {
        const listItem = document.createElement('li');
        listItem.textContent = step.step;
        instructionsList.appendChild(listItem);
    });
    
}

// Spoonacular API key
const apiKey = 'ee055035371842639c3a3ed8b74e0390';

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('query').value;
    fetchRecipes(query);
});

function fetchRecipes(query) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => displayRecipes(data.results))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('recipe-results');
    resultsDiv.innerHTML = '';
    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('article');
        recipeDiv.classList.add('mb-8');

        const recipeLink = document.createElement('a');
        recipeLink.href = `recipe.html?id=${recipe.id}`;
        recipeDiv.appendChild(recipeLink);

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;
        recipeImage.classList.add('w-full', 'h-auto', 'mb-4');
        recipeLink.appendChild(recipeImage);

        const recipeTitle = document.createElement('span');
        recipeTitle.classList.add('block', 'font-semibold');
        recipeTitle.textContent = recipe.title;
        recipeDiv.appendChild(recipeTitle);

        const recipeAuthor = document.createElement('span');
        recipeAuthor.classList.add('block', 'text-gray-600');
        recipeAuthor.textContent = 'Recipe by Spoonacular';
        recipeDiv.appendChild(recipeAuthor);

        resultsDiv.appendChild(recipeDiv);
    });
}

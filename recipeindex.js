const apiKey = 'ee055035371842639c3a3ed8b74e0390';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        fetchCategoryRecipes(category);
    }
});

function fetchCategoryRecipes(category) {
    showLoadingIndicator();
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${category}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCategoryRecipes(data.results);
            hideLoadingIndicator();
        })
        .catch(error => {
            console.error('Error fetching category recipe details:', error);
            hideLoadingIndicator();
        });
}

function displayCategoryRecipes(recipes) {
    const resultsDiv = document.getElementById('recipe-category-results');
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
        
        // Add error handling for image loading
        recipeImage.onerror = () => {
            recipeImage.src = 'path/to/fallback-image.jpg'; // Use a fallback image if the image fails to load
        };
        
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

function showLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'block';
}

function hideLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'none';
}

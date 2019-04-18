/*

HELPFUL LINKS:
    -   Yummly API Documentation: https://developer.yummly.com/documentation
    -   Visual Inspo: https://www.loveandlemons.com/

*/


'use strict';

//Sets up the Yummly API key and base URL for use later.
const foodAPIKey = 'aadffa2b9aa15de8d665d0e2fc535945';
const foodAPIId = '395836df';
const searchRecipesURL = 'http://api.yummly.com/v1/api/recipes';

//Converts the searchParams object into URL format. 
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Will display food search results in the DOM.
//Also hyperlinks to recipe page on source website in a new tab.
function displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo) {
    console.log(responseJsonYummlyOne, responseJsonYummlyTwo);
    $('#js-recipe-results-list').empty();
    for(let i=0; i<responseJsonYummlyOne.matches.length; i++) {
        $('#js-recipe-results-list').append(
            `<li><img src="${responseJsonYummlyOne.matches[i].smallImageUrls}" class="results-imgs">
            <h4><a href="${responseJsonYummlyTwo.attribution[i].url}" target="_blank">${responseJsonYummlyOne.matches[i].recipeName}</a></h4>`
        )};
    $('#results').removeClass('hidden');
}

//Search Recipes GET request to the Yummly API.
function searchRecipes(query) {
    const searchParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        q: query,
    };
    const searchRecipesQueryString = formatQueryParamsSearchRecipes(searchParams);
    const searchURL = searchRecipesURL + '?' + searchRecipesQueryString;
    console.log(searchURL);
    fetch (searchURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonYummlyOne => displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

//Get Recipes GET request to the Yummly API.
function getRecipes() {
    let recipeID = `${responseJsonYummlyOne.matches[i].id}`
    console.log();
    fetch (`http://api.yummly.com/v1/api/recipe/recipe-id?${recipeID}_app_id=${foodAPIId}&_app_key=${foodAPIKey}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonYummlyTwo => displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
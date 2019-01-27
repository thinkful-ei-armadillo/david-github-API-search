'use strict';
/* global $ */


function sendRequest(URI){
  fetch(URI)
    .then(response => response.json())
    .then(data => displayResults(data));
}

function displayResults(data){
  const nameAndUrl = data.map(item => [item.name, item.html_url]);
  const HtmlString = generateHTML(nameAndUrl);
  $('.results').html(HtmlString);
}

function generateQueryString(userSearch){
  return `https://api.github.com/users/${userSearch}/repos`;
}

function generateHTML(results){
  console.log(results);
  const endHtml = results.map(element => {
    return `<li> Repo name: ${element[0]} <br> <pre><a href="${element[1]}">${element[1]}</a></li>`;
  });
  return endHtml;
}

function handleSearch(){
  $('.js-search-form').on('submit', function(event){
    event.preventDefault();
    const userSearch = $('#account-name').val();
    sendRequest(generateQueryString(userSearch));
  });
}

function main(){
  handleSearch();
}

$(main);
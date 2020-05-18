'use strict';

function displayNews(responseJson) {
  console.log(responseJson);
  $('.results-news').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('.results-news').append(
      `<div class="newsArticle"><p><a href="${responseJson[i].url}" target="_blank" class="headlineLink">${responseJson[i].headline}</a></p>
      <p class="source">Source: ${responseJson[i].source}</p>
      <img src='${responseJson[i].image}' class="newsImages" alt="Image of News Headline"></div>`
    )};
    window.location.href = '#about';
}

function displayStatistics(responseJson) {
  console.log(responseJson);
  $('.high').empty();
  $('.high').text(`${responseJson.quote.high}`);
  $('.low').text(`${responseJson.quote.low}`);
  $('.open').text(`${responseJson.quote.open}`);
  $('.close').text(`${responseJson.quote.close}`);
  $('.change').text(`${responseJson.quote.change}`);
  $('.changePercent').text(`${responseJson.quote.changePercent}`);
  $('.volume').text(`${responseJson.quote.volume}`);
  $('.previousVolume').text(`${responseJson.quote.previousVolume}`);
  $('.52WeekHigh').text(`${responseJson.quote.week52High}`);
  $('.52WeekLow').text(`${responseJson.quote.week52Low}`);
}

function displayCompanyInfo(responseJson) {
  console.log(responseJson);
  $('.results-companyInfo').empty();
  $('.results-companyInfo').append(`<p>Ticker Symbol: ${responseJson.symbol}</p><p>Company Name: ${responseJson.companyName}</p><p>CEO: ${responseJson.CEO}</p><p>Sector: ${responseJson.sector}</p><p>Description: ${responseJson.description}</p>`);
}

function displaySectorPerformance(responseJson) {
  let entries = Object.entries(responseJson['Rank F: Year-to-Date (YTD) Performance']);
  console.log(responseJson);
  $('.results-sectPerformance').empty();
  for (let i = 0; i < entries.length; i++){
    $('.results-sectPerformance').append(`<li>${entries[i][0]}: <span>${entries[i][1]}</span></li>`);
  };
}

function getNews(ticker) {
  let urlNews = `https://cloud.iexapis.com/v1/stock/${ticker}/news/last?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlNews);
  fetch(urlNews)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayNews(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getStatistics(ticker) {
  let urlStats = `https://cloud.iexapis.com/v1/stock/${ticker}/book?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlStats);
  fetch(urlStats)
   .then(response => {
     if (response.ok) {
       getSectorPerformance();
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayStatistics(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getCompany(ticker) {
  let urlCompany = `https://cloud.iexapis.com/v1/stock/${ticker}/company?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlCompany);
  fetch(urlCompany)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayCompanyInfo(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getSectorPerformance() {
    let urlSectorPerformance = 'https://www.alphavantage.co/query?function=SECTOR&apikey=apiKey_ALPHA';
    console.log(urlSectorPerformance);
    fetch(urlSectorPerformance)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displaySectorPerformance(responseJson))
      .catch(error => alert('Something went wrong'));
  }

function watchForm() {
  $('form').on('click', '.search', function (event) {
    event.preventDefault();
    $('.hidden').removeClass();
    const searchTicker = $('#js-search-ticker').val();
    getCompany(searchTicker);
    getStatistics(searchTicker);
    getNews(searchTicker);
  });
}

$(watchForm);
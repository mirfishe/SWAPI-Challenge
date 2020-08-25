
const baseURL = "https://swapi.dev/api/";
const filmsURL = "https://swapi.dev/api/films/";
const peopleURL = "https://swapi.dev/api/people/";
const planetsURL = "https://swapi.dev/api/planets/";
const starshipsURL = "https://swapi.dev/api/starships/";
const speciesURL = "https://swapi.dev/api/species/";
const vehiclesURL = "https://swapi.dev/api/vehicles/";

const btnFilms = document.getElementById("btnFilms");
const btnPeople = document.getElementById("btnPeople");
const btnPlanets = document.getElementById("btnPlanets");
const btnStarships = document.getElementById("btnStarships");
const btnSpecies = document.getElementById("btnSpecies");
const btnVehicles = document.getElementById("btnVehicles");

// btnFilms.addEventListener('click', getFlms);
// btnPeople.addEventListener('click', getPeople); 
// btnPlanets.addEventListener('click', getPlanets);
// btnStarships.addEventListener('click', getStarships);
// btnSpecies.addEventListener('click', getSpecies);
// btnVehicles.addEventListener('click', getVehicles);
btnFilms.addEventListener('click', getResults);
btnPeople.addEventListener('click', getResults); 
btnPlanets.addEventListener('click', getResults);
btnStarships.addEventListener('click', getResults);
btnSpecies.addEventListener('click', getResults);
btnVehicles.addEventListener('click', getResults);

const txtSearch = document.getElementById("txtSearch");
const ddSearchCategories = document.getElementById("ddSearchCategories");

const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("frmSearch");
searchForm.addEventListener('submit', getResults); 


const errorHeader = document.getElementById("errorHeader");
// const resultsHeader = document.getElementById("h2Results");

const resultsDiv = document.getElementById("resultsDiv");
// const moreDiv = document.getElementById("moreDiv");

// moreDiv.style.display = "none";
resultsDiv.style.display = "none";
// resultsHeader.style.display = "none";
errorHeader.style.display = "none";


// ####################################
// BEGIN Code For Testing

let runTestCode = false;
// runTestCode = true;

if (runTestCode) {

  let testURL = peopleURL;
  let resultPageCount = 2;

  testURL = "http://swapi.dev/api/people/?page=" + resultPageCount;

  // for (let i = 0; i < 3; i++) {

  fetch(testURL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      console.log(jsonData);
      resultPageCount++;
      testURL = "http://swapi.dev/api/people/?page=" + resultPageCount;
      // testURL = "http://swapi.dev/api/people/" + resultPageCount; // Not Correct
      console.log(testURL);
      // testURL = jsonData.next;
      // displayPeople(jsonData);
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

  // };

};

// END Code For Testing
// ####################################

let URL = "";
let searchType = "";
let searchString = "";
let currentPage = 0;
let lastPage = 0;

// Get the results after the search
function getResults(e){
  e.preventDefault();
  // console.log(e);

  while (resultsDiv.firstChild) { // while the value is not null
    resultsDiv.removeChild(resultsDiv.firstChild);
  };

  // resultsHeader.style.display = "none";
  resultsDiv.style.display = "none";
  errorHeader.style.display = "none";
  // moreDiv.style.display = "none";
  // moreLink.style.display = "none";

  URL = "";
  searchString = "";
  
  currentPage = 0;
  lastPage = 0;

  // if (e.srcElement.id === "btnPeople") {
  //   URL = peopleURL;
  // };

  if (e.srcElement.id === "frmSearch") {
    switch (ddSearchCategories.value) {
      case "Films":
        URL = filmsURL;
        searchType = "films";
          break;
      case "People":
        URL = peopleURL;
        searchType = "people";
          break;
      case "Planets":
        URL = planetsURL;
        searchType = "planets";
          break;
      case "Starships":
        URL = starshipsURL;
        searchType = "starships";
          break;
      case "Species":
        URL = speciesURL;
        searchType = "species";
          break;
      case "Vehicles":
        URL = vehiclesURL;
        searchType = "vehicles";
          break;
      default:
        URL = baseURL;
    };
  } else {
    switch (e.srcElement.id) {
      case "btnFilms":
        URL = filmsURL;
        searchType = "films";
          break;
      case "btnPeople":
        URL = peopleURL;
        searchType = "people";
          break;
      case "btnPlanets":
        URL = planetsURL;
        searchType = "planets";
          break;
      case "btnStarships":
        URL = starshipsURL;
        searchType = "starships";
          break;
      case "btnSpecies":
        URL = speciesURL;
        searchType = "species";
          break;
      case "btnVehicles":
        URL = vehiclesURL;
        searchType = "vehicles";
          break;
      default:
        URL = baseURL;
    };
  };

  if (txtSearch.value.length > 0) {
    searchString = "?search=" + txtSearch.value.replace(' ', '%20');
  };

  URL += searchString;

  fetch(URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);

      if (e.srcElement.id === "frmSearch") {
        switch (ddSearchCategories.value) {
          case "Films":
            displayFilms(jsonData);
              break;
          case "People":
            displayPeople(jsonData);
              break;
          case "Planets":
            displayPlanets(jsonData);
              break;
          case "Starships":
            displayStarships(jsonData);
              break;
          case "Species":
            displaySpecies(jsonData);
              break;
          case "Vehicles":
            displayVehicles(jsonData);
              break;
          default:
            // URL = baseURL;
        };
      } else {
      switch (e.srcElement.id) {
        case "btnFilms":
          displayFilms(jsonData);
            break;
        case "btnPeople":
            displayPeople(jsonData);
            break;
        case "btnPlanets":
          displayPlanets(jsonData);
            break;
        case "btnStarships":
          displayStarships(jsonData);
            break;
        case "btnSpecies":
          displaySpecies(jsonData);
            break;
        case "btnVehicles":
          displayVehicles(jsonData);
            break;
        default:
          // URL = baseURL;
      };
    };
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

};



function displayFilms(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
          // console.log(results[i]);

          let cardDiv = document.createElement("div");
          cardDiv.className = "card";

          let cardBodyDiv = document.createElement("div");
          cardBodyDiv.className = "card-body";

          let titleP = document.createElement("p");
          titleP.innerHTML = "<strong>" + results[i].title + "</strong>";

          let directorP = document.createElement("p");
          directorP.innerHTML = "Director: " + results[i].director;

          let producerP = document.createElement("p");
          producerP.innerHTML = "Producer(s): " + results[i].producer;

          let episodeIdP = document.createElement("p");
          episodeIdP.innerHTML = "Episode ID: " + results[i].episode_id;

          let releaseDate = new Date(results[i].release_date);
          let releaseDateP = document.createElement("p");
          releaseDateP.innerHTML = "Release Date " + releaseDate.toDateString();

          let openingCrawlP = document.createElement("p");
          // openingCrawlP.innerHTML = "Opening Crawl: " + results[i].opening_crawl;
          openingCrawlP.innerHTML = results[i].opening_crawl;


          cardBodyDiv.appendChild(titleP);
          cardBodyDiv.appendChild(directorP);
          cardBodyDiv.appendChild(producerP);
          cardBodyDiv.appendChild(episodeIdP);
          cardBodyDiv.appendChild(releaseDateP);
          cardBodyDiv.appendChild(openingCrawlP);

          cardDiv.appendChild(cardBodyDiv);
          resultsRowDiv.appendChild(cardDiv);
    };

    let moreA = document.createElement("a");
    moreA.href = "#";
    // moreA.innerText =  "more " + txtSearch.value + " wallpapers";
    moreA.innerText =  "more";
    moreA.className = "colorBlackLink";
    // moreA.style = "text-align: right;";
    moreA.addEventListener('click', getMoreResults); 
  
  
    let moreRowDiv = document.createElement("div");
    moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
    moreRowDiv.id = "moreRowDiv";
  
    // let moreColOneDiv = document.createElement("div");
    // moreColOneDiv.className = "col-md-11";
  
    let moreColTwoDiv = document.createElement("div");
    // moreColTwoDiv.className = "col-md-4";
    moreColTwoDiv.className = "col-md-auto text-right";
  
    moreColTwoDiv.appendChild(moreA);
  
    // moreRowDiv.appendChild(moreColOneDiv);
    moreRowDiv.appendChild(moreColTwoDiv);
    //resultsDiv.appendChild(moreRowDiv);
  
    resultsContainerDiv.appendChild(resultsRowDiv);
    resultsContainerDiv.appendChild(moreRowDiv);
  
    if (currentPage >= lastPage) {
      resultsContainerDiv.removeChild(moreRowDiv)
    };
    
    resultsDiv.appendChild(resultsContainerDiv);

  };

};

function displayPeople(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
          // console.log(results[i]);

          let cardDiv = document.createElement("div");
          cardDiv.className = "card";

          let cardBodyDiv = document.createElement("div");
          cardBodyDiv.className = "card-body";

          let nameP = document.createElement("p");
          nameP.innerHTML = "<strong>" + results[i].name + "</strong>";

          let birthYearP = document.createElement("p");
          birthYearP.innerHTML = "Birth Year: " + results[i].birth_year;

          let eyeColorP = document.createElement("p");
          eyeColorP.innerHTML = "Eye Color: " + results[i].eye_color;

          let genderP = document.createElement("p");
          genderP.innerHTML = "Gender: " + results[i].gender;

          let hairColorP = document.createElement("p");
          hairColorP.innerHTML = "Hair Color: " + results[i].hair_color;

          let heightP = document.createElement("p");
          heightP.innerHTML = "Height: " + results[i].height;

          let massP = document.createElement("p");
          massP.innerHTML = "Mass: " + results[i].mass;

          let skinColorP = document.createElement("p");
          skinColorP.innerHTML = "Skin Color: " + results[i].skin_color;

          let homeworldP = document.createElement("p");
          homeworldP.innerHTML = "Homeworld: " + results[i].homeworld;


          cardBodyDiv.appendChild(nameP);
          cardBodyDiv.appendChild(birthYearP);
          cardBodyDiv.appendChild(eyeColorP);
          cardBodyDiv.appendChild(genderP);
          cardBodyDiv.appendChild(hairColorP);
          cardBodyDiv.appendChild(heightP);
          cardBodyDiv.appendChild(massP);
          cardBodyDiv.appendChild(skinColorP);
          cardBodyDiv.appendChild(homeworldP);

          cardDiv.appendChild(cardBodyDiv);
          resultsRowDiv.appendChild(cardDiv);
    };

    let moreA = document.createElement("a");
    moreA.href = "#";
    // moreA.innerText =  "more " + txtSearch.value + " wallpapers";
    moreA.innerText =  "more";
    moreA.className = "colorBlackLink";
    // moreA.style = "text-align: right;";
    moreA.addEventListener('click', getMoreResults); 
  
  
    let moreRowDiv = document.createElement("div");
    moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
    moreRowDiv.id = "moreRowDiv";
  
    // let moreColOneDiv = document.createElement("div");
    // moreColOneDiv.className = "col-md-11";
  
    let moreColTwoDiv = document.createElement("div");
    // moreColTwoDiv.className = "col-md-4";
    moreColTwoDiv.className = "col-md-auto text-right";
  
    moreColTwoDiv.appendChild(moreA);
  
    // moreRowDiv.appendChild(moreColOneDiv);
    moreRowDiv.appendChild(moreColTwoDiv);
    //resultsDiv.appendChild(moreRowDiv);
  
    resultsContainerDiv.appendChild(resultsRowDiv);
    resultsContainerDiv.appendChild(moreRowDiv);
  
    if (currentPage >= lastPage) {
      resultsContainerDiv.removeChild(moreRowDiv)
    };
    
    resultsDiv.appendChild(resultsContainerDiv);

  };

};

function displayPlanets(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i]);

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      let nameP = document.createElement("p");
      nameP.innerHTML = "<strong>" + results[i].name + "</strong>";

      let climateP = document.createElement("p");
      climateP.innerHTML = "Climate: " + results[i].climate;

      let diameterP = document.createElement("p");
      diameterP.innerHTML = "Diameter: " + results[i].diameter;

      let gravityP = document.createElement("p");
      gravityP.innerHTML = "Gravity: " + results[i].gravity;

      let orbitalPeriodP = document.createElement("p");
      orbitalPeriodP.innerHTML = "orbital Period: " + results[i].orbital_period;

      let populationP = document.createElement("p");
      populationP.innerHTML = "Population: " + results[i].population;

      let rotationPeriodP = document.createElement("p");
      rotationPeriodP.innerHTML = "Rotation Period: " + results[i].rotation_period;

      let surfaceWaterP = document.createElement("p");
      surfaceWaterP.innerHTML = "Surface Water: " + results[i].surface_water;

      let terrainP = document.createElement("p");
      terrainP.innerHTML = "Terrain: " + results[i].terrain;


      cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(climateP);
      cardBodyDiv.appendChild(diameterP);
      cardBodyDiv.appendChild(gravityP);
      cardBodyDiv.appendChild(orbitalPeriodP);
      cardBodyDiv.appendChild(populationP);
      cardBodyDiv.appendChild(rotationPeriodP);
      cardBodyDiv.appendChild(surfaceWaterP);
      cardBodyDiv.appendChild(terrainP);

      cardDiv.appendChild(cardBodyDiv);
      resultsRowDiv.appendChild(cardDiv);
};

let moreA = document.createElement("a");
moreA.href = "#";
// moreA.innerText =  "more " + txtSearch.value + " wallpapers";
moreA.innerText =  "more";
moreA.className = "colorBlackLink";
// moreA.style = "text-align: right;";
moreA.addEventListener('click', getMoreResults); 


let moreRowDiv = document.createElement("div");
moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
moreRowDiv.id = "moreRowDiv";

// let moreColOneDiv = document.createElement("div");
// moreColOneDiv.className = "col-md-11";

let moreColTwoDiv = document.createElement("div");
// moreColTwoDiv.className = "col-md-4";
moreColTwoDiv.className = "col-md-auto text-right";

moreColTwoDiv.appendChild(moreA);

// moreRowDiv.appendChild(moreColOneDiv);
moreRowDiv.appendChild(moreColTwoDiv);
//resultsDiv.appendChild(moreRowDiv);

resultsContainerDiv.appendChild(resultsRowDiv);
resultsContainerDiv.appendChild(moreRowDiv);

if (currentPage >= lastPage) {
  resultsContainerDiv.removeChild(moreRowDiv)
};

resultsDiv.appendChild(resultsContainerDiv);

  };

};

function displayStarships(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i]);

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      let nameP = document.createElement("p");
      nameP.innerHTML = "<strong>" + results[i].name + "</strong>";

      let MGLTP = document.createElement("p");
      MGLTP.innerHTML = "MGLT: " + results[i].MGLT;

      let cargoCapacityP = document.createElement("p");
      cargoCapacityP.innerHTML = "Cargo Capacity: " + results[i].cargo_capacity;

      let consumablesP = document.createElement("p");
      consumablesP.innerHTML = "Consumables: " + results[i].consumables;

      let costInCreditsP = document.createElement("p");
      costInCreditsP.innerHTML = "Cost In Credits: " + results[i].cost_in_credits;

      let crewP = document.createElement("p");
      crewP.innerHTML = "Crew: " + results[i].crew;

      let hyperdriveRatingP = document.createElement("p");
      hyperdriveRatingP.innerHTML = "Hyperdrive Rating: " + results[i].hyperdrive_rating;

      let lengthP = document.createElement("p");
      lengthP.innerHTML = "Length: " + results[i].length;

      let manufacturerP = document.createElement("p");
      manufacturerP.innerHTML = "Manufacturer: " + results[i].manufacturer;

      let maxAtmospheringSpeedP = document.createElement("p");
      maxAtmospheringSpeedP.innerHTML = "Max Atmosphering Speed: " + results[i].max_atmosphering_speed;

      let modelP = document.createElement("p");
      modelP.innerHTML = "Model: " + results[i].model;

      let passengersP = document.createElement("p");
      passengersP.innerHTML = "Passengers: " + results[i].passengers;

      let starshipClassP = document.createElement("p");
      starshipClassP.innerHTML = "Starship Class: " + results[i].starship_class;


      cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(MGLTP);
      cardBodyDiv.appendChild(cargoCapacityP);
      cardBodyDiv.appendChild(consumablesP);
      cardBodyDiv.appendChild(costInCreditsP);
      cardBodyDiv.appendChild(crewP);
      cardBodyDiv.appendChild(hyperdriveRatingP);
      cardBodyDiv.appendChild(lengthP);
      cardBodyDiv.appendChild(manufacturerP);
      cardBodyDiv.appendChild(maxAtmospheringSpeedP);
      cardBodyDiv.appendChild(modelP);
      cardBodyDiv.appendChild(passengersP);
      cardBodyDiv.appendChild(starshipClassP);

      cardDiv.appendChild(cardBodyDiv);
      resultsRowDiv.appendChild(cardDiv);
};

let moreA = document.createElement("a");
moreA.href = "#";
// moreA.innerText =  "more " + txtSearch.value + " wallpapers";
moreA.innerText =  "more";
moreA.className = "colorBlackLink";
// moreA.style = "text-align: right;";
moreA.addEventListener('click', getMoreResults); 


let moreRowDiv = document.createElement("div");
moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
moreRowDiv.id = "moreRowDiv";

// let moreColOneDiv = document.createElement("div");
// moreColOneDiv.className = "col-md-11";

let moreColTwoDiv = document.createElement("div");
// moreColTwoDiv.className = "col-md-4";
moreColTwoDiv.className = "col-md-auto text-right";

moreColTwoDiv.appendChild(moreA);

// moreRowDiv.appendChild(moreColOneDiv);
moreRowDiv.appendChild(moreColTwoDiv);
//resultsDiv.appendChild(moreRowDiv);

resultsContainerDiv.appendChild(resultsRowDiv);
resultsContainerDiv.appendChild(moreRowDiv);

if (currentPage >= lastPage) {
  resultsContainerDiv.removeChild(moreRowDiv)
};

resultsDiv.appendChild(resultsContainerDiv);

  };

};

function displaySpecies(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i]);

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      let nameP = document.createElement("p");
      nameP.innerHTML = "<strong>" + results[i].name + "</strong>";

      let averageHeightP = document.createElement("p");
      averageHeightP.innerHTML = "Average Height: " + results[i].average_height;

      let averageLifespanP = document.createElement("p");
      averageLifespanP.innerHTML = "Average Lifespan: " + results[i].average_lifespan;

      let classificationP = document.createElement("p");
      classificationP.innerHTML = "Classification: " + results[i].classification;

      let designationP = document.createElement("p");
      designationP.innerHTML = "Designation: " + results[i].designation;

      let eyeColorsP = document.createElement("p");
      eyeColorsP.innerHTML = "Eye Colors: " + results[i].eye_colors;

      let hairColorsP = document.createElement("p");
      hairColorsP.innerHTML = "Hair Colors: " + results[i].hair_colors;

      let homeworldP = document.createElement("p");
      homeworldP.innerHTML = "Homeworld: " + results[i].homeworld;

      let languageP = document.createElement("p");
      languageP.innerHTML = "Language: " + results[i].language;

      let skinColorsP = document.createElement("p");
      skinColorsP.innerHTML = "Skin Colors: " + results[i].skin_colors;


      cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(averageHeightP);
      cardBodyDiv.appendChild(averageLifespanP);
      cardBodyDiv.appendChild(classificationP);
      cardBodyDiv.appendChild(designationP);
      cardBodyDiv.appendChild(eyeColorsP);
      cardBodyDiv.appendChild(hairColorsP);
      cardBodyDiv.appendChild(homeworldP);
      cardBodyDiv.appendChild(languageP);
      cardBodyDiv.appendChild(skinColorsP);

      cardDiv.appendChild(cardBodyDiv);
      resultsRowDiv.appendChild(cardDiv);
};

let moreA = document.createElement("a");
moreA.href = "#";
// moreA.innerText =  "more " + txtSearch.value + " wallpapers";
moreA.innerText =  "more";
moreA.className = "colorBlackLink";
// moreA.style = "text-align: right;";
moreA.addEventListener('click', getMoreResults); 


let moreRowDiv = document.createElement("div");
moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
moreRowDiv.id = "moreRowDiv";

// let moreColOneDiv = document.createElement("div");
// moreColOneDiv.className = "col-md-11";

let moreColTwoDiv = document.createElement("div");
// moreColTwoDiv.className = "col-md-4";
moreColTwoDiv.className = "col-md-auto text-right";

moreColTwoDiv.appendChild(moreA);

// moreRowDiv.appendChild(moreColOneDiv);
moreRowDiv.appendChild(moreColTwoDiv);
//resultsDiv.appendChild(moreRowDiv);

resultsContainerDiv.appendChild(resultsRowDiv);
resultsContainerDiv.appendChild(moreRowDiv);

if (currentPage >= lastPage) {
  resultsContainerDiv.removeChild(moreRowDiv)
};

resultsDiv.appendChild(resultsContainerDiv);

  };

};

function displayVehicles(jsonData){
  console.log(jsonData);

  let results = jsonData.results;
  // console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    // lastPage = 4; // jsonData.info.pages; // Need to pull this from the data
    // Really just using the next page value as the last page because it isn't supplied in the API
    // Could calculate the lastPage by jsonData.count/10 and +1 if there is a remainder
    if (jsonData.next !== "" && jsonData.next !== null) {
      lastPage = parseInt(jsonData.next.match(/page=(\d+)/)[1]);
    };
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };
    
    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row justify-content-center";

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i]);

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      let nameP = document.createElement("p");
      nameP.innerHTML = "<strong>" + results[i].name + "</strong>";

      let MGLTP = document.createElement("p");
      MGLTP.innerHTML = "MGLT: " + results[i].MGLT;

      let cargoCapacityP = document.createElement("p");
      cargoCapacityP.innerHTML = "Cargo Capacity: " + results[i].cargo_capacity;

      let consumablesP = document.createElement("p");
      consumablesP.innerHTML = "Consumables: " + results[i].consumables;

      let costInCreditsP = document.createElement("p");
      costInCreditsP.innerHTML = "Cost In Credits: " + results[i].cost_in_credits;

      let crewP = document.createElement("p");
      crewP.innerHTML = "Crew: " + results[i].crew;

      let lengthP = document.createElement("p");
      lengthP.innerHTML = "Length: " + results[i].length;

      let manufacturerP = document.createElement("p");
      manufacturerP.innerHTML = "Manufacturer: " + results[i].manufacturer;

      let maxAtmospheringSpeedP = document.createElement("p");
      maxAtmospheringSpeedP.innerHTML = "Max Atmosphering Speed: " + results[i].max_atmosphering_speed;

      let modelP = document.createElement("p");
      modelP.innerHTML = "Model: " + results[i].model;

      let passengersP = document.createElement("p");
      passengersP.innerHTML = "Passengers: " + results[i].passengers;

      let vehicle_classP = document.createElement("p");
      vehicle_classP.innerHTML = "Vehicle Class: " + results[i].vehicle_class;


      cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(MGLTP);
      cardBodyDiv.appendChild(cargoCapacityP);
      cardBodyDiv.appendChild(consumablesP);
      cardBodyDiv.appendChild(costInCreditsP);
      cardBodyDiv.appendChild(crewP);
      cardBodyDiv.appendChild(lengthP);
      cardBodyDiv.appendChild(manufacturerP);
      cardBodyDiv.appendChild(maxAtmospheringSpeedP);
      cardBodyDiv.appendChild(modelP);
      cardBodyDiv.appendChild(passengersP);
      cardBodyDiv.appendChild(vehicle_classP);

      cardDiv.appendChild(cardBodyDiv);
      resultsRowDiv.appendChild(cardDiv);
};

let moreA = document.createElement("a");
moreA.href = "#";
// moreA.innerText =  "more " + txtSearch.value + " wallpapers";
moreA.innerText =  "more";
moreA.className = "colorBlackLink";
// moreA.style = "text-align: right;";
moreA.addEventListener('click', getMoreResults); 


let moreRowDiv = document.createElement("div");
moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
moreRowDiv.id = "moreRowDiv";

// let moreColOneDiv = document.createElement("div");
// moreColOneDiv.className = "col-md-11";

let moreColTwoDiv = document.createElement("div");
// moreColTwoDiv.className = "col-md-4";
moreColTwoDiv.className = "col-md-auto text-right";

moreColTwoDiv.appendChild(moreA);

// moreRowDiv.appendChild(moreColOneDiv);
moreRowDiv.appendChild(moreColTwoDiv);
//resultsDiv.appendChild(moreRowDiv);

resultsContainerDiv.appendChild(resultsRowDiv);
resultsContainerDiv.appendChild(moreRowDiv);

if (currentPage >= lastPage) {
  resultsContainerDiv.removeChild(moreRowDiv)
};

resultsDiv.appendChild(resultsContainerDiv);

  };

};

function getMoreResults(e){
  e.preventDefault();
  // console.log(e);

  nextPage = currentPage + 1;

  // Removes ?page=# to the URL
  if (URL.includes("?page=")) {
    URL = URL.slice(0, -7)
    // console.log(URL);
  } else if (URL.includes("&page=")) {
    URL = URL.slice(0, -7)
    // console.log(URL);
  };

  if (URL.includes("?")) {
    // console.log(URL);

    // Search Pagination
    URL = URL + "&page=" + nextPage;
  } else {
    // console.log(URL);

    // Search Pagination
    URL = URL + "?page=" + nextPage;
  };

  // Keeps adding ?page= to the URL
  // Fixed
  console.log(URL);

 

  fetch(URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);

      switch (searchType) {
          case "films":
            displayFilms(jsonData);
              break;
          case "people":
            displayPeople(jsonData);
              break;
          case "planets":
            displayPlanets(jsonData);
              break;
          case "starships":
            displayStarships(jsonData);
              break;
          case "species":
            displaySpecies(jsonData);
              break;
          case "vehicles":
            displayVehicles(jsonData);
              break;
          default:
            // URL = baseURL;
        };

  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });
  
};


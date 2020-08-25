
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

          // let titleP = document.createElement("p");
          // titleP.innerHTML = "<strong>" + results[i].title + "</strong>";
          let titleLink = document.createElement("a");
          titleLink.href = results[i].url;
          titleLink.alt = results[i].title;
          titleLink.innerHTML = results[i].title;
          // titleLink.target = "_blank";
          titleLink.addEventListener('click', loadDetailsModal);

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


          let charactersArray = results[i].characters;
          let charactersP = document.createElement("p");
          charactersP.innerHTML = "Characters: ";
          for (let j = 0; j < charactersArray.length; j++) {
            // charactersP.innerHTML += charactersArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = charactersArray[j];
            urlLink.alt = charactersArray[j];
            urlLink.innerHTML = charactersArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < charactersArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            charactersP.appendChild(urlLink);
            // if (j < charactersArray.length - 1) {
            //   charactersP.innerHTML += ", ";
            // };
          };

          let planetsArray = results[i].planets;
          let planetsP = document.createElement("p");
          planetsP.innerHTML = "Planets: ";
          for (let j = 0; j < planetsArray.length; j++) {
            // planetsP.innerHTML += planetsArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = planetsArray[j];
            urlLink.alt = planetsArray[j];
            urlLink.innerHTML = planetsArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < planetsArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            planetsP.appendChild(urlLink);
            // if (j < planetsArray.length - 1) {
            //   planetsP.innerHTML += ", ";
            // };
          };

          let speciesArray = results[i].species;
          let speciesP = document.createElement("p");
          speciesP.innerHTML = "Species: ";
          for (let j = 0; j < speciesArray.length; j++) {
            // speciesP.innerHTML += speciesArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = speciesArray[j];
            urlLink.alt = speciesArray[j];
            urlLink.innerHTML = speciesArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < speciesArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            speciesP.appendChild(urlLink);
            // if (j < speciesArray.length - 1) {
            //   speciesP.innerHTML += ", ";
            // };
          };

          let starshipsArray = results[i].starships;
          let starshipsP = document.createElement("p");
          starshipsP.innerHTML = "Starships: ";
          for (let j = 0; j < starshipsArray.length; j++) {
            // starshipsP.innerHTML += starshipsArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = starshipsArray[j];
            urlLink.alt = starshipsArray[j];
            urlLink.innerHTML = starshipsArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < starshipsArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            starshipsP.appendChild(urlLink);
            // if (j < starshipsArray.length - 1) {
            //   starshipsP.innerHTML += ", ";
            // };
          };

          let vehiclesArray = results[i].vehicles;
          let vehiclesP = document.createElement("p");
          vehiclesP.innerHTML = "Vehicles: ";
          for (let j = 0; j < vehiclesArray.length; j++) {
            // vehiclesP.innerHTML += vehiclesArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = vehiclesArray[j];
            urlLink.alt = vehiclesArray[j];
            urlLink.innerHTML = vehiclesArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < vehiclesArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            vehiclesP.appendChild(urlLink);
            // if (j < vehiclesArray.length - 1) {
            //   vehiclesP.innerHTML += ", ";
            // };
          };


          // cardBodyDiv.appendChild(titleP);
          cardBodyDiv.appendChild(titleLink);
          cardBodyDiv.appendChild(directorP);
          cardBodyDiv.appendChild(producerP);
          cardBodyDiv.appendChild(episodeIdP);
          cardBodyDiv.appendChild(releaseDateP);
          cardBodyDiv.appendChild(openingCrawlP);

          cardBodyDiv.appendChild(charactersP);
          cardBodyDiv.appendChild(planetsP);
          cardBodyDiv.appendChild(speciesP);
          cardBodyDiv.appendChild(starshipsP);
          cardBodyDiv.appendChild(vehiclesP);

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

          // let nameP = document.createElement("p");
          // nameP.innerHTML = "<strong>" + results[i].name + "</strong>";
          let nameLink = document.createElement("a");
          nameLink.href = results[i].url;
          nameLink.alt = results[i].name;
          nameLink.innerHTML = results[i].name;
          // nameLink.target = "_blank";
          nameLink.addEventListener('click', loadDetailsModal);

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
          homeworldP.innerHTML = "Homeworld: "; // + results[i].homeworld;
          let homeworldLink = document.createElement("a");
          homeworldLink.href = results[i].homeworld;
          homeworldLink.alt = results[i].homeworld;
          homeworldLink.innerHTML = results[i].homeworld
          // homeworldLink.target = "_blank";
          homeworldLink.addEventListener('click', loadDetailsModal);
          homeworldP.appendChild(homeworldLink);


          let filmsArray = results[i].films;
          let filmsP = document.createElement("p");
          filmsP.innerHTML = "Films: ";
          for (let j = 0; j < filmsArray.length; j++) {
            // filmsP.innerHTML += filmsArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = filmsArray[j];
            urlLink.alt = filmsArray[j];
            urlLink.innerHTML = filmsArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < filmsArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            filmsP.appendChild(urlLink);
            // if (j < filmsArray.length - 1) {
            //   filmsP.innerHTML += ", ";
            // };
          };

          let starshipsArray = results[i].starships;
          let starshipsP = document.createElement("p");
          starshipsP.innerHTML = "Starships: ";
          for (let j = 0; j < starshipsArray.length; j++) {
            // starshipsP.innerHTML += starshipsArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = starshipsArray[j];
            urlLink.alt = starshipsArray[j];
            urlLink.innerHTML = starshipsArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < starshipsArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            starshipsP.appendChild(urlLink);
            // if (j < starshipsArray.length - 1) {
            //   starshipsP.innerHTML += ", ";
            // };
          };

          let vehiclesArray = results[i].vehicles;
          let vehiclesP = document.createElement("p");
          vehiclesP.innerHTML = "Vehicles: ";
          for (let j = 0; j < vehiclesArray.length; j++) {
            // vehiclesP.innerHTML += vehiclesArray[j];
            let urlLink = document.createElement("a");
            urlLink.href = vehiclesArray[j];
            urlLink.alt = vehiclesArray[j];
            urlLink.innerHTML = vehiclesArray[j];
            // urlLink.target = "_blank";
            urlLink.addEventListener('click', loadDetailsModal);

            if (j < vehiclesArray.length - 1) {
              urlLink.innerHTML += ", ";
            };

            vehiclesP.appendChild(urlLink);
            // if (j < vehiclesArray.length - 1) {
            //   vehiclesP.innerHTML += ", ";
            // };
          };

          // cardBodyDiv.appendChild(nameP);
          cardBodyDiv.appendChild(nameLink);
          cardBodyDiv.appendChild(birthYearP);
          cardBodyDiv.appendChild(eyeColorP);
          cardBodyDiv.appendChild(genderP);
          cardBodyDiv.appendChild(hairColorP);
          cardBodyDiv.appendChild(heightP);
          cardBodyDiv.appendChild(massP);
          cardBodyDiv.appendChild(skinColorP);
          cardBodyDiv.appendChild(homeworldP);

          cardBodyDiv.appendChild(filmsP);
          cardBodyDiv.appendChild(starshipsP);
          cardBodyDiv.appendChild(vehiclesP);

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

      // let nameP = document.createElement("p");
      // nameP.innerHTML = "<strong>" + results[i].name + "</strong>";
      let nameLink = document.createElement("a");
      nameLink.href = results[i].url;
      nameLink.alt = results[i].name;
      nameLink.innerHTML = results[i].name;
      // nameLink.target = "_blank";
      nameLink.addEventListener('click', loadDetailsModal);

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


      let filmsArray = results[i].films;
      let filmsP = document.createElement("p");
      filmsP.innerHTML = "Films: ";
      for (let j = 0; j < filmsArray.length; j++) {
        // filmsP.innerHTML += filmsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = filmsArray[j];
        urlLink.alt = filmsArray[j];
        urlLink.innerHTML = filmsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < filmsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        filmsP.appendChild(urlLink);
        // if (j < filmsArray.length - 1) {
        //   filmsP.innerHTML += ", ";
        // };
      };

      let residentsArray = results[i].residents;
      let residentsP = document.createElement("p");
      residentsP.innerHTML = "Residents: ";
      for (let j = 0; j < residentsArray.length; j++) {
        // residentsP.innerHTML += residentsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = residentsArray[j];
        urlLink.alt = residentsArray[j];
        urlLink.innerHTML = residentsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < residentsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        residentsP.appendChild(urlLink);
        // if (j < residentsArray.length - 1) {
        //   residentsP.innerHTML += ", ";
        // };
      };


      // cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(nameLink);
      cardBodyDiv.appendChild(climateP);
      cardBodyDiv.appendChild(diameterP);
      cardBodyDiv.appendChild(gravityP);
      cardBodyDiv.appendChild(orbitalPeriodP);
      cardBodyDiv.appendChild(populationP);
      cardBodyDiv.appendChild(rotationPeriodP);
      cardBodyDiv.appendChild(surfaceWaterP);
      cardBodyDiv.appendChild(terrainP);

      cardBodyDiv.appendChild(filmsP);
      cardBodyDiv.appendChild(residentsP);

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

      // let nameP = document.createElement("p");
      // nameP.innerHTML = "<strong>" + results[i].name + "</strong>";
      let nameLink = document.createElement("a");
      nameLink.href = results[i].url;
      nameLink.alt = results[i].name;
      nameLink.innerHTML = results[i].name;
      // nameLink.target = "_blank";
      nameLink.addEventListener('click', loadDetailsModal);

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


      let filmsArray = results[i].films;
      let filmsP = document.createElement("p");
      filmsP.innerHTML = "Films: ";
      for (let j = 0; j < filmsArray.length; j++) {
        // filmsP.innerHTML += filmsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = filmsArray[j];
        urlLink.alt = filmsArray[j];
        urlLink.innerHTML = filmsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < filmsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        filmsP.appendChild(urlLink);
        // if (j < filmsArray.length - 1) {
        //   filmsP.innerHTML += ", ";
        // };
      };

      let pilotsArray = results[i].pilots;
      let pilotsP = document.createElement("p");
      pilotsP.innerHTML = "Pilots: ";
      for (let j = 0; j < pilotsArray.length; j++) {
        // pilotsP.innerHTML += pilotsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = pilotsArray[j];
        urlLink.alt = pilotsArray[j];
        urlLink.innerHTML = pilotsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < pilotsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        pilotsP.appendChild(urlLink);
        // if (j < pilotsArray.length - 1) {
        //   pilotsP.innerHTML += ", ";
        // };
      };

      // cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(nameLink);
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

      cardBodyDiv.appendChild(filmsP);
      cardBodyDiv.appendChild(pilotsP);

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

      // let nameP = document.createElement("p");
      // nameP.innerHTML = "<strong>" + results[i].name + "</strong>";
      let nameLink = document.createElement("a");
      nameLink.href = results[i].url;
      nameLink.alt = results[i].name;
      nameLink.innerHTML = results[i].name;
      // nameLink.target = "_blank";
      nameLink.addEventListener('click', loadDetailsModal);

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


      let filmsArray = results[i].films;
      let filmsP = document.createElement("p");
      filmsP.innerHTML = "Films: ";
      for (let j = 0; j < filmsArray.length; j++) {
        // filmsP.innerHTML += filmsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = filmsArray[j];
        urlLink.alt = filmsArray[j];
        urlLink.innerHTML = filmsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < filmsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        filmsP.appendChild(urlLink);
        // if (j < filmsArray.length - 1) {
        //   filmsP.innerHTML += ", ";
        // };
      };

      let peopleArray = results[i].people;
      let peopleP = document.createElement("p");
      peopleP.innerHTML = "People: ";
      for (let j = 0; j < peopleArray.length; j++) {
        // peopleP.innerHTML += peopleArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = peopleArray[j];
        urlLink.alt = peopleArray[j];
        urlLink.innerHTML = peopleArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < peopleArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        peopleP.appendChild(urlLink);
        // if (j < peopleArray.length - 1) {
        //   peopleP.innerHTML += ", ";
        // };
      };

      // cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(nameLink);
      cardBodyDiv.appendChild(averageHeightP);
      cardBodyDiv.appendChild(averageLifespanP);
      cardBodyDiv.appendChild(classificationP);
      cardBodyDiv.appendChild(designationP);
      cardBodyDiv.appendChild(eyeColorsP);
      cardBodyDiv.appendChild(hairColorsP);
      cardBodyDiv.appendChild(homeworldP);
      cardBodyDiv.appendChild(languageP);
      cardBodyDiv.appendChild(skinColorsP);

      cardBodyDiv.appendChild(filmsP);
      cardBodyDiv.appendChild(peopleP);

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

      // let nameP = document.createElement("p");
      // nameP.innerHTML = "<strong>" + results[i].name + "</strong>";
      let nameLink = document.createElement("a");
      nameLink.href = results[i].url;
      nameLink.alt = results[i].name;
      nameLink.innerHTML = results[i].name;
      // nameLink.target = "_blank";
      nameLink.addEventListener('click', loadDetailsModal);

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


      let filmsArray = results[i].films;
      let filmsP = document.createElement("p");
      filmsP.innerHTML = "Films: ";
      for (let j = 0; j < filmsArray.length; j++) {
        // filmsP.innerHTML += filmsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = filmsArray[j];
        urlLink.alt = filmsArray[j];
        urlLink.innerHTML = filmsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < filmsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        filmsP.appendChild(urlLink);
        // if (j < filmsArray.length - 1) {
        //   filmsP.innerHTML += ", ";
        // };
      };

      let pilotsArray = results[i].pilots;
      let pilotsP = document.createElement("p");
      pilotsP.innerHTML = "Pilots: ";
      for (let j = 0; j < pilotsArray.length; j++) {
        // pilotsP.innerHTML += pilotsArray[j];
        let urlLink = document.createElement("a");
        urlLink.href = pilotsArray[j];
        urlLink.alt = pilotsArray[j];
        urlLink.innerHTML = pilotsArray[j];
        // urlLink.target = "_blank";
        urlLink.addEventListener('click', loadDetailsModal);

        if (j < pilotsArray.length - 1) {
          urlLink.innerHTML += ", ";
        };

        pilotsP.appendChild(urlLink);
        // if (j < pilotsArray.length - 1) {
        //   pilotsP.innerHTML += ", ";
        // };
      };

      // cardBodyDiv.appendChild(nameP);
      cardBodyDiv.appendChild(nameLink);
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

      cardBodyDiv.appendChild(filmsP);
      cardBodyDiv.appendChild(pilotsP);

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

function loadDetailsModal(e){
  e.preventDefault();

  console.log(e);
  let detailURL = e.srcElement.href;

  let detailCategory = detailURL;
  detailCategory = detailCategory.replace("https://swapi.dev/api/", "");
  detailCategory = detailCategory.replace("http://swapi.dev/api/", "");
  // detailCategory = detailCategory.substr(0,detailURL.lastIndexOf('/'));
  detailCategory = detailCategory.substr(0,detailCategory.indexOf('/'));
  console.log("detailCategory", detailCategory);


  fetch(detailURL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      console.log(jsonData);

      switch (detailCategory) {
        case "films":
          displayFilmsModal(jsonData);
            break;
        case "people":
          displayPeopleModal(jsonData);
            break;
        case "planets":
          displayPlanetsModal(jsonData);
            break;
        case "starships":
          displayStarshipsModal(jsonData);
            break;
        case "species":
          displaySpeciesModal(jsonData);
            break;
        case "vehicles":
          displayVehiclesModal(jsonData);
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

function displayFilmsModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;

  detailsModalTitle.innerHTML = "<strong>" + results.title + "</strong>";

  let directorP = document.createElement("p");
  directorP.innerHTML = "Director: " + results.director;

  let producerP = document.createElement("p");
  producerP.innerHTML = "Producer(s): " + results.producer;

  let episodeIdP = document.createElement("p");
  episodeIdP.innerHTML = "Episode ID: " + results.episode_id;

  let releaseDate = new Date(results.release_date);
  let releaseDateP = document.createElement("p");
  releaseDateP.innerHTML = "Release Date " + releaseDate.toDateString();

  let openingCrawlP = document.createElement("p");
  // openingCrawlP.innerHTML = "Opening Crawl: " + results[i].opening_crawl;
  openingCrawlP.innerHTML = results.opening_crawl;


  let charactersArray = results.characters;
  let charactersP = document.createElement("p");
  charactersP.innerHTML = "Characters: ";
  for (let j = 0; j < charactersArray.length; j++) {
    // charactersP.innerHTML += charactersArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = charactersArray[j];
    urlLink.alt = charactersArray[j];
    urlLink.innerHTML = charactersArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < charactersArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    charactersP.appendChild(urlLink);
    // if (j < charactersArray.length - 1) {
    //   charactersP.innerHTML += ", ";
    // };
  };

  let planetsArray = results.planets;
  let planetsP = document.createElement("p");
  planetsP.innerHTML = "Planets: ";
  for (let j = 0; j < planetsArray.length; j++) {
    // planetsP.innerHTML += planetsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = planetsArray[j];
    urlLink.alt = planetsArray[j];
    urlLink.innerHTML = planetsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < planetsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    planetsP.appendChild(urlLink);
    // if (j < planetsArray.length - 1) {
    //   planetsP.innerHTML += ", ";
    // };
  };

  let speciesArray = results.species;
  let speciesP = document.createElement("p");
  speciesP.innerHTML = "Species: ";
  for (let j = 0; j < speciesArray.length; j++) {
    // speciesP.innerHTML += speciesArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = speciesArray[j];
    urlLink.alt = speciesArray[j];
    urlLink.innerHTML = speciesArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < speciesArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    speciesP.appendChild(urlLink);
    // if (j < speciesArray.length - 1) {
    //   speciesP.innerHTML += ", ";
    // };
  };

  let starshipsArray = results.starships;
  let starshipsP = document.createElement("p");
  starshipsP.innerHTML = "Starships: ";
  for (let j = 0; j < starshipsArray.length; j++) {
    // starshipsP.innerHTML += starshipsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = starshipsArray[j];
    urlLink.alt = starshipsArray[j];
    urlLink.innerHTML = starshipsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < starshipsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    starshipsP.appendChild(urlLink);
    // if (j < starshipsArray.length - 1) {
    //   starshipsP.innerHTML += ", ";
    // };
  };

  let vehiclesArray = results.vehicles;
  let vehiclesP = document.createElement("p");
  vehiclesP.innerHTML = "Vehicles: ";
  for (let j = 0; j < vehiclesArray.length; j++) {
    // vehiclesP.innerHTML += vehiclesArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = vehiclesArray[j];
    urlLink.alt = vehiclesArray[j];
    urlLink.innerHTML = vehiclesArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < vehiclesArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    vehiclesP.appendChild(urlLink);
    // if (j < vehiclesArray.length - 1) {
    //   vehiclesP.innerHTML += ", ";
    // };
  };


  detailsModalBody.appendChild(directorP);
  detailsModalBody.appendChild(producerP);
  detailsModalBody.appendChild(episodeIdP);
  detailsModalBody.appendChild(releaseDateP);
  detailsModalBody.appendChild(openingCrawlP);

  detailsModalBody.appendChild(charactersP);
  detailsModalBody.appendChild(planetsP);
  detailsModalBody.appendChild(speciesP);
  detailsModalBody.appendChild(starshipsP);
  detailsModalBody.appendChild(vehiclesP);

  $('#detailsModal').modal("show");

};

function displayPeopleModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;
  // console.log(results);

  detailsModalTitle.innerHTML = "<strong>" + results.name + "</strong>";

  let birthYearP = document.createElement("p");
  birthYearP.innerHTML = "Birth Year: " + results.birth_year;

  let eyeColorP = document.createElement("p");
  eyeColorP.innerHTML = "Eye Color: " + results.eye_color;

  let genderP = document.createElement("p");
  genderP.innerHTML = "Gender: " + results.gender;

  let hairColorP = document.createElement("p");
  hairColorP.innerHTML = "Hair Color: " + results.hair_color;

  let heightP = document.createElement("p");
  heightP.innerHTML = "Height: " + results.height;

  let massP = document.createElement("p");
  massP.innerHTML = "Mass: " + results.mass;

  let skinColorP = document.createElement("p");
  skinColorP.innerHTML = "Skin Color: " + results.skin_color;

  let homeworldP = document.createElement("p");
  homeworldP.innerHTML = "Homeworld: " + results.homeworld;


  let filmsArray = results.films;
  let filmsP = document.createElement("p");
  filmsP.innerHTML = "Films: ";
  for (let j = 0; j < filmsArray.length; j++) {
    // filmsP.innerHTML += filmsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = filmsArray[j];
    urlLink.alt = filmsArray[j];
    urlLink.innerHTML = filmsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < filmsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    filmsP.appendChild(urlLink);
    // if (j < filmsArray.length - 1) {
    //   filmsP.innerHTML += ", ";
    // };
  };

  let starshipsArray = results.starships;
  let starshipsP = document.createElement("p");
  starshipsP.innerHTML = "Starships: ";
  for (let j = 0; j < starshipsArray.length; j++) {
    // starshipsP.innerHTML += starshipsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = starshipsArray[j];
    urlLink.alt = starshipsArray[j];
    urlLink.innerHTML = starshipsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < starshipsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    starshipsP.appendChild(urlLink);
    // if (j < starshipsArray.length - 1) {
    //   starshipsP.innerHTML += ", ";
    // };
  };

  let vehiclesArray = results.vehicles;
  let vehiclesP = document.createElement("p");
  vehiclesP.innerHTML = "Vehicles: ";
  for (let j = 0; j < vehiclesArray.length; j++) {
    // vehiclesP.innerHTML += vehiclesArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = vehiclesArray[j];
    urlLink.alt = vehiclesArray[j];
    urlLink.innerHTML = vehiclesArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < vehiclesArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    vehiclesP.appendChild(urlLink);
    // if (j < vehiclesArray.length - 1) {
    //   vehiclesP.innerHTML += ", ";
    // };
  };

  detailsModalBody.appendChild(birthYearP);
  detailsModalBody.appendChild(eyeColorP);
  detailsModalBody.appendChild(genderP);
  detailsModalBody.appendChild(hairColorP);
  detailsModalBody.appendChild(heightP);
  detailsModalBody.appendChild(massP);
  detailsModalBody.appendChild(skinColorP);
  detailsModalBody.appendChild(homeworldP);

  detailsModalBody.appendChild(filmsP);
  detailsModalBody.appendChild(starshipsP);
  detailsModalBody.appendChild(vehiclesP);

  $('#detailsModal').modal("show");

};

function displayPlanetsModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;
  // console.log(results);

  detailsModalTitle.innerHTML = "<strong>" + results.name + "</strong>";

  let climateP = document.createElement("p");
  climateP.innerHTML = "Climate: " + results.climate;

  let diameterP = document.createElement("p");
  diameterP.innerHTML = "Diameter: " + results.diameter;

  let gravityP = document.createElement("p");
  gravityP.innerHTML = "Gravity: " + results.gravity;

  let orbitalPeriodP = document.createElement("p");
  orbitalPeriodP.innerHTML = "orbital Period: " + results.orbital_period;

  let populationP = document.createElement("p");
  populationP.innerHTML = "Population: " + results.population;

  let rotationPeriodP = document.createElement("p");
  rotationPeriodP.innerHTML = "Rotation Period: " + results.rotation_period;

  let surfaceWaterP = document.createElement("p");
  surfaceWaterP.innerHTML = "Surface Water: " + results.surface_water;

  let terrainP = document.createElement("p");
  terrainP.innerHTML = "Terrain: " + results.terrain;


  let filmsArray = results.films;
  let filmsP = document.createElement("p");
  filmsP.innerHTML = "Films: ";
  for (let j = 0; j < filmsArray.length; j++) {
    // filmsP.innerHTML += filmsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = filmsArray[j];
    urlLink.alt = filmsArray[j];
    urlLink.innerHTML = filmsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < filmsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    filmsP.appendChild(urlLink);
    // if (j < filmsArray.length - 1) {
    //   filmsP.innerHTML += ", ";
    // };
  };

  let residentsArray = results.residents;
  let residentsP = document.createElement("p");
  residentsP.innerHTML = "Residents: ";
  for (let j = 0; j < residentsArray.length; j++) {
    // residentsP.innerHTML += residentsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = residentsArray[j];
    urlLink.alt = residentsArray[j];
    urlLink.innerHTML = residentsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < residentsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    residentsP.appendChild(urlLink);
    // if (j < residentsArray.length - 1) {
    //   residentsP.innerHTML += ", ";
    // };
  };



  detailsModalBody.appendChild(climateP);
  detailsModalBody.appendChild(diameterP);
  detailsModalBody.appendChild(gravityP);
  detailsModalBody.appendChild(orbitalPeriodP);
  detailsModalBody.appendChild(populationP);
  detailsModalBody.appendChild(rotationPeriodP);
  detailsModalBody.appendChild(surfaceWaterP);
  detailsModalBody.appendChild(terrainP);

  detailsModalBody.appendChild(filmsP);
  detailsModalBody.appendChild(residentsP);


  $('#detailsModal').modal("show");

};

function displayStarshipsModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;
  // console.log(results);

  detailsModalTitle.innerHTML = "<strong>" + results.name + "</strong>";

  let MGLTP = document.createElement("p");
  MGLTP.innerHTML = "MGLT: " + results.MGLT;

  let cargoCapacityP = document.createElement("p");
  cargoCapacityP.innerHTML = "Cargo Capacity: " + results.cargo_capacity;

  let consumablesP = document.createElement("p");
  consumablesP.innerHTML = "Consumables: " + results.consumables;

  let costInCreditsP = document.createElement("p");
  costInCreditsP.innerHTML = "Cost In Credits: " + results.cost_in_credits;

  let crewP = document.createElement("p");
  crewP.innerHTML = "Crew: " + results.crew;

  let hyperdriveRatingP = document.createElement("p");
  hyperdriveRatingP.innerHTML = "Hyperdrive Rating: " + results.hyperdrive_rating;

  let lengthP = document.createElement("p");
  lengthP.innerHTML = "Length: " + results.length;

  let manufacturerP = document.createElement("p");
  manufacturerP.innerHTML = "Manufacturer: " + results.manufacturer;

  let maxAtmospheringSpeedP = document.createElement("p");
  maxAtmospheringSpeedP.innerHTML = "Max Atmosphering Speed: " + results.max_atmosphering_speed;

  let modelP = document.createElement("p");
  modelP.innerHTML = "Model: " + results.model;

  let passengersP = document.createElement("p");
  passengersP.innerHTML = "Passengers: " + results.passengers;

  let starshipClassP = document.createElement("p");
  starshipClassP.innerHTML = "Starship Class: " + results.starship_class;


  let filmsArray = results.films;
  let filmsP = document.createElement("p");
  filmsP.innerHTML = "Films: ";
  for (let j = 0; j < filmsArray.length; j++) {
    // filmsP.innerHTML += filmsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = filmsArray[j];
    urlLink.alt = filmsArray[j];
    urlLink.innerHTML = filmsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < filmsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    filmsP.appendChild(urlLink);
    // if (j < filmsArray.length - 1) {
    //   filmsP.innerHTML += ", ";
    // };
  };

  let pilotsArray = results.pilots;
  let pilotsP = document.createElement("p");
  pilotsP.innerHTML = "Pilots: ";
  for (let j = 0; j < pilotsArray.length; j++) {
    // pilotsP.innerHTML += pilotsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = pilotsArray[j];
    urlLink.alt = pilotsArray[j];
    urlLink.innerHTML = pilotsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < pilotsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    pilotsP.appendChild(urlLink);
    // if (j < pilotsArray.length - 1) {
    //   pilotsP.innerHTML += ", ";
    // };
  };

  detailsModalBody.appendChild(MGLTP);
  detailsModalBody.appendChild(cargoCapacityP);
  detailsModalBody.appendChild(consumablesP);
  detailsModalBody.appendChild(costInCreditsP);
  detailsModalBody.appendChild(crewP);
  detailsModalBody.appendChild(hyperdriveRatingP);
  detailsModalBody.appendChild(lengthP);
  detailsModalBody.appendChild(manufacturerP);
  detailsModalBody.appendChild(maxAtmospheringSpeedP);
  detailsModalBody.appendChild(modelP);
  detailsModalBody.appendChild(passengersP);
  detailsModalBody.appendChild(starshipClassP);

  detailsModalBody.appendChild(filmsP);
  detailsModalBody.appendChild(pilotsP);


  $('#detailsModal').modal("show");

};

function displaySpeciesModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;
  // console.log(results);

  detailsModalTitle.innerHTML = "<strong>" + results.name + "</strong>";

  let averageHeightP = document.createElement("p");
  averageHeightP.innerHTML = "Average Height: " + results.average_height;

  let averageLifespanP = document.createElement("p");
  averageLifespanP.innerHTML = "Average Lifespan: " + results.average_lifespan;

  let classificationP = document.createElement("p");
  classificationP.innerHTML = "Classification: " + results.classification;

  let designationP = document.createElement("p");
  designationP.innerHTML = "Designation: " + results.designation;

  let eyeColorsP = document.createElement("p");
  eyeColorsP.innerHTML = "Eye Colors: " + results.eye_colors;

  let hairColorsP = document.createElement("p");
  hairColorsP.innerHTML = "Hair Colors: " + results.hair_colors;

  let homeworldP = document.createElement("p");
  homeworldP.innerHTML = "Homeworld: " + results.homeworld;

  let languageP = document.createElement("p");
  languageP.innerHTML = "Language: " + results.language;

  let skinColorsP = document.createElement("p");
  skinColorsP.innerHTML = "Skin Colors: " + results.skin_colors;


  let filmsArray = results.films;
  let filmsP = document.createElement("p");
  filmsP.innerHTML = "Films: ";
  for (let j = 0; j < filmsArray.length; j++) {
    // filmsP.innerHTML += filmsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = filmsArray[j];
    urlLink.alt = filmsArray[j];
    urlLink.innerHTML = filmsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < filmsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    filmsP.appendChild(urlLink);
    // if (j < filmsArray.length - 1) {
    //   filmsP.innerHTML += ", ";
    // };
  };

  let peopleArray = results.people;
  let peopleP = document.createElement("p");
  peopleP.innerHTML = "People: ";
  for (let j = 0; j < peopleArray.length; j++) {
    // peopleP.innerHTML += peopleArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = peopleArray[j];
    urlLink.alt = peopleArray[j];
    urlLink.innerHTML = peopleArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < peopleArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    peopleP.appendChild(urlLink);
    // if (j < peopleArray.length - 1) {
    //   peopleP.innerHTML += ", ";
    // };
  };

  detailsModalBody.appendChild(averageHeightP);
  detailsModalBody.appendChild(averageLifespanP);
  detailsModalBody.appendChild(classificationP);
  detailsModalBody.appendChild(designationP);
  detailsModalBody.appendChild(eyeColorsP);
  detailsModalBody.appendChild(hairColorsP);
  detailsModalBody.appendChild(homeworldP);
  detailsModalBody.appendChild(languageP);
  detailsModalBody.appendChild(skinColorsP);

  detailsModalBody.appendChild(filmsP);
  detailsModalBody.appendChild(peopleP);


  $('#detailsModal').modal("show");

};

function displayVehiclesModal(jsonData){
  console.log(jsonData);

  while (detailsModalBody.firstChild) { // while the value is not null
    detailsModalBody.removeChild(detailsModalBody.firstChild);
  };

  let results = jsonData;
  // console.log(results);

  detailsModalTitle.innerHTML = "<strong>" + results.name + "</strong>";

  let MGLTP = document.createElement("p");
  MGLTP.innerHTML = "MGLT: " + results.MGLT;

  let cargoCapacityP = document.createElement("p");
  cargoCapacityP.innerHTML = "Cargo Capacity: " + results.cargo_capacity;

  let consumablesP = document.createElement("p");
  consumablesP.innerHTML = "Consumables: " + results.consumables;

  let costInCreditsP = document.createElement("p");
  costInCreditsP.innerHTML = "Cost In Credits: " + results.cost_in_credits;

  let crewP = document.createElement("p");
  crewP.innerHTML = "Crew: " + results.crew;

  let lengthP = document.createElement("p");
  lengthP.innerHTML = "Length: " + results.length;

  let manufacturerP = document.createElement("p");
  manufacturerP.innerHTML = "Manufacturer: " + results.manufacturer;

  let maxAtmospheringSpeedP = document.createElement("p");
  maxAtmospheringSpeedP.innerHTML = "Max Atmosphering Speed: " + results.max_atmosphering_speed;

  let modelP = document.createElement("p");
  modelP.innerHTML = "Model: " + results.model;

  let passengersP = document.createElement("p");
  passengersP.innerHTML = "Passengers: " + results.passengers;

  let vehicle_classP = document.createElement("p");
  vehicle_classP.innerHTML = "Vehicle Class: " + results.vehicle_class;


  let filmsArray = results.films;
  let filmsP = document.createElement("p");
  filmsP.innerHTML = "Films: ";
  for (let j = 0; j < filmsArray.length; j++) {
    // filmsP.innerHTML += filmsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = filmsArray[j];
    urlLink.alt = filmsArray[j];
    urlLink.innerHTML = filmsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < filmsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    filmsP.appendChild(urlLink);
    // if (j < filmsArray.length - 1) {
    //   filmsP.innerHTML += ", ";
    // };
  };

  let pilotsArray = results.pilots;
  let pilotsP = document.createElement("p");
  pilotsP.innerHTML = "Pilots: ";
  for (let j = 0; j < pilotsArray.length; j++) {
    // pilotsP.innerHTML += pilotsArray[j];
    let urlLink = document.createElement("a");
    urlLink.href = pilotsArray[j];
    urlLink.alt = pilotsArray[j];
    urlLink.innerHTML = pilotsArray[j];
    // urlLink.target = "_blank";
    urlLink.addEventListener('click', loadDetailsModal);

    if (j < pilotsArray.length - 1) {
      urlLink.innerHTML += ", ";
    };

    pilotsP.appendChild(urlLink);
    // if (j < pilotsArray.length - 1) {
    //   pilotsP.innerHTML += ", ";
    // };
  };

  detailsModalBody.appendChild(MGLTP);
  detailsModalBody.appendChild(cargoCapacityP);
  detailsModalBody.appendChild(consumablesP);
  detailsModalBody.appendChild(costInCreditsP);
  detailsModalBody.appendChild(crewP);
  detailsModalBody.appendChild(lengthP);
  detailsModalBody.appendChild(manufacturerP);
  detailsModalBody.appendChild(maxAtmospheringSpeedP);
  detailsModalBody.appendChild(modelP);
  detailsModalBody.appendChild(passengersP);
  detailsModalBody.appendChild(vehicle_classP);

  detailsModalBody.appendChild(filmsP);
  detailsModalBody.appendChild(pilotsP);


  $('#detailsModal').modal("show");

};
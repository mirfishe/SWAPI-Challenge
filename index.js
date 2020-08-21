
const baseURL = "https://swapi.dev/api/";
const filmsURL = "https://swapi.dev/api/films/";
const peopleURL = "https://swapi.dev/api/people/";
const planetsURL = "https://swapi.dev/api/planets/";
const starshipsURL = "https://swapi.dev/api/starships/";
const speciesURL = "https://swapi.dev/api/species/";
const vehiclesURL = "https://swapi.dev/api/vehicles/";

const btnFlms = document.getElementById("btnFlms");
const btnPeople = document.getElementById("btnPeople");
const btnPlanets = document.getElementById("btnPlanets");
const btnStarships = document.getElementById("btnStarships");
const btnSpecies = document.getElementById("btnSpecies");
const btnVehicles = document.getElementById("btnVehicles");

// btnFlms.addEventListener('click', getFlms);
// btnPeople.addEventListener('click', getPeople); 
// btnPlanets.addEventListener('click', getPlanets);
// btnStarships.addEventListener('click', getStarships);
// btnSpecies.addEventListener('click', getSpecies);
// btnVehicles.addEventListener('click', getVehicles);
btnFlms.addEventListener('click', getResults);
btnPeople.addEventListener('click', getResults); 
btnPlanets.addEventListener('click', getResults);
btnStarships.addEventListener('click', getResults);
btnSpecies.addEventListener('click', getResults);
btnVehicles.addEventListener('click', getResults);


const errorHeader = document.getElementById("errorHeader");
// const resultsHeader = document.getElementById("h2Results");

const resultsDiv = document.getElementById("resultsDiv");
// const moreDiv = document.getElementById("moreDiv");

// moreDiv.style.display = "none";
resultsDiv.style.display = "none";
// resultsHeader.style.display = "none";
errorHeader.style.display = "none";


// Get the results after the search
function getResults(e){
  e.preventDefault();

  while (resultsDiv.firstChild) { // while the value is not null
    resultsDiv.removeChild(resultsDiv.firstChild);
  };

  // resultsHeader.style.display = "none";
  resultsDiv.style.display = "none";
  errorHeader.style.display = "none";
  // moreDiv.style.display = "none";
  // moreLink.style.display = "none";

  let URL = "";

  if (e.srcElement.id === "btnPeople") {
    URL = peopleURL;
  };

  switch (e.srcElement.id) {
    case "btnFlms":
      URL = filmsURL;
        break;
    case "btnPeople":
      URL = peopleURL;
        break;
    case "btnPlanets":
      URL = planetsURL;
        break;
    case "btnStarships":
      URL = starshipsURL;
        break;
    case "btnSpecies":
      URL = speciesURL;
        break;
    case "btnVehicles":
      URL = vehiclesURL;
        break;
    default:
      URL = baseURL;
  };

  fetch(URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);

      switch (e.srcElement.id) {
        case "btnFlms":
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

    resultsContainerDiv.appendChild(resultsRowDiv);
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

    resultsContainerDiv.appendChild(resultsRowDiv);
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

    resultsContainerDiv.appendChild(resultsRowDiv);
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

    resultsContainerDiv.appendChild(resultsRowDiv);
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

    resultsContainerDiv.appendChild(resultsRowDiv);
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

    resultsContainerDiv.appendChild(resultsRowDiv);
    resultsDiv.appendChild(resultsContainerDiv);

  };

};


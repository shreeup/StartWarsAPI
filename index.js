// Variables Planets
const ctnPlanets = document.getElementById('ctn-main');
const planetsPrevious = document.getElementById('planets-previous');
const planetsNext = document.getElementById('planets-next');

let URL_Planets = 'https://www.swapi.tech/api/planets/?page=1';
let nextPlanets;
let previousPlanets;
if (planetsPrevious) {
  planetsPrevious.addEventListener('click', pagePreviousPlanets);
  planetsNext.addEventListener('click', pageNextPlanets);
}

const peoplePrevious = document.getElementById('people-previous');
const peopleNext = document.getElementById('people-next');

let URL_People = 'https://www.swapi.tech/api/people/?page=1';
let nextPeople;
let previousPeople;
if (peoplePrevious) {
  peoplePrevious.addEventListener('click', pagePreviousPeople);
  peopleNext.addEventListener('click', pageNextPeople);
}

// Functions Planets
async function fetchPlanets() {
  document.querySelector('.overlay').classList.add('active');
  let results = await fetch(URL_Planets);
  const data = await results.json();
  nextPlanets = data.next;
  previousPlanets = data.previous;
  let planets = data.results;
  let outPut = ' ';
  await Promise.all(
    planets.map(async item => {
      let detailedResult = await fetch(item['url'])
        .then(p => p)
        .then(res => res.json());
      outPut += `<div class="card card-planet">
                  <h2>${item.name}</h2>
                  <h5>Climate: ${detailedResult.result.properties.climate}</h5>
                  <h5>Terrain: ${detailedResult.result.properties.terrain}</h5>
                  <h5>Created Date: ${detailedResult.result.properties.created}</h5>
               </div>`;
    })
  );
  ctnPlanets.innerHTML = outPut;
  document.querySelector('.overlay').classList.remove('active');
}

function pageNextPlanets() {
  if (nextPlanets) {
    URL_Planets = new URL(nextPlanets);
  }
  fetchPlanets()
    .then(response => {
      console.log(`Success: Planets`);
    })
    .catch(error => {
      console.log(`error!`);
      console.error(error);
    });
}

function pagePreviousPlanets() {
  if (previousPlanets) {
    URL_Planets = new URL(previousPlanets);
  }
  fetchPlanets()
    .then(response => {
      console.log(`Success: Planets`);
    })
    .catch(error => {
      console.log(`error!`);
      console.error(error);
    });
}

// Functions People
async function fetchPeople() {
  document.querySelector('.overlay').classList.add('active');
  let results = await fetch(URL_People);
  const data = await results.json();
  nextPeople = data.next;
  previousPeople = data.previous;
  let people = data.results;
  let outPut = ' ';

  await Promise.all(
    people.map(async item => {
      let detailedResult = await fetch(item['url'])
        .then(p => p)
        .then(res => res.json());
      outPut += `<div class="card card-people">
                  <h2>${item.name}</h2>
                  <h5>Gender: ${detailedResult.gender}</h5>
                  <h5>Birth Year: ${detailedResult.result.properties.birth_year}</h5>
                  <h5>Height: ${detailedResult.result.properties.height}</h5>
                  <h5>Hair Color: ${detailedResult.result.properties.hair_color}</h5>
                  <h5>Skin Color: ${detailedResult.result.properties.skin_color}</h5>
                  <h5>Eye Color: ${detailedResult.result.properties.eye_color}</h5>
               </div>`;
    })
  );
  ctnPlanets.innerHTML = outPut;
  document.querySelector('.overlay').classList.remove('active');
}

function pageNextPeople() {
  if (nextPeople) {
    URL_People = new URL(nextPeople);
  }
  fetchPeople()
    .then(response => {
      console.log(`Success: People`);
    })
    .catch(error => {
      console.log(`error!`);
      console.error(error);
    });
}

function pagePreviousPeople() {
  if (previousPeople) {
    URL_People = new URL(previousPeople);
  }
  fetchPeople()
    .then(response => {
      console.log(`Success: People`);
    })
    .catch(error => {
      console.log(`error!`);
      console.error(error);
    });
}

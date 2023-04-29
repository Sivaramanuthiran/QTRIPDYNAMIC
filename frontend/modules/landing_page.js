import config from "../conf/index.js";

async function init() {
  console.log(config)
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const response = await fetch(config.backendEndpoint+"/cities");
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    const cities = await response.json();
    console.log(cities)
    return cities;
  } catch (error) {
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
 let container = document.createElement("div");
 container.innerHTML=`
 
 <a href="pages/adventures/?city=${id}">
  <div class="tile col-12 col-sm-6 col-lg-3 mb-4">
   <img src=${image} alt="#">
    <div "tile-text text-center">
     <h5>${city}</h5>
     <p>${description}</p>
    </div>
  </div>
 </a>
 
 `
 document.getElementById("data").appendChild(container);
}

export { init, fetchCities, addCityToDOM };

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
    console.error(error);
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
 let container = document.createElement("div");
 container.className="col-6";
 container.innerHTML=`
 < a href="pages/adventures/?city=${id}>
 <div>
 <div>
 <p>${city}</p>
 <p>${description}</p>
 </div>
 <img src=${image} alt="#">
 </div>
 `
 document.getElementById("data").appendChild(container);
}

export { init, fetchCities, addCityToDOM };

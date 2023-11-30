let wrapper = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let locationBtn = document.getElementById("location-btn");
let cityRef = document.getElementById("city");
let latitude;
let longitude;

function shareMyLocationWeather() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    console.log(longitude, latitude);

    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/next6days?key=${key}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        // Clear previous results
        result.innerHTML = "";

        // Create an array of card elements using map
        const cards = data.days.map((dayData) => {
          let day = document.createElement("div");
          day.classList.add("weather-card");

          day.innerHTML = `
          <div class="gif-container"></div>
            <h4 class="weather">${dayData.datetime}</h4>
            <h4 class="desc">${dayData.conditions}</h4>
            
            <h1>${dayData.tempmax} &#176;</h1>
            <div class="temp-container">
              <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${dayData.tempmin}&#176;</h4>
              </div>
              <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${dayData.tempmax}&#176;</h4>
              </div>
            </div>
            
          `;

          // Append the day element to the result container
          result.appendChild(day);

          // Move the declaration of giphyUrl inside the map function
          let giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=XTjAZvayM7FP06wsFyPFiMLOFWNyKVaB&q=${dayData.conditions}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

          fetch(giphyUrl)
            .then((response) => response.json())
            .then((giphyData) => {
              const gifContainer = day.querySelector(".gif-container");
              if (giphyData.data.length > 0) {
                const gifUrl = giphyData.data[0].images.original.url;
                gifContainer.innerHTML = `<img src="${gifUrl}" alt="GIF">`;
              } else {
                gifContainer.innerHTML = "<p>No GIF available</p>";
              }
            });
          return day;
        });

        // Append all cards to the result container
        result.append(...cards);
      });
  });
}

let getWeather = () => {
  let cityValue = cityRef.value;
  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  // If input field is NOT empty
  else {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?key=${key}`;
    // Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        // Clear previous results
        result.innerHTML = "";

        // Create an array of card elements using map
        const cards = data.days.map((dayData) => {
          let day = document.createElement("div");
          day.classList.add("weather-card");

          day.innerHTML = `
          <div class="gif-container"></div>
            <h4 class="weather">${dayData.datetime}</h4>
            <h4 class="desc">${dayData.conditions}</h4>
            
            <h1>${dayData.tempmax} &#176;</h1>
            <div class="temp-container">
              <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${dayData.tempmin}&#176;</h4>
              </div>
              <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${dayData.tempmax}&#176;</h4>
              </div>
            </div>
            
          `;

          // Append the day element to the result container
          result.appendChild(day);

          // Move the declaration of giphyUrl inside the map function
          let giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=XTjAZvayM7FP06wsFyPFiMLOFWNyKVaB&q=${dayData.conditions}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

          fetch(giphyUrl)
            .then((response) => response.json())
            .then((giphyData) => {
              const gifContainer = day.querySelector(".gif-container");
              if (giphyData.data.length > 0) {
                const gifUrl = giphyData.data[0].images.original.url;
                gifContainer.innerHTML = `<img src="${gifUrl}" alt="GIF">`;
              } else {
                gifContainer.innerHTML = "<p>No GIF available</p>";
              }
            });
          return day;
        });

        // Append all cards to the result container
        result.append(...cards);
      });
  }
};

searchBtn.addEventListener("click", getWeather);
locationBtn.addEventListener("click", shareMyLocationWeather);
window.addEventListener("load", getWeather);

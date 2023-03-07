const d = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = months[d.getMonth()];
const day = weekday[d.getDay()];

function TodayForecast(l, c) {
  const todayWeather = `
        <div class="today-header forcast-header d-flex justify-content-between">
            <p class="today my-auto fs-6">${day}</p>
            <p class="today-date my-auto fs-6">${d.getDate() + month}</p>
        </div>
        <div class="forcast-content">
            <p class="city fs-5">${l.name}</p>
            <div class="temp d-flex justify-content-between">
              <div class="today-degree d-inline-block">
                ${c.temp_c}<sup>o</sup>C
              </div>
              <div class="today-icon my-auto">
                <img class="w-100" src="${c.condition.icon}" alt="sun">
              </div>
            </div>
            <p class="today-condition fs-6">${c.condition.text}</p>
            <span class="me-5"><img src="images/icon-umberella.png" alt=""> ${c.humidity} %</span>
            <span class="me-5"><img src="images/icon-wind.png" alt=""> ${c.wind_kph} k/p</span>
            <span class=""><img src="images/icon-compass.png" alt=""> ${c.wind_dir}</span>
        </div> `;

  document.querySelector('#first').innerHTML = todayWeather;
}

function tomorrowForecast(x) {
  let tomorrowWeather = '';

  for (let i = 1; i < x.length; i += 1) {
    const secColor = (() => {
      if (i === 1) {
        return 'sec-bg';
      }
      return '0';
    })();

    tomorrowWeather += ` <div class="col-md-6 col-sm-12 pb-3 ${secColor} ">
            <div>
                <div class="today-header forcast-header d-flex justify-content-center align-items-center">
                  <p class="sec-day my-auto fs-6">${weekday[new Date(x[i].date).getDay()]}</p>
                </div>
                <div class="forecast-content-2 text-center mt-5">
                  <div class="forecast-icon mb-4">
                    <img src="${x[i].day.condition.icon}" alt="" width="48">
                  </div>
                  <div class="degree mt-4 fw-bold text-white fs-3">${x[i].day.maxtemp_c}<sup>o</sup>C</div>
                  <small class="my-1 fs-6">${x[i].day.mintemp_c}<sup>o</sup></small>
                  <div class=" today-condition my-5 fs-6">${x[i].day.condition.text}</div>
                </div>
            </div>
        </div> `;
  }
  document.querySelector('#tomorrow').innerHTML = tomorrowWeather;
}

async function forecast(town) {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b8b0301f54694447b67125844230503&q= ${town} &days=3`);
  const weather = await res.json();
  TodayForecast(weather.location, weather.current);
  tomorrowForecast(weather.forecast.forecastday);
}
forecast('alex');

document.querySelector('#search').addEventListener('keyup', (e) => {
  forecast(e.target.value);
});
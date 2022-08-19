let unit = 1;

function slide() {
    const slider = document.querySelector('.slider');
    slider.classList.toggle('slide')
    unit ^= true;
}

const weather = (() => {

    // Grab the information displays
    const message = document.querySelector('.message')
    const temperature = document.querySelector('.temperature')
    const weatherState = document.querySelector('.weather')
    const humidity = document.querySelector('.humidity-value')
    const feelsLike = document.querySelector('.feels-like-value')
    const wind = document.querySelector('.wind-value')
    const pressure = document.querySelector('.pressure-value')

    // Fetch data from the API
    async function lookUpData(city) {
        const url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=29ba00cf487b8d5735832dc033a2de17`
        if (city.length > 0)
        try {
            const response = await fetch(url, {mode: 'cors'});
            const data = await response.json();
            console.log(data)
            message.textContent = `The current weather in ${data.city.name}, ${data.city.country} is`
            wind.textContent = `${(data.list[0].wind.speed * 3.6).toFixed(1)} km/h`
            humidity.textContent = `${data.list[0].main.humidity}%`
            pressure.textContent = `${data.list[0].main.pressure} hPa`

            // Sets the temperature to either celsius or fahrenheit
            if (unit === 1) {
                temperature.textContent = `${(data.list[0].main.temp - 275.15).toFixed(1)}ºC`;
                feelsLike.textContent = `${(data.list[0].main.feels_like - 275.15).toFixed(1)}ºC`;
            } 
            else {
                temperature.textContent = `${(1.8 * (data.list[0].main.temp - 273.15) + 32).toFixed(1)}ºF`;
                feelsLike.textContent = `${(1.8 * (data.list[0].main.feels_like - 273.15) + 32).toFixed(1)}ºF`;
            }
        }
        catch (error) {
            alert ('Place not found');
        }
    }

    return {lookUpData}
})();

weather.lookUpData('Kraków');

const units = document.querySelector('.units')
units.addEventListener('click', slide)

const searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('keydown', e => {
    const city = document.querySelector('.search-bar').value
    if (e.keyCode === 13) {
        weather.lookUpData(city);
    }
})

const search = document.querySelector('.search-image')
search.addEventListener('click', e => {
    const city = document.querySelector('.search-bar').value
    weather.lookUpData(city);
})
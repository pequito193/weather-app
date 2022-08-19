// Determine the units, 1 is celsius, 0 is fahrenheit
let unit = 1;


// Rounds numbers to 1 decimal point
function round(number) {
    let result = (Math.round(number * 10) / 10).toFixed(1)
    return result;
}


// Function to slide the unit changer button
function slide() {

    // Query selector the displays
    const slider = document.querySelector('.slider');
    const temperature = document.querySelector('.temperature')
    const feelsLike = document.querySelector('.feels-like-value')

    // Move the slider
    slider.classList.toggle('slide')

    // Set the unit to the opposite of the current one
    unit ^= true;

    // Change the unit on the current displays
    let string = temperature.textContent.substring(0, temperature.textContent.length - 2);
    let string2 = feelsLike.textContent.substring(0, temperature.textContent.length - 2);
    if (unit === 0) {
        temperature.textContent = `${round(Number(string) * 1.8 + 32)}F`
        feelsLike.textContent = `${round(Number(string2) * 1.8 + 32)}F`
    }
    else {
        temperature.textContent = `${round(Number((string) - 32) / 1.8)}C`
        feelsLike.textContent = `${round(Number((string2) - 32) / 1.8)}C`
    }
}


// Main functions that fetch and take care of the information
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
            weatherState.textContent = `${data.list[0].weather[0].main}`

            // Sets the temperature to either celsius or fahrenheit
            if (unit === 1) {
                temperature.textContent = `${round(data.list[0].main.temp - 275.15)}C`;
                feelsLike.textContent = `${round(data.list[0].main.feels_like - 275.15)}C`;
            } 
            else {
                temperature.textContent = `${round(1.8 * (data.list[0].main.temp - 273.15) + 32)}F`;
                feelsLike.textContent = `${round(1.8 * (data.list[0].main.feels_like - 273.15) + 32)}F`;
            }
        }
        catch (error) {
            alert ('Place not found');
        }
    }

    return {lookUpData}
})();


// Set default city on page load
weather.lookUpData('Kraków');


// Add event event listener to unit changing button, giving it a little animation
const units = document.querySelector('.units')
units.addEventListener('click', slide)


// Add event listener to the input box
const searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('keydown', e => {
    const city = document.querySelector('.search-bar').value
    if (e.keyCode === 13) {
        weather.lookUpData(city);
    }
})


// Add event listener to the magnifier image
const search = document.querySelector('.search-image')
search.addEventListener('click', e => {
    const city = document.querySelector('.search-bar').value
    weather.lookUpData(city);
})
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
        temperature.textContent = `${round(Number(string) * 1.8 + 32)}ºF`
        feelsLike.textContent = `${round(Number(string2) * 1.8 + 32)}ºF`
    }
    else {
        temperature.textContent = `${round((Number(string) - 32) / 1.8)}ºC`
        feelsLike.textContent = `${round((Number(string2) - 32) / 1.8)}ºC`
    }

    const maxTemp = document.querySelectorAll('.max-temp')
        let i = 0;
        maxTemp.forEach(maxTemp => {
            let string3 = maxTemp.textContent.substring(0, maxTemp.textContent.length - 2)
            if (unit === 1) {
                maxTemp.textContent = `${round((Number(string3) - 32) / 1.8)}ºC`
            }
            else {
                maxTemp.textContent = `${round(Number(string3) * 1.8 + 32)}ºF`
            }
            i++;
        })

    const minTemp = document.querySelectorAll('.min-temp')
        let j = 0;
        minTemp.forEach(minTemp => {
            let string4 = minTemp.textContent.substring(0, minTemp.textContent.length - 2)
            if (unit === 1) {
                minTemp.textContent = `${round((Number(string4) - 32) / 1.8)}ºC`
            }
            else {
                minTemp.textContent = `${round(Number(string4) * 1.8 + 32)}ºF`
            }
            j++;
        })


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
    const longitude = document.querySelector('.longitude-value')
    const latitude = document.querySelector('.latitude-value')
    const population = document.querySelector('.population-value')
    const sunrise = document.querySelector('.sunrise-value')
    const sunset = document.querySelector('.sunset-value')
    const rain = document.querySelector('.rain-value')
    const date = document.querySelector('.date')
    const hour = document.querySelector('.hour')


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
            rain.textContent = `${data.list[0].pop}%`
            weatherState.textContent = `${data.list[0].weather[0].main}`
            longitude.textContent = `${data.city.coord.lon}`
            latitude.textContent = `${data.city.coord.lat}`
            pressure.textContent = `${data.list[0].main.pressure} hPa`
            population.textContent = `${data.city.population}`


            // Adjusting time values
            sunsetValue = `${new Date(data.city.sunset * 1000 + (data.city.timezone * 1000)).toUTCString()}`
            sunriseValue = `${new Date(data.city.sunrise * 1000 + (data.city.timezone * 1000)).toUTCString()}`
            sunset.textContent = sunsetValue.substr(16, 6)
            sunrise.textContent = sunriseValue.substr(16, 6)

            timeValue = `${new Date(+new Date() + (data.city.timezone * 1000)).toUTCString()}`
            date.textContent = timeValue.substr(0, 16)
            hour.textContent = timeValue.substr(16, 9)


            // Sets the temperature to either celsius or fahrenheit
            if (unit === 1) {
                temperature.textContent = `${round(data.list[0].main.temp - 273.15)}ºC`;
                feelsLike.textContent = `${round(data.list[0].main.feels_like - 273.15)}ºC`;
            } 
            else {
                temperature.textContent = `${round(1.8 * (data.list[0].main.temp - 273.15) + 32)}ºF`;
                feelsLike.textContent = `${round(1.8 * (data.list[0].main.feels_like - 273.15) + 32)}ºF`;
            }


            // Sets the data on the 'Daily' section
            const maxTemp = document.querySelectorAll('.max-temp')
            let i = 0;
            maxTemp.forEach(maxTemp => {
                if (unit === 1) {
                    maxTemp.textContent = `${round(data.list[i].main.temp_max - 273.15)}ºC`;
                }
                else {
                    maxTemp.textContent = `${round(1.8 * (data.list[i].main.temp_max - 273.15) + 32)}ºF`;
                }
                i++;
            })

            const minTemp = document.querySelectorAll('.min-temp')
            let j = 0;
            minTemp.forEach(minTemp => {
                if (unit === 1) {
                    minTemp.textContent = `${round(data.list[j].main.temp_min - 273.15)}ºC`;
                }
                else {
                    minTemp.textContent = `${round(1.8 * (data.list[j].main.temp_min - 273.15) + 32)}ºF`;
                }
                j++;
            })

            const weekDay = document.querySelectorAll('.week-day')
            let k = 0;
            weekDay.forEach(weekDay => {
                weekDayValue = `${new Date(+new Date() + (data.city.timezone * 1000) + (86400000 * k)).toUTCString()}`
                weekDay.textContent = weekDayValue.substr(0, 11)
                k++
            })

            const weatherType = document.querySelectorAll('.sky')
            let m = 0;
            weatherType.forEach(weatherType => {
                if (`${data.list[m].weather[0].main}` === 'Rain') {
                    weatherType.setAttribute('src', './images/rain.png')
                }
                else if (`${data.list[m].weather[0].main}` === 'Clouds') {
                    weatherType.setAttribute('src', './images/clouds.png')
                }
                else if (`${data.list[m].weather[0].main}` === 'Thunderstorm') {
                    weatherType.setAttribute('src', './images/thunderstorm.png')
                }
                else if (`${data.list[m].weather[0].main}` === 'Snow') {
                    weatherType.setAttribute('src', './images/snow.png')
                }
                else if (`${data.list[m].weather[0].main}` === 'Clear') {
                    weatherType.setAttribute('src', './images/clear-sky.png')
                }
                else {
                    weatherType.setAttribute('src', './images/idk.png')
                }
                m++
            })

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
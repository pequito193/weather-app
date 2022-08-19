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
    const humidity = document.querySelector('.humidity')
    const feelsLike = document.querySelector('.feels-like')
    const wind = document.querySelector('.wind')

    // Fetch data from the API
    async function lookUpData(cityname) {
        const city = document.querySelector('.search-bar').value
        const url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=29ba00cf487b8d5735832dc033a2de17`
        if (city.length > 0)
        try {
            const response = await fetch(url, {mode: 'cors'});
            const data = await response.json();
            console.log(data)
            return data;
        }
        catch (error) {
            alert ('Place not found');
        }
    }

    // Use the fetched data to display information on the webpage
    function weatherData() {
        let data = lookUpData();
        message.textContent = `The current weather in ${data.city.name}, ${data.city.country} is`
        temperature.textContent = `${data.list[0].main.temp}`;
    }


    return {weatherData}
})();



const units = document.querySelector('.units')
units.addEventListener('click', slide)

const searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        weather.weatherData();
    }
})

const search = document.querySelector('.search-image')
searchBar.addEventListener('click', weather.weatherData)
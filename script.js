function slide() {
    const slider = document.querySelector('.slider')
    slider.classList.toggle('slide')
}

async function lookUpData(cityname) {
    const city = document.querySelector('.search-bar').value
    console.log(city)
    const url =`api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=29ba00cf487b8d5735832dc033a2de17`
    if (city.length > 0)
    try {
        const data = await fetch(url, {mode: 'cors'})
    }
    catch (error) {
        alert (error);
        return null;
    }
}

const units = document.querySelector('.units')
units.addEventListener('click', slide)

const searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        lookUpData();
    }
})

const search = document.querySelector('.search-image')
searchBar.addEventListener('click', lookUpData)
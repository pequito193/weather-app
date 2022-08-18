function slide() {
    const slider = document.querySelector('.slider')
    slider.classList.toggle('slide')
}

const units = document.querySelector('.units')
units.addEventListener('click', slide)
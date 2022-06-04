(function () { ///// start of the opening function

    'use strict';

    adjustHeight();
    window.addEventListener('resize', adjustHeight)

    function adjustHeight() {
        const mapSize = document.querySelector("#map"),
            contentSize = document.querySelector("#content"),
            removeHeight = document.querySelector('#footer').offsetHeight,
            resize = window.innerHeight - removeHeight;

        mapSize.getElementsByClassName.height = `${resize}px`

        if (window.innerWidth >= 768) {
            contentSize.style.height = `${resize}px`
            mapSize.style.height = `${resize}px`
        } else {
            contentSize.style.height = `${resize * 0.25}px`
            mapSize.style.height = `${resize * 0.75}px`
        }
    }

    const button = document.querySelector("#legend button")
    button.addEventListener('click', function () {
        const legend = document.querySelector(".leaflet-legend")
        legend.classList.toggle('show-legend')
    })



    



    //// below is the end of the opening function
})();
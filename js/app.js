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



    var southWest = L.latLng(20, -20),
        northEast = L.latLng(65, 80),
        bounds = L.latLngBounds(southWest, northEast);

    const map = L.map("map", {
        zoomSnap: 0.1,
        center: [41.9100498, 12.4659593], // Rome
        zoom: 7.5, // 
        zoomControl: false,
        minZoom: 5,
        maxZoom: 11,
        maxBounds: bounds,
    });
    map.attributionControl.setPrefix("");


    //// DARE map tile layer - It's a beautiful map, but for this project, I want to make my own.
    L.tileLayer(
        `https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png`, {
            attribution: '<a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
            maxZoom: 11,
        }
    ).addTo(map);
    ////



    //// below is the end of the opening function
})();
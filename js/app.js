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

    ///////////// Roman Empire extent layers
    // Extent of Roman Empire, 500 B.C.
    var extent500BC = L.geoJson(extent500BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    }).addTo(map);

    // Extent of Roman Empire, 338 B.C.
    var extent338BC = L.geoJson(extent338BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });

    // Extent of Roman Empire, 298 B.C.
    var extent298BC = L.geoJson(extent298BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });

    // Extent of Roman Empire, 290 B.C.
    var extent290BC = L.geoJson(extent290BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });

    // Extent of Roman Empire, 272 B.C.
    var extent272BC = L.geoJson(extent272BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });

    // Extent of Roman Empire, 264 B.C.
    var extent264BC = L.geoJson(extent264BCdata, {
        style: function (feature) {
            return {
                color: "#000",
                fillColor: "#A91101",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });

// Extent of Roman Empire, 218 B.C.
var extent218BC = L.geoJson(extent218BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 133 B.C.
var extent133BC = L.geoJson(extent133BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 60 B.C.
var extent60BC = L.geoJson(extent60BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 14
var extentAD14 = L.geoJson(extentAD14data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 69
var extentAD69 = L.geoJson(extentAD69data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 117
var extentAD117 = L.geoJson(extentAD117data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 200
var extentAD200 = L.geoJson(extentAD200data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


/////////// Roads layer

var romanRoads = L.geoJson(romanRoadsData, {
        style: function (feature) {
            return {
                color: "#000",
                weight: 1,
                fillOpacity: 0.3,
                interactive: false,
            };
        },
    });








    //// below is the end of the opening function
})();
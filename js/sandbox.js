// map options
var options = {
    center: [38, -95],
    zoom: 4
}

// create a Leaflet map in our division container with id of 'map'
var map = L.map('map', options);

// Leaflet providers base map URL
var basemap_source =
    'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=ef45178e209e461983726086cb45354d'

// Leaflet providers attributes
var basemap_options = {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: 'ef45178e209e461983726086cb45354d',
    maxZoom: 22
};

// request some basemap tiles and add to the map
var tiles = L.tileLayer(basemap_source, basemap_options).addTo(map);

// load the .sort() method before the calling the L.geoJson() method
plants.features.sort(function (a, b) {
    return b.properties.capacity_mw - a.properties.capacity_mw;
});

// setting up the getRadius() funtion for use in drawing the map symbols
function getRadius(area) {
    var radius = Math.sqrt(area / Math.PI);
    return radius * .6;
}

var commonStyles = {
    weight: 0.7,
    opacity: 0.5,
    stroke: true,
    fillOpacity: 0.8
}

// Attempting to push fuel_source data into an Array... I couldn't get it to work.
// let fuelArray = [];
// for (let fuelIndex = 0; plants.length; fuelIndex++) {
// 	fuelArray.push(plants.properties.fuel_source[fuelArray]);
// }
// console.log(`Fuels list ${fuelArray}`);

// This didn't work either...
// let fuelSource = plants.map(object => {
// 	if (object.hasOwnProperty('fuel_source')) return object.name
// 	return ""
// })
// console.log('user names list ', fuelSource);
function sortFuelsByCapacity(plants) {
    let fuels = {}
    for (let plant of plants.features) {
        const props = plant.properties
        for (let fuel in props.fuel_source) {
            console.log(fuel, props.fuel_source, props.fuel_source[fuel])
            if (fuels[fuel]) {
                fuels[fuel] += props.fuel_source[fuel]
            } else {
                fuels[fuel] = props.fuel_source[fuel]
            }
        }
    }
    const sorted = []
    for (sort in fuels) {
        sorted.push([sort, fuels[sort]])
    }
    fuels.byMw = sorted.sort(function (a, b) {
        return b[1] - a[1]
    })
    return fuels
}

const sumFuels = sortFuelsByCapacity(plants)

console.log('fuels list ', sumFuels);

// var hydroLayer = L.geoJson(plants, {
// 	pointToLayer: function (feature, latlng) {
// 		return L.circleMarker(latlng, commonStyles);
// 	},
// 	filter: function (feature) {
// 		if (feature.properties.fuel_source.Hydro) {
// 			return feature;
// 		}
// 	},
// 	style: function (feature, commonStyles) {
// 		return {
// 			color: 'powderblue',
// 			fillColor: 'dodgerblue',
// 			radius: getRadius(feature.properties.fuel_source.Hydro)
// 		}
// 	}
// }).addTo(map);

// var pumpedStorageLayer = L.geoJson(plants, {
// 	pointToLayer: function (feature, latlng) {
// 		return L.circleMarker(latlng, commonStyles);
// 	},
// 	filter: function (feature) {
// 		if (feature.properties.fuel_source['Pumped Storage']) {
// 			return feature;
// 		}
// 	},
// 	style: function (feature, commonStyles) {
// 		return {
// 			color: 'gainsboro',
// 			fillColor: 'slategray',
// 			weight: 0.7,
// 			opacity: 0.5,
// 			stroke: true,
// 			fillOpacity: 0.8,
// 			radius: getRadius(feature.properties.fuel_source['Pumped Storage'])
// 		}
// 	}
// }).addTo(map);;

// var GeothermalLayer = L.geoJson(plants, {
// 	pointToLayer: function (feature, latlng) {
// 		return L.circleMarker(latlng, commonStyles);
// 	},
// 	filter: function (feature) {
// 		if (feature.properties.fuel_source.Geothermal) {
// 			return feature;
// 		}
// 	},
// 	style: function (feature, commonStyles) {
// 		return {
// 			color: 'peru',
// 			fillColor: 'firebrick',
// 			weight: 0.7,
// 			opacity: 0.5,
// 			stroke: true,
// 			fillOpacity: 0.8,
// 			radius: getRadius(feature.properties.fuel_source.Geothermal)
// 		}
// 	}
// }).addTo(map);;

// var nuclearLayer = L.geoJson(plants, {
// 	pointToLayer: function (feature, latlng) {
// 		return L.circleMarker(latlng, commonStyles);
// 	},
// 	filter: function (feature) {
// 		if (feature.properties.fuel_source.Nuclear) {
// 			return feature;
// 		}
// 	},
// 	style: function (feature, commonStyles) {
// 		return {
// 			color: 'yellow',
// 			fillColor: 'chartreuse',
// 			weight: 0.7,
// 			opacity: 0.5,
// 			stroke: true,
// 			fillOpacity: 0.8,
// 			radius: getRadius(feature.properties.fuel_source.Nuclear)
// 		}
// 	}
// }).addTo(map);

var filteredPlants = L.geoJson(plants, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: getRadius(feature.properties.capacity_mw),

        });
    },
    filter: function (feature) {
        if (feature.properties.fuel_source.Hydro ||
            feature.properties.fuel_source["Pumped Storage"] ||
            feature.properties.fuel_source.Geothermal ||
            feature.properties.fuel_source.Nuclear) {
            return feature;
        }
    },
    style: function (feature) {
        if (feature.properties.fuel_source.Hydro) {
            return {
                color: 'powderblue',
                fillColor: 'dodgerblue',
                weight: 0.7,
                opacity: 0.5,
                stroke: true,
                fillOpacity: 0.8,
                radius: getRadius(feature.properties.fuel_source.Hydro)
            };
        } else if (feature.properties.fuel_source["Pumped Storage"]) {
            return {
                color: 'gainsboro',
                fillColor: 'slategray',
                weight: 0.7,
                opacity: 0.5,
                stroke: true,
                fillOpacity: 0.8,
                radius: getRadius(feature.properties.fuel_source["Pumped Storage"])
            };
        } else if (feature.properties.fuel_source.Geothermal) {
            return {
                color: 'peru',
                fillColor: 'firebrick',
                weight: 0.7,
                opacity: 0.5,
                stroke: true,
                fillOpacity: 0.8,
                radius: getRadius(feature.properties.fuel_source.Geothermal)
            };
        } else if (feature.properties.fuel_source.Nuclear) {
            return {
                color: 'yellow',
                fillColor: 'chartreuse',
                weight: 0.7,
                opacity: 0.5,
                stroke: true,
                fillOpacity: 0.8,
                radius: getRadius(feature.properties.fuel_source.Nuclear)
            }
        }
    },
    onEachFeature: function (feature, layer) {


        // attempting to extract the data for the popup
        for (let key in plants) {
            // console.log(key + ":", plants[key]);
        }
        /* 
          ┌─────────────────────────────────────────────────────────────────────────┐
          │   I'm still getting the [object Object] output, despite seeing all of   │
          │ it in the console.log					                                │
          │                                                                         │
          │         I've tried a few different variations of:                       │
          │         (let key in plants)                                             │
          │         such as (let key in plants.features.properties.fuel_source)     │
          │                                                                         │
          │         for (let key in plants.features.properties.fuel_source) {       │
          │           console.log(key + ":",                                        │
          │           plants.features.properties.fuel_source[key]);                 │
          │         }                                                               │
          │ But I get the following error:                                          │
          │ Uncaught TypeError: plants.features.properties is undefined             │
          └─────────────────────────────────────────────────────────────────────────┘
         */
        // normal popup and tooltip stuff
        var props = feature.properties
        var sources = listSources(props.fuel_source) // props.fuel_source is an objects
        var popup =
            `<span class="bold-popup">${props.plant_name}</span><br>
				Total Capacity: 
				${props.capacity_mw.toLocaleString()} Megawatts<br>
				${sources}`


        layer.bindPopup(popup);

        let className = 'default-tooltip'
        if (feature.properties.fuel_source.Nuclear) {
            className = 'nuclear'
        } else if (feature.properties.fuel_source.Hydro) {
            className = 'hydro'
        } else if (feature.properties.fuel_source['Pumped Storage']) {
            className = 'pumped-storage'
        } else {
            (feature.properties.fuel_source.Geothermal)
            className = 'geothermal'
        }

        layer.bindTooltip(props.plant_name, {
            className: className,
            direction: 'bottom'
        });
    },
}).addTo(map);

function listSources(plant) {
    const sources = [];
    for (let key in plant) {
        if (plant[key]) {
            sources.push([plant[key], key]);
        }
    }
    sources.sort(function (a, b) {
        return b[0] - a[0];
    });
    let list = "";
    for (i of sources) {
        list += `${i[1]}: ${i[0].toLocaleString()} MW<br>`
    }
    return list;
}

function getFillColor(fuel) {
    var props = feature.properties
    var fuel = props.fuel_source
    if (fuel = Hydro) {
        return `'dodgerblue'`
    } else if (fuel = 'Pumped Storage') {
        return `'slategray'`
    } else if (fuel = Geothermal) {
        return `'firebrick'`
    } else if (fuel = Nuclear) {
        return `'chartreuse'`
    } else {
        return `'red'`
    }
}

/* 
  ┌────────────────────────────────────────────────────────────────────────────┐
  │     This is a strange one...On the mouse out, it doesn't completely        │
  │     reset and leaves a faded colour. It's as if its being drawn twice,     │
  │     but I haven't figured out how to trouble shoot this one.               │
  │     I tried commenting the pointToLayer section in the "filteredPlants"    │
  │     object, but this resulted in the map failing to load.                  │
  └────────────────────────────────────────────────────────────────────────────┘
 */
// to get mouseover/mouseout effects
filteredPlants.eachLayer(function (layer) {
    layer.on('mouseover', function (e) {
        e.target.setStyle({
            color: "red",
            weight: "10"
        })
        this.openTooltip()
    })
    layer.on('mouseout', function (e) {
        filteredPlants.resetStyle(layer)
        this.closeTooltip()

    })
})

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ The code below is from the completed lab 7 portion sans challenge and   │
  │ will serve as a reference.                                              │
  └─────────────────────────────────────────────────────────────────────────┘
 */
/* 
		// Hydroelectric power plant layer
		var hydroLayer = L.geoJson(plants, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, commonStyles);
			},
			filter: function (feature) {
				if (feature.properties.fuel_source.Hydro) {
					return feature;
				}
			},
			style: function (feature) {
				return {
					color: 'powderblue',
					fillColor: 'dodgerblue',
					radius: getRadius(feature.properties.fuel_source.Hydro)
				}
			},

			// popup and tooltip here:
			onEachFeature: function (feature, layer) {

				var props = feature.properties
				var popup =
					` < span class = "bold-popup" > $ {
			props.plant_name
		} < /span><br>
		Total Capacity from Hydroelectric:
			$ {
				props.fuel_source.Hydro.toLocaleString()
			}
		Megawatts `


				layer.bindPopup(popup);
				layer.bindTooltip(props.plant_name);
			},
		}).addTo(map);

		// This portion mirrors the code from the lesson video and adds visual effect to map layer on mouseover/mouseout.
		hydroLayer.eachLayer(function (layer) {
			layer.on('mouseover', function (e) {
				e.target.setStyle({
					color: "red",
					weight: "10"
				})
				this.openTooltip()
			})
			layer.on('mouseout', function (e) {
				hydroLayer.resetStyle(layer)
				this.closeTooltip()

			})
		})

		// Pumped-Storage hydroelectric power plant layer
		var pumpedStorageLayer = L.geoJson(plants, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, commonStyles);
			},
			filter: function (feature) {
				if (feature.properties.fuel_source["Pumped Storage"]) {
					return feature;
				}
			},
			style: function (feature) {
				return {
					color: 'gainsboro',
					fillColor: 'slategray',
					radius: getRadius(feature.properties.fuel_source["Pumped Storage"])
				}
			},
			// popup and tooltip here:
			onEachFeature: function (feature, layer) {

				var props = feature.properties
				var popup =
					` < span class = "bold-popup" > $ {
			props.plant_name
		} < /span><br>
		Total Capacity from Hydroelectric(Pumped Storage):
			$ {
				props.fuel_source['Pumped Storage'].toLocaleString()
			}
		Megawatts `


				layer.bindPopup(popup);
				layer.bindTooltip(props.plant_name);
			},
		}).addTo(map);

		pumpedStorageLayer.eachLayer(function (layer) {
			layer.on('mouseover', function (e) {
				e.target.setStyle({
					color: "red",
					weight: "10"
				})
				this.openTooltip()
			})
			layer.on('mouseout', function (e) {
				pumpedStorageLayer.resetStyle(layer)
				this.closeTooltip()

			})
		})

		// Geothermal power plant layer
		var geothermalLayer = L.geoJson(plants, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, commonStyles);
			},
			filter: function (feature) {
				if (feature.properties.fuel_source.Geothermal) {
					return feature;
				}
			},
			style: function (feature) {
				return {
					color: 'peru',
					fillColor: 'firebrick',
					radius: getRadius(feature.properties.fuel_source.Geothermal)
				}
			},
			// popup and tooltip here:
			onEachFeature: function (feature, layer) {

				var props = feature.properties
				var popup =
					` < span class = "bold-popup" > $ {
			props.plant_name
		} < /span><br>
		Total Capacity from Geothermal:
			$ {
				props.fuel_source.Geothermal.toLocaleString()
			}
		Megawatts `


				layer.bindPopup(popup);
				layer.bindTooltip(props.plant_name);
			},
		}).addTo(map);

		geothermalLayer.eachLayer(function (layer) {
			layer.on('mouseover', function (e) {
				e.target.setStyle({
					color: "red",
					weight: "10"
				})
				this.openTooltip()
			})
			layer.on('mouseout', function (e) {
				geothermalLayer.resetStyle(layer)
				this.closeTooltip()

			})
		})

		// Nuclear power plant layer
		var nuclearLayer = L.geoJson(plants, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, commonStyles);
			},
			filter: function (feature) {
				if (feature.properties.fuel_source.Nuclear) {
					return feature;
				}
			},
			style: function (feature) {
				return {
					color: 'yellow',
					fillColor: 'chartreuse',
					radius: getRadius(feature.properties.fuel_source.Nuclear)
				}
			},
			// popup and tooltip here:
			onEachFeature: function (feature, layer) {

				var props = feature.properties
				var popup =
					` < span class = "bold-popup" > $ {
			props.plant_name
		} < /span><br>
		Total Capacity from Nuclear:
			$ {
				props.fuel_source.Nuclear.toLocaleString()
			}
		Megawatts `


				layer.bindPopup(popup);
				layer.bindTooltip(props.plant_name);
			},
		}).addTo(map);

		nuclearLayer.eachLayer(function (layer) {
			layer.on('mouseover', function (e) {
				e.target.setStyle({
					color: "red",
					weight: "10"
				})
				this.openTooltip()
			})
			layer.on('mouseout', function (e) {
				nuclearLayer.resetStyle(layer)
				this.closeTooltip()

			})
		}) */
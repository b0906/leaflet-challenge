let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl).then(function (data){
    function bindPopuptoEarthquake(feature, layer) {
        layer.bindPopup(
            `<h5>Location: ${feature.properties.place}<br>Magnitude: ${
                feature.properties.mag
            }</h5><hr><p>${new Date(feature.properties.time)}</p>`
        );
    }
// check with Mark
    function generateEarthquakeRadius(depth) {
        return Math.sqrt(depth / 1);
    //     console.log(depth)
    // return depth * 2

    }

    function generateEarthquakeColor(magnitude) {
        if (magnitude > 7.0) {
            return "#78281F";
        }
        if (magnitude > 6.0) {
            return "#922B21";
        }
        if (magnitude > 5.0) {
            return "#C0392B";
        }
        if (magnitude > 4.0) {
            return "#CD6155";
        }
        if (magnitude > 3.0) {
            return "#E6B0AA";
        }
        if (magnitude > 2.0) {
            return "#F2D7D5";
        }
        if (magnitude > 1.0) {
            return "#F9EBEA";
        } else {
            return "#FDFEFE";
        }


    }
    
    function generateEarthquakeStyle(feature) {
        // console.log(feature);
        return {
            radius: generateEarthquakeRadius(feature.geometry.coordinates[2]),
            color: generateEarthquakeColor(feature.properties.mag)
        };
    }

    function generateEarthquakeMarker(feature, layer) {
        return L.circleMarker(layer);

    } 

    // L.geoJson(data).addTo(map)

    let earthquakes = L.geoJson(data, {
        onEachFeature: bindPopuptoEarthquake,
        style: generateEarthquakeStyle,
        pointToLayer: generateEarthquakeMarker
       
    });
    earthquakes.addTo(map)

    console.log(earthquakes);
})
    // Tile type: openstreetmap
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6

    });

    var dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6

    });

    let map = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        
      });
      
      // Add our "streetmap" tile layer to the map.
      street.addTo(map);

    let tileMaps = {
        "Street Map":street,
        "Dark Map": dark
    }      

      L.control.layers(tileMaps).addTo(map);

      // Create a legend to display information about our map.
    let info = L.control({
    position: "bottomright"
  });

      // When the layer control is added, insert a div with the class of "legend".
    info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML = "<h4 style='text-align:center'>Magnitude</h4>"
    div.innerHTML += "<div style='background:#FDFEFE' class='square'></div> 1 or less<br>"
    div.innerHTML += "<div style='background:#F9EBEA' class='square'></div> 1 - 2<br>"
    // div.innerHTML = "<h4 style='text-align:center'>Magnitude</h4>"
    div.innerHTML += "<div style='background:#F2D7D5' class='square'></div> 2 - 3  <br>"
    div.innerHTML += "<div style='background:#E6B0AA' class='square'></div> 3 - 4 <br>"
    div.innerHTML += "<div style='background:#CD6155' class='square'></div> 4 - 5  <br>"
    div.innerHTML += "<div style='background:#C0392B' class='square'></div> 5 - 6 <br>"
    div.innerHTML += "<div style='background:#922B21' class='square'></div> 6 - 7  <br>"
    div.innerHTML += "<div style='background:#78281F' class='square'></div> 7 - 8 <br>"
    // class='square'
    return div;
  };
  // Add the info legend to the map.
  info.addTo(map);

 
  
          

      
      
      

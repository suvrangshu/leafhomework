
function createMarkers(response) {

  var locs = response.features;

  for (var i=0; i < locs.length; i++){

    var longitude = locs[i].geometry.coordinates[0];
    var lattitude = locs[i].geometry.coordinates[1];

    var magnitude = locs[i].properties.mag;

    var fillColour = "GreenYellow";

    if (magnitude > 1) {
      fillColour = "Yellow";
    };

    if (magnitude > 2) {
      fillColour = "Gold";
    };

    if (magnitude > 3) {
      fillColour = "Coral";
    };

    if (magnitude > 4) {
      fillColour = "Tomato";
    };

    if (magnitude > 5) {
      fillColour = "Red";
    };

    L.circle([lattitude, longitude], {
      color: "Black",
      fillColor: fillColour,
      fillOpacity: 0.75,
      weight: 1,
      radius: magnitude*20000
    }).bindPopup("<h3>Place: " + locs[i].properties.place + "</h3><h3>Magnitude: " + magnitude + "</h3>").addTo(map);    
       
  };
};


var map = L.map("map-id", {
  center: [37.79, -122.42],
  zoom: 5
});
  
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", createMarkers);


    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'legend'),
            grades = [0, 1, 2, 3, 4, 5],
            c_palette = ["#ADFF2F", "#FFFF00", "#FFD700", "#FF7F50", "#FF6347", "#FF4500"],
            labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style="background:' + c_palette[i] + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' 
                           + grades[i + 1] + '<br>' : '+');
          }
          return div;


    };
    
    legend.addTo(map);

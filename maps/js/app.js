/**
 * app.js
 * 
 * Main script for this application.
 * This application demonstrates how to build
 * and interactive map using the Leaflet.js
 * library. For more info on Leaflet, see
 * http://leafletjs.com/ 
 */

"use strict";

//OpenStreetMap tile server (no access token required)
//see http://wiki.openstreetmap.org/wiki/Tile_servers
//for more information and styles
var osmTiles = {
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
};

//Mapbox tile server (free access token required)
//see https://www.mapbox.com/api-documentation/#maps
//for a list of map styles supported by Mapbox, as well
//as full documentation about their map tiles API
var mapboxTiles = {
    accessToken: "pk.eyJ1IjoiZHJzdGVhcm5zIiwiYSI6IjE5YjliZjM1NGFlY2JkNjVhZmZkOWM1ZWJlMDQxNDUzIn0.QLK51t4IUWV7JszGbl7krA",
    url: "https://api.tiles.mapbox.com/v4/{style}/{z}/{x}/{y}.png?access_token={accessToken}",
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    styles: {
        streets: "mapbox.streets",
        light: "mapbox.light",
        dark: "mapbox.dark",
        satellite: "mapbox.satellite",
        pirates: "mapbox.pirates"
    }
};

//Seattle real time fire 911 calls API
//for more details on this API and the returned data, see 
//https://data.seattle.gov/Public-Safety/Seattle-Real-Time-Fire-911-Calls/kzjm-xkqj
var seattle911API = "https://data.seattle.gov/resource/grwu-wqtk.json?$where=datetime is not null&$order=datetime desc&$limit=500";


//the <div id="map"> element, which will contain the map
var mapDiv = document.getElementById("map");
//coordinates for seattle [latitude, longitude]
var seattleCoords = [47.61, -122.33];
//default zoom level (0-18 for street maps)
//other map styles may have different zoom ranges
var defaultZoom = 13;

var map = L.map(mapDiv).setView(seattleCoords, defaultZoom);
L.tileLayer(mapboxTiles.url, {
    attribution: mapboxTiles.attribution,
    style: mapboxTiles.styles.streets,
    accessToken: mapboxTiles.accessToken
}).addTo(map);

function onPosition(position) {
    console.log(position);
    var latlng = [position.coords.latitude, position.coords.longitude];
    var marker = L.marker(latlng).addTo(map);
    map.panTo(latlng);
}

function onPositionError(err) {
    console.error(err);
    alert(err.message);
}

if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onPosition, onPositionError, {enableHighAccuracy: true});
}

function genMarkerPopup(record) {
    var html = "<h2>" + record.type + "</h2>";
    html += "<p>" + record.address + "</p>";
    html += "<p>" + moment(record.datetime).fromNow() + "</p>";
    return html;
}

fetch(seattle911API)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        data.forEach(function(record) {
            var latlng = [record.latitude, record.longitude];
            var marker = L.circleMarker(latlng, {
                fillColor: "#F00",
                color: "#F00",
                fillOpacity: 0.5
            }).addTo(map);
            marker.bindPopup(genMarkerPopup(record));
        });
    })
    .catch(function(err) {
        console.error(err);
        alert(err.message);
    });
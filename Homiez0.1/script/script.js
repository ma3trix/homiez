
var map;
function init() {
    map = WE.map('map', {
        center: [-16.009276977493553, -65.59897974403111],
        zoom: 1,
        dragging: true,
        scrollWheelZoom: true
    });

    var baselayer = WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
        tileSize: 256,
        bounds: [[-85, -180], [85, 180]],
        minZoom: 0,
        maxZoom: 16,
        attribution: '',
        tms: true
    }).addTo(map);

    //Add TileJSON layer
    var json = {"profile": "mercator", "name": "Grand Canyon USGS", "format": "png", "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831], "minzoom": 10, "version": "1.0.0", "maxzoom": 16, "center": [-112.18688965, 36.057944835, 13], "type": "overlay", "description": "", "basename": "grandcanyon", "tilejson": "2.0.0", "sheme": "xyz", "tiles": ["http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png"]};
    var grandcanyon = WE.tileLayerJSON(json);
    grandcanyon.addTo(map);

    grandcanyon.setOpacity(0.7);
    // document.getElementById('opacity2').addEventListener('change', function(e) {
    //     grandcanyon.setOpacity(e.target.value);
    // });
    WE.marker([json.center[1], json.center[0]]).addTo(map);


    //Print coordinates of the mouse
    // map.on('mousemove', function(e) {
    //     document.getElementById('coords').innerHTML = e.latlng.lat + ', ' + e.latlng.lng;
    // });
            // Start a simple rotation animation
            var before = null;
            requestAnimationFrame(function animate(now) {
                var c = map.getPosition();
                var elapsed = before? now - before: 0;
                before = now;
                map.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
                requestAnimationFrame(animate);
            });



            // 2D Map function

          
                var m = {};
        
                start_(L, 'L');
                start_(WE, 'WE');
        
                function start_(API, suffix) {
                  var mapDiv = 'map' + suffix;
                  var map = API.map(mapDiv, {
                    center: [51.505, -0.09],
                    zoom: 4,
                    dragging: true,
                    scrollWheelZoom: true,
                    proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
                  });
                  m[suffix] = map;
        
                  //Add baselayer
                  API.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                    attribution: '© OpenStreetMap contributors'
                  }).addTo(map);
        
                  //Add TileJSON overlay
                  var json = {"profile": "mercator", "name": "Grand Canyon USGS", "format": "png", "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831], "minzoom": 10, "version": "1.0.0", "maxzoom": 16, "center": [-112.18688965, 36.057944835, 13], "type": "overlay", "description": "", "basename": "grandcanyon", "tilejson": "2.0.0", "sheme": "xyz", "tiles": ["http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png"]};
                  if (API.tileLayerJSON) {
                    var overlay2 = API.tileLayerJSON(json, map);
                  } else {
                    //If not able to display the overlay, at least move to the same location
                    map.setView([json.center[1], json.center[0]], json.center[2]);
                  }
        
                  //Add simple marker
                  var marker = API.marker([json.center[1], json.center[0]]).addTo(map);
                  marker.bindPopup(suffix, 50);
                  marker.openPopup();
        
                  //Print coordinates of the mouse
                  map.on('mousemove', function(e) {
                    document.getElementById('coords2D').innerHTML = e.latlng.lat + ', ' + e.latlng.lng;
                  });
                }
        
                //Synchronize view
                m['L'].on('move', function(e) {
                  var center = m['L'].getCenter();
                  var zoom = m['L'].getZoom();
                  m['WE'].setView([center['lat'], center['lng']], zoom);
                });
              }

              


function addSomeMarkers() {
    document.getElementById('addmarkers').disabled = true;

    map.setView([51.505, 0], 5);
    var marker = WE.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("<b>Malikbiyi</b><br>Hello World!.<br /><span style='font-size:10px;color:#999'>Bio: Same Circus Different Clowns..</span>", {maxWidth: 150, closeButton: true}).openPopup();

    var marker2 = WE.marker([30.058056, 31.228889]).addTo(map);
    marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!<br />Here, enjoy another polygon..", {maxWidth: 120, closeButton: false});

    var polygonA = WE.polygon([[50, 1], [51, 0.5], [50.5, 2.5]]).addTo(map);
    var polygonB = WE.polygon([[50, 3], [51, 2.5], [50.5, 4.5]], {
        color: '#ff0',
        opacity: 1,
        fillColor: '#f00',
        fillOpacity: 0.1,
        weight: 2
    }).addTo(map);

    var anotherPolygon = function(e) {
        WE.polygon([[30, 30], [29, 31], [30, 32], [32, 32], [31, 30]], {
            color: '#000',
            opacity: 1,
            fillColor: '#0f0',
            fillOpacity: 0.7,
            weight: 2
        }).addTo(map);
        marker2.off('click', anotherPolygon);
    };
    marker2.on('click', anotherPolygon);
}

function setZoom(zoom) {
    map.setZoom(zoom);
}

function getZoomLevel() {
    alert('Current zoom is: ' + Math.round(map.getZoom()));
}

function setPositionToEverest() {
    map.setView([27.988056, 86.925278]);
}

function getCurrentCenter() {
    alert(map.getCenter());
}

function flyToJapan() {
    map.fitBounds([[22, 122], [48, 154]]);
    map.panInsideBounds([[22, 122], [48, 154]],
        {heading: 90, tilt: 25, duration: 1});
}

function panTo(coords) {
    map.panTo(coords);
}

$(function() {
    // $('body').css('background','red');

    var inGroup = $('#Groups, .slider-wrapper');



    $('.prev').onclick(
        function() {

        inGroup.animate({left:'0'}, 300, function(){

            inGroup.css('left', '-10');

            $('.groupbox').first().before($('.groupbox').last());

        })

        });
});

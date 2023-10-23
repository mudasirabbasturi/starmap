var previewEle = document.getElementById('preview');
var frameEle = document.getElementById('frame');
var frameInnerEle = document.getElementById('frame_inner');
var frameMapEle = document.getElementById('frame_map');
var frameMessageNameEle = document.getElementById('frame_message_name');
var frameDateEle = document.getElementById('frame_date');
var frameAddressEle = document.getElementById('frame_address');
var frameCoordinatesEle = document.getElementById('frame_coordinate');


var MomentLocationEle = document.getElementById('moment_location');
var MomentDateEle = document.getElementById('moment_date');
var MomentTimeEle = document.getElementById('moment_time');
var MomentCoordinateNSELE = document.getElementById('moment_coordinates_ns');
var MomentCoordinateEWELE = document.getElementById('moment_coordinates_ew');
var NorthSouthSelectEle = document.getElementById('n_s');
var EastWestSelectEle = document.getElementById('e_w');

var TextMessageEle = document.getElementById('text_message');
var TextDateEle = document.getElementById('text_date');
var TextLocationEle = document.getElementById('text_location');
var TextCoordinatesEle = document.getElementById('text_coordinates');

if (frameEle.classList.contains('vertical')) {
    frameEle.style.height = "90%";
    frameEle.style.width = frameEle.offsetHeight / 1.33333333333 + "px";;
}

var [LAT, LON] = [36.525321, 36.8666];

function updateNSEWSelects(lat, lon) {
    var latDirection = lat >= 0 ? "N" : "S";
    var longDirection = lon >= 0 ? "E" : "W";

    NorthSouthSelectEle.value = latDirection;
    EastWestSelectEle.value = longDirection;

    var inputEvent = new Event('input', { 'bubbles': true });
    NorthSouthSelectEle.dispatchEvent(inputEvent);
    EastWestSelectEle.dispatchEvent(inputEvent);
}

function updateCoordinatesInputs(lat, lon) {
    MomentCoordinateNSELE.value = Math.abs(lat).toFixed(6);
    MomentCoordinateEWELE.value = Math.abs(lon).toFixed(6);
}

function InitMap() {
    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(MomentLocationEle),
        {
            types: ['geocode'], // Specify 'geocode' type to get detailed address information.
        }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        var formattedAddress = place.formatted_address;
        var city = "";
        for (var component of place.address_components) {
            if (component.types.includes('locality')) {
                city = component.long_name;
                break;
            }
        }
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        MomentLocationEle.value = formattedAddress;
        TextLocationEle.value = formattedAddress;
        LAT = lat;
        LON = lng;
        LAT = parseFloat(LAT.toFixed(4));
        LON = parseFloat(LON.toFixed(4));

        var formattedCoordinates = Math.abs(LAT) + "° " + NorthSouthSelectEle.value + ", " + Math.abs(LON) + "° " + EastWestSelectEle.value;
        TextCoordinatesEle.value = formattedCoordinates;
        var inputEvent = new Event('input', { 'bubbles': true });
        TextCoordinatesEle.dispatchEvent(inputEvent);

        updateNSEWSelects(LAT, LON);
        updateCoordinatesInputs(LAT, LON);
    });
}

google.maps.event.addDomListener(window, 'load', InitMap);


function applyFont(element, fontSpec) {
    if (!fontSpec) {
        $(element).css({
            fontFamily: 'inherit',
            fontWeight: 'normal',
            fontStyle: 'normal'
        });
        return;
    }
    var tmp = fontSpec.split(':'),
        family = tmp[0],
        variant = tmp[1] || '400',
        weight = parseInt(variant,10),
        italic = /i$/.test(variant);
    $(element).css({
        fontFamily: "'" + family + "'",
        fontWeight: weight,
        fontStyle: italic ? 'italic' : 'normal'
    });
}


$('.font')
  .fontpicker()
  .on('change', function() {
    var newFont = '#' + $(this).data('id');
    applyFont(newFont, this.value);
  });


var rangeEle = document.getElementsByClassName('track');
var percentEle = document.getElementsByClassName('percent');
var colorEle = document.getElementsByClassName('color');

for(let i = 0; i < rangeEle.length; i++) {
    var changeRange = rangeEle[i];
    changeRange.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + '%')
        var currentRange = e.target 
        var nextSibling = currentRange.nextElementSibling
            nextSibling.value = currentRange.value
    })
}

for(let i = 0; i < percentEle.length; i++) {
    var changePercent = percentEle[i];
    changePercent.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + '%')
        var currentNumber = e.target
        var previousSibling = currentNumber.previousElementSibling
            previousSibling.value = currentNumber.value
    })
}

for(let i = 0; i < colorEle.length; i++) {
    var changeColor = colorEle[i];
    changeColor.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value)
    })
}


frameMapEle.style.height = frameMapEle.offsetWidth + 'px';
var previewEle = document.getElementById('preview');
var frameEle = document.getElementById('frame');
var frameInnerEle = document.getElementById('frame_inner');
var frameMapEle = document.getElementById('frame_map');
var frameMessageNameEle = document.getElementById('frame_message_name');
var frameDateEle = document.getElementById('frame_date_time');
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

var frameWidth = 1133.8582677 + 'px';
var frameHeight = 1511.8110236 + 'px';
var frameMapPosition
var frameMessagePosition
var frameDatePosition
var frameAddressPosition
var frameCoordinatesPosition

window.addEventListener('load', function () {
    var pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        pageLoader.style.display = 'none';
    }
});

if (frameEle.classList.contains('vertical')) {
    // frameEle.style.height = "90%";
    // frameEle.style.width = frameEle.offsetHeight / 1.33333333333 + "px";
    
    // var originalWidth = 1133.8582677;
    // var originalHeight = 1511.8110236;
    var originalWidth = 793.7007874;
    var originalHeight = 1133.8582677;

    var aspectRatio = originalWidth / originalHeight;
    frameEle.style.height = "90%";
    frameEle.style.width = (frameEle.offsetHeight * aspectRatio) + "px";
}

var [LAT, LON] = [36.525321, 36.8666];
var DATE = new Date("2021-09-25T04:00:00+0000");
var FONT = "Raleway";

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
        frameAddressEle.innerText = formattedAddress;
        LAT = lat;
        LON = lng;
        LAT = parseFloat(LAT.toFixed(4));
        LON = parseFloat(LON.toFixed(4));

        Celestial.skyview({ "location": [LAT, LON] });

        var formattedCoordinates = Math.abs(LAT) + "° " + NorthSouthSelectEle.value + ", " + Math.abs(LON) + "° " + EastWestSelectEle.value;
        TextCoordinatesEle.value = formattedCoordinates;
        frameCoordinatesEle.innerText = formattedCoordinates;
        var inputEvent = new Event('input', { 'bubbles': true });
        TextCoordinatesEle.dispatchEvent(inputEvent);
        frameCoordinatesEle.dispatchEvent(inputEvent);

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

function formatDate(date) {
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}th ${month} ${year}`;
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    let ampm = 'AM';
    if (parseInt(hours) >= 12) {
        ampm = 'PM';
        if (parseInt(hours) > 12) {
            hours = parseInt(hours) - 12;
        }
    }
    else {
        ampm = 'AM';
    }
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
}

MomentDateEle.addEventListener('input', function() {
    const selectedDate = new Date(this.value);
    const selectedDateParts = this.value.split('-');
    const year = parseInt(selectedDateParts[0], 10);
    const month = parseInt(selectedDateParts[1], 10) - 1;
    const day = parseInt(selectedDateParts[2], 10);
    const hour = 0; 
    const minute = 0;
    DATE = new Date(Date.UTC(year, month, day, hour, minute));

    Celestial.skyview({ date: DATE });
    const formattedDate = formatDate(selectedDate);
    document.getElementById('frame_date').innerText = formattedDate;
})

MomentTimeEle.addEventListener('change', function() {
    var timeValue = MomentTimeEle.value;
    if (typeof timeValue === "undefined" || timeValue === "") {
        document.getElementById('frame_time').innerText = "";
    } 
    else {
        var [hours, minutes] = timeValue.split(':');
        var ampm = (hours >= 12) ? 'PM' : 'AM';
        if (hours > 12) {
            hours -= 12;
        } else if (hours == 0) {
            hours = 12;
        }
        var formattedTime = hours + ':' + minutes + ' ' + ampm;
        document.getElementById('frame_time').innerText = "- " + formattedTime;
    }
   
})

TextMessageEle.addEventListener('input', function() {
    frameMessageNameEle.innerText = this.value; 
})

TextDateEle.addEventListener('input', function() {
    frameDateEle.innerText = this.value; 
})

TextLocationEle.addEventListener('input', function() {
    frameAddressEle.innerText = this.value; 
})

TextCoordinatesEle.addEventListener('input', function() {
    frameCoordinatesEle.innerText = this.value; 
})



$('.font')
  .fontpicker()
  .on('change', function() {
    var newFont = '#' + $(this).data('id');
    applyFont(newFont, this.value);
  });


var rangeEle = document.getElementsByClassName('track');
var percentEle = document.getElementsByClassName('percent');
var colorEle = document.getElementsByClassName('color');
var fontSizeEle = document.getElementsByClassName('font_track');
var percentNumberEle = document.getElementsByClassName('percent_number');

for( let i = 0; i < rangeEle.length; i++ ) {
    var changeRange = rangeEle[i];
    changeRange.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + '%')
        var currentRange = e.target 
        var nextSibling = currentRange.nextElementSibling
            nextSibling.value = currentRange.value
    })
}

for( let i = 0; i < percentEle.length; i++ ) {
    var changePercent = percentEle[i];
    changePercent.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + '%')
        var currentNumber = e.target
        var previousSibling = currentNumber.previousElementSibling
            previousSibling.value = currentNumber.value
    })
}

for( let i = 0; i < colorEle.length; i++ ) {
    var changeColor = colorEle[i];
    changeColor.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value)
    })
}

for( let i = 0; i < fontSizeEle.length; i++ ) {
    var fontSize = fontSizeEle[i];
    fontSize.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + 'px')
               var currentNumber = e.target
               var previousSibling = currentNumber.previousElementSibling
                   previousSibling.value = currentNumber.value
    })
}

for( let i = 0; i < percentNumberEle.length; i++ ) {
    var fontSize = percentNumberEle[i];
    fontSize.addEventListener('input', function(e) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + 'px')
               var currentNumber = e.target
               var previousSibling = currentNumber.previousElementSibling
                   previousSibling.value = currentNumber.value
    })
}


frameMapEle.style.height = frameMapEle.offsetWidth + 'px';
  

  
  config = {
    container: "map",
    width: 700,

    form: false,
    advanced: false,
    interactive: false,
    disableAnimations: true,

    zoomlevel: null,
    zoomextend: 1,

    projection: "airy",
    transform: "equatorial",

    follow: "zenith",
    geopos: [LAT, LON],
    datapath: "https://ofrohn.github.io/data/",

    stars: {
        show: true,
        colors: false,
        size: 6,
        limit: 6,
        exponent: -0.28,
        designation: false,
        propername: false,
        propername: false,
        propernameType: "name",
        propernameStyle: {
            fill: "#ddddbb",
            font: `8px ${FONT}`,
            align: "right",
            baseline: "center"
        },
        propernameLimit: 2.0
    },

    planets: {
        show: true,
        which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep", "plu", "eri"],
        symbols: {
            "sol": { fill: "#ffff", size: "0" },
            "mer": { fill: "#ffff", size: "0" },
            "ven": { fill: "#ffff", size: "0" },
            "ter": { fill: "#ffff", size: "0" },
            "lun": { fill: "#ffff", size: "0" },
            "mar": { fill: "#ffff", size: "0" },
            "cer": { fill: "#ffff", size: "0" },
            "ves": { fill: "#ffff", size: "0" },
            "jup": { fill: "#ffff", size: "0" },
            "sat": { fill: "#ffff", size: "0" },
            "ura": { fill: "#ffff", size: "0" },
            "nep": { fill: "#ffff", size: "0" },
            "plu": { fill: "#ffff", size: "0" },
            "eri": { fill: "#ffff", size: "0" }
        },
        symbolType: "disk",
        names: false,
        nameStyle: {
            fill: "#00ccff",
            font: `14px ${FONT}`,
            align: "center",
            baseline: "top"
        },
        namesType: "en"
    },

    dsos: {
        show: false,
        names: false,
    },
    constellations: {
        show: false,
        names: false,
        desig: false,
        namestyle: {
            fill: "#ffffff", align: "center", baseline: "middle", opacity: 1,
            font: [`16px ${FONT}`, `10px ${FONT}`, `0px ${FONT}`]
        },
        lines: false,
        linestyle: { stroke: "#ffff", width: 1, opacity: 1 },
        bounds: false,
        boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
    },

    mw: {
        show: false,
        style: { fill: "#ffffff", opacity: 0.1 }
    },

    lines: {
        graticule: {
            show: false,
            stroke: "#cccccc",
            width: 0.6,
            opacity: 1,
            lon: {
                pos: [""],
                fill: "#eee",
                font: "10px Helvetica, Arial, sans-serif"
            },
            lat: {
                pos: [""],
                fill: "#eee",
                font: "10px Helvetica, Arial, sans-serif"
            }
        },
        equatorial: { show: false, stroke: "#ffff", width: 2, opacity: 1 },
        ecliptic: { show: false, stroke: "#24ACFF", width: 1.7, opacity: 1 },
        galactic: { show: false, stroke: "#cc6666", width: 1.8, opacity: 1 },
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.6, opacity: 0.7 }
    },
    background: {
        fill: "#ffffff00",
        stroke: "#ffff",
        opacity: 1,
        width: 3
    }
}
Celestial.display(config)

var showHideEle = document.getElementsByClassName('show_hide_selector');

function functionStarMapComponent() {
    for (let i = 0; i < showHideEle.length; i++) {
        const clicked = showHideEle[i];
        clicked.addEventListener('click', function () {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
            } else {
                this.classList.add("active");
            }
            if (this.classList.contains("constellations_line")) {
                config.constellations.lines = !config.constellations.lines
                Celestial.apply(config)
            }
            if (this.classList.contains("milky_way")) {
                config.mw.show = !config.mw.show
                Celestial.apply(config)
            }

            if (this.classList.contains("graticule")) {
                config.lines.graticule.show = !config.lines.graticule.show
                Celestial.apply(config)
            }

            if (this.classList.contains("constellation_name")) {
                config.constellations.names = !config.constellations.names
                Celestial.apply(config)
            }

            if (this.classList.contains("moon")) {
                config.planets.symbols["lun"].size = (config.planets.symbols["lun"].size === "40") ? "0" : "40"
                Celestial.apply(config)
            }

            if (this.classList.contains("planet_and_sun")) {
                for (var planet in config.planets.symbols) {
                    if (planet !== "lun") {
                        config.planets.symbols[planet].size = (config.planets.symbols[planet].size === "9") ? "0" : "9"
                    }
                }
                config.planets.names = !config.planets.names
                Celestial.apply(config)
            }
            if (this.classList.contains("equatorial")) {
                config.lines.equatorial.show = !config.lines.equatorial.show
                Celestial.apply(config)
            }
            if (this.classList.contains("ecliptic")) {
                config.lines.ecliptic.show = !config.lines.ecliptic.show
                Celestial.apply(config)
            }
            if (this.classList.contains("galactic")) {
                config.lines.galactic.show = !config.lines.galactic.show
                Celestial.apply(config)
            }
            if (this.classList.contains("supergalactic")) {
                config.lines.supergalactic.show = !config.lines.supergalactic.show
                Celestial.apply(config)
            }

        });
    }
}
functionStarMapComponent();

var starTrackEle = document.getElementById("star_track");
starTrackEle.addEventListener('input', function(e) {
    var currentRange = e.target 
    var nextSibling = currentRange.nextElementSibling
        nextSibling.value = currentRange.value

    config.stars.size = currentRange.value
    Celestial.apply(config)
})

var starSizeEle = document.getElementById("star_size");
starSizeEle.addEventListener('input', function(e) {
    var currentNumber = e.target
    var previousSibling = currentNumber.previousElementSibling
        previousSibling.value = currentNumber.value

    config.stars.size = currentNumber.value
    Celestial.apply(config)
})

var starDensityTrackEle = document.getElementById("star_density_track");
starDensityTrackEle.addEventListener('input', function(e) {
    var currentRange = e.target 
    var nextSibling = currentRange.nextElementSibling
        nextSibling.value = currentRange.value

    config.stars.limit = currentRange.value
    Celestial.apply(config)
})

var starDensitySizeEle = document.getElementById("star_density_size");
starDensitySizeEle.addEventListener('input', function(e) {
    var currentNumber = e.target
    var previousSibling = currentNumber.previousElementSibling
        previousSibling.value = currentNumber.value
    config.stars.limit = currentNumber.value
    Celestial.apply(config)
})

function convertToImgDownload() {
    document.getElementById('loader').style.visibility = "visible";
    const dpi = 1500;
    const scale = dpi / 96;
    setTimeout(function() {
      html2canvas(frameEle, {
        scale: scale,
        logging: true,
      }).then(function (canvas) {
        const img = new Image();
        img.src = canvas.toDataURL("image/jpg");
        img.onload = function () {
          const a = document.createElement("a");
          a.href = img.src;
          a.download = "Star_Map.jpg";
          a.style.display = "none"; 
          const downloadPromise = new Promise((resolve) => {
            a.addEventListener('click', () => {
              document.body.removeChild(a);
              resolve();
            });
          });
          document.body.appendChild(a);
          a.click();
          downloadPromise.then(() => {
            document.getElementById('loader').style.visibility = "hidden";
          });
        };
      });
    }, 0);
  }

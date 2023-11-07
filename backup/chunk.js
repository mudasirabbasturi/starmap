elestialConfig: {
    container: "celestial-map1",
    width: 0,
    projection: "stereographic",
    controls: !1,
    orientationfixed: !0,
    follow: "zenith",
    disableAnimations: !1,
    zoomlevel: 3,
    stars: {
        colors: !1,
        size: 10,
        limit: 6,
        exponent: -.26,
        designation: !1,
        style: {
            fill: "#000000",
            opacity: 1
        },
        propername: !1,
        propernameType: "name",
        propernameStyle: {
            fill: "#172327",
            font: "14px Helvetica, Arial, sans-serif",
            align: "center",
            baseline: "center"
        },
        propernameLimit: 2
    },
    dsos: {
        show: !1,
        size: 6,
        designation: !1,
        propername: !1,
        data: "dsos.6.json"
    },
    constellations: {
        names: !1,
        namesType: "en",
        nameStyle: {
            fill: "#000000",
            align: "center",
            baseline: "middle",
            font: ["30px Helvetica, Arial, sans-serif", "20px Helvetica, Arial, sans-serif", "18px Helvetica, Arial, sans-serif"]
        },
        lines: !0,
        lineStyle: {
            stroke: "#000000",
            width: 2,
            opacity: .6
        },
        bounds: !1,
        boundStyle: {
            stroke: "#cccc00",
            width: .5,
            opacity: .8,
            dash: [2, 4]
        }
    },
    planets: {
        show: !1,
        which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
        symbolType: "disk",
        symbols: {
            sol: {
                symbol: "☉",
                letter: "Su",
                fill: "#ffff00",
                size: "24"
            },
            mer: {
                symbol: "☿",
                letter: "Me",
                fill: "#cccccc"
            },
            ven: {
                symbol: "♀",
                letter: "V",
                fill: "#eeeecc"
            },
            ter: {
                symbol: "⊕",
                letter: "T",
                fill: "#00ccff"
            },
            lun: {
                symbol: "●",
                letter: "L",
                fill: "#ffffff",
                size: "24"
            },
            mar: {
                symbol: "♂",
                letter: "Ma",
                fill: "#ff6600"
            },
            cer: {
                symbol: "⚳",
                letter: "C",
                fill: "#cccccc"
            },
            ves: {
                symbol: "⚶",
                letter: "Ma",
                fill: "#cccccc"
            },
            jup: {
                symbol: "♃",
                letter: "J",
                fill: "#ffaa33"
            },
            sat: {
                symbol: "♄",
                letter: "Sa",
                fill: "#ffdd66"
            },
            ura: {
                symbol: "♅",
                letter: "U",
                fill: "#66ccff"
            },
            nep: {
                symbol: "♆",
                letter: "N",
                fill: "#6666ff"
            },
            plu: {
                symbol: "♇",
                letter: "P",
                fill: "#aaaaaa"
            },
            eri: {
                symbol: "⚪",
                letter: "E",
                fill: "#eeeeee"
            }
        },
        names: !0,
        nameStyle: {
            fill: "#cccccc",
            font: "17px 'Lucida Sans Unicode', 'DejaVu Sans'",
            align: "right",
            baseline: "top"
        },
        namesType: "desig"
    },
    mw: {
        show: !1
    },
    lines: {
        graticule: {
            show: !0,
            stroke: "#cccccc",
            width: 2,
            opacity: .8,
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
        equatorial: {
            show: !0,
            stroke: "#aaaaaa",
            width: 1.3,
            opacity: .7
        },
        ecliptic: {
            show: !1,
            stroke: "#66cc66",
            width: 1.3,
            opacity: .7
        },
        galactic: {
            show: !1,
            stroke: "#cc6666",
            width: 1.3,
            opacity: .7
        },
        supergalactic: {
            show: !1,
            stroke: "#cc66cc",
            width: 1.3,
            opacity: .7
        }
    },
    background: {
        fill: "#ffffff",
        opacity: 1,
        stroke: "rgba(0,0,0,0.5)",
        width: 1.5
    }
},
celestialConfigReset: {
    container: "celestial-map1",
    width: 0,
    projection: "stereographic",
    controls: !1,
    orientationfixed: !0,
    follow: "zenith",
    disableAnimations: !1,
    zoomlevel: 3,
    stars: {
        colors: !1,
        size: 3,
        limit: 6,
        exponent: -.26,
        designation: !0,
        style: {
            fill: "#000000",
            opacity: 1
        },
        propername: !0,
        propernameType: "name",
        propernameStyle: {
            fill: "#172327",
            font: "10px Helvetica, Arial, sans-serif",
            align: "center",
            baseline: "center"
        },
        propernameLimit: 2
    },
    dsos: {
        show: !1,
        size: 6,
        designation: !1,
        propername: !1,
        data: "dsos.6.json"
    },
    constellations: {
        names: !0,
        namesType: "en",
        nameStyle: {
            fill: "#000000",
            align: "center",
            baseline: "middle",
            font: ["14px Helvetica, Arial, sans-serif", "12px Helvetica, Arial, sans-serif", "11px Helvetica, Arial, sans-serif"]
        },
        lines: !0,
        lineStyle: {
            stroke: "#000000",
            width: 1,
            opacity: .6
        },
        bounds: !1,
        boundStyle: {
            stroke: "#cccc00",
            width: .5,
            opacity: .8,
            dash: [2, 4]
        }
    },
    planets: {
        show: !1,
        which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
        symbolType: "disk",
        symbols: {
            sol: {
                symbol: "☉",
                letter: "Su",
                fill: "#ffff00",
                size: "24"
            },
            mer: {
                symbol: "☿",
                letter: "Me",
                fill: "#cccccc"
            },
            ven: {
                symbol: "♀",
                letter: "V",
                fill: "#eeeecc"
            },
            ter: {
                symbol: "⊕",
                letter: "T",
                fill: "#00ccff"
            },
            lun: {
                symbol: "●",
                letter: "L",
                fill: "#ffffff",
                size: "24"
            },
            mar: {
                symbol: "♂",
                letter: "Ma",
                fill: "#ff6600"
            },
            cer: {
                symbol: "⚳",
                letter: "C",
                fill: "#cccccc"
            },
            ves: {
                symbol: "⚶",
                letter: "Ma",
                fill: "#cccccc"
            },
            jup: {
                symbol: "♃",
                letter: "J",
                fill: "#ffaa33"
            },
            sat: {
                symbol: "♄",
                letter: "Sa",
                fill: "#ffdd66"
            },
            ura: {
                symbol: "♅",
                letter: "U",
                fill: "#66ccff"
            },
            nep: {
                symbol: "♆",
                letter: "N",
                fill: "#6666ff"
            },
            plu: {
                symbol: "♇",
                letter: "P",
                fill: "#aaaaaa"
            },
            eri: {
                symbol: "⚪",
                letter: "E",
                fill: "#eeeeee"
            }
        },
        names: !0,
        nameStyle: {
            fill: "#cccccc",
            font: "17px 'Lucida Sans Unicode', 'DejaVu Sans'",
            align: "right",
            baseline: "top"
        },
        namesType: "desig"
    },
    mw: {
        show: !1
    },
    lines: {
        graticule: {
            show: !0,
            stroke: "#cccccc",
            width: 2,
            opacity: .8,
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
        equatorial: {
            show: !0,
            stroke: "#aaaaaa",
            width: 1.3,
            opacity: .7
        },
        ecliptic: {
            show: !1,
            stroke: "#66cc66",
            width: 1.3,
            opacity: .7
        },
        galactic: {
            show: !1,
            stroke: "#cc6666",
            width: 1.3,
            opacity: .7
        },
        supergalactic: {
            show: !1,
            stroke: "#cc66cc",
            width: 1.3,
            opacity: .7
        }
    },
    background: {
        fill: "#ffffff",
        opacity: 1,
        stroke: "rgba(0,0,0,0.5)",
        width: 1.5
    }
}
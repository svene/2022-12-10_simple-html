import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

export const showPlot = () => {
    const data = [
        {
            "name": "sven",
            "sd": 1,
            "ed": 10,
            "y1": 0,
            "y2": 0.5,
            "fill": "green",
        },
        {
            "name": "laura",
            "sd": 5,
            "ed": 10,
            "y1": 1.0,
            "y2": 1.5,
            "fill": "red",
        },
        {
            "name": "laura",
            "sd": 6,
            "ed": 10,
            "y1": 2.0,
            "y2": 2.5,
            "fill": "red",
        },
        {
            "name": "laura",
            "sd": 7,
            "ed": 10,
            "y1": 3.0,
            "y2": 3.5,
            "fill": "red",
        },
        {
            "name": "laura",
            "sd": 8,
            "ed": 10,
            "y1": 4.0,
            "y2": 4.5,
            "fill": "red",
        },
        {
            "name": "laura",
            "sd": 9,
            "ed": 10,
            "y1": 5.0,
            "y2": 5.5,
            "fill": "red",
        },
        {
            "name": "laura",
            "sd": 10,
            "ed": 11,
            "y1": 6.0,
            "y2": 6.5,
            "fill": "red",
        },
    ];

    const plot = Plot.plot({
        marks: [
            Plot.rect(data, {x1: "sd", x2: "ed", y1: "y1", y2: "y2", fill: "fill", label: "name"}),
            Plot.text(data, {x: "sd", y: "y1", text: "name"}),
        ]
    });

    const div = document.querySelector("#myplot");
    div.append(plot);
}

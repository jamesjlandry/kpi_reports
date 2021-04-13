import React, { useEffect, useRef } from 'react';
import { Doughnut, Chart } from 'react-chartjs-2'

let PieChart = (props) => {

    
    
    let total = props.total
    let pieTotal = "Total" 

    if(props.totalCount) {
        pieTotal = props.totalCount
    }
    

    const data = {
        labels: [],
        datasets: [
            {
                data: [

                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9',
                    'rgba(54, 162, 235, 0.9',
                    'rgba(255, 206, 86, 0.9',
                    'rgba(255,159,64, 0.9',
                    'rgba(75, 192, 192, 0.9',
                    'rgba(153, 102, 255, 0.9'
                ]
            }
        ]
    }

    const techKeys = Object.keys(props.tData)

    techKeys.forEach(key => {
        data.labels.push(key)
        data.datasets[0].data.push(props.tData[key])
    })

    const lineOptions = {
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        plugins: {
            display: true,
            backgroundColor: '#ccc',
            borderRadius: 3,
            font: {
                color: 'black',
                weight: 'bold'
            }
        },
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 30,
                bottom: 50
            },
        },
        animation: {
            duration: 0,
            onComplete: function () {
                renderLabels(this.chart, props.tData)
            }
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        }
    }

    return (
        <div>
            { total ?
                <div className="total">
                    <Doughnut
                        data={data}
                        options={lineOptions}

                    />

                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -80%)' }}>
                        {pieTotal}
                        <p style={{fontSize: 10}}>
                            Total
                        </p>
                    </div>
                </div>
                :

                <div className="doughnut">
                    <Doughnut
                        data={data}
                        options={lineOptions}

                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -80%)' }}>
                        {pieTotal}
                        <p style={{fontSize: 10}}>
                            Total
                        </p>
                    </div>

                </div>}

        </div>
    )
}


function renderLabels(chartInstance, data) {
    let radian = 0;
    let middleRadian;
    let ctx = chartInstance.ctx;
    let dataLabels = Object.keys(data)

    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.defaultFontFamily = 'PingFangTC';
    Chart.defaults.global.defaultFontStyle = '400';
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';


    let canvasWidth = chartInstance.chartArea.right
    let canvasHeight = chartInstance.chartArea.bottom

    let chart = {
        radius: (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2,
        labelRadius: (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2 + 20,
        midPoint: {
            y: (canvasHeight + 50) / 2,
            x: canvasWidth / 2
        }
    }


    let meta = chartInstance.controller.getDatasetMeta(0);

    // Create an object to represent each label
    // The object will be used to encapsulate the calculation of the
    //      position of the label given the radian of the label
    let labels = meta.data.map(function (bar, index) {
        let label = dataLabels[index]
        let value = data[label];
        let centerAngle = bar._model.circumference;
        radian = radian + centerAngle;
        middleRadian = radian - centerAngle / 2
        let dataPercentage = (((value / meta.total) * 100)).toFixed(1)
        let dataName = bar._model.label

        const text = dataName + ':' + dataPercentage + '%'
        const size = ctx.measureText(text)

        // let fillStyle = parseFloat(dataPercentage) > 50 ? 'black' : 'red'
        let fillStyle = 'black'

        return new Label({ chart, radian: middleRadian, text, size, fillStyle })
    });

    // Keep spreading the labels out until they no longer overlap
    let overlapping = findOverlapping(labels)
    while (overlapping) {
        let [label1, label2] = overlapping
        label1.radian -= 0.1
        label2.radian += 0.1
        overlapping = findOverlapping(labels)
    }

    // Draw the labels after we've finalized the label location
    labels.forEach(label => {
        ctx.fillStyle = label.fillStyle
        ctx.fillText(label.text, label.x, label.y);
    })


}


class Label {

    constructor({ chart, radian, text, size, fillStyle = 'black' }) {
        this.chart = chart
        this.originalRadian = radian
        this.radian = radian
        this.text = text
        this.size = size

        this.fillStyle = fillStyle
    }

    get x() {
        let { midPoint, labelRadius } = this.chart
        return midPoint.x + Math.sin(this.radian) * labelRadius;
    }

    get y() {
        let { midPoint, labelRadius } = this.chart
        return midPoint.y - Math.cos(this.radian) * labelRadius;
    }

    get leftSide() {
        return this.x - this.size.width / 2
    }

    get rightSide() {
        return this.x + this.size.width / 2
    }

    get topSide() {
        return this.y - 12
    }

    get bottomSide() {
        return this.y
    }

    get chartSurface() {
        const { midPoint, radius } = this.chart
        return {
            x: midPoint.x + Math.sin(this.originalRadian) * (radius),
            y: midPoint.y - Math.cos(this.originalRadian) * (radius)
        }
    }

}

function findOverlapping(labels) {
    for (let label1 of labels) {
        for (let label2 of labels) {
            if (label1 !== label2 && isOverlapping(label1, label2)) return [label1, label2]
        }
    }
    return null
}

function isOverlapping(label1, label2) {
    return (
        // label cannot collide with itself
        label1 !== label2
        &&
        (label1.leftSide < label2.rightSide &&
            label1.rightSide > label2.leftSide &&
            label1.topSide < label2.bottomSide &&
            label1.bottomSide > label2.topSide)
    )
}

export default PieChart
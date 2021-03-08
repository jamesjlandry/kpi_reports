import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2'

let PieChart = (props) => {

let total = props.total

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
        tooltips: {
            enabled: true,
            callbacks: {
                label: function (tooltipItem, data) {

                    let dataset = data.datasets[tooltipItem.datasetIndex];
                    let total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    let currentValue = dataset.data[tooltipItem.index];
                    let percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return percentage + "%";
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                },


            },

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
            duration: 1,
            onComplete: function () {
                let chartInstance = this.chart, radian = 0, middleRadian,
                    ctx = chartInstance.ctx;

                function drawLine(pointA, pointB) {
                    ctx.beginPath();
                    ctx.moveTo(pointA.x, pointA.y);
                    ctx.lineTo(pointB.x, pointB.y);
                    ctx.stroke()
                }

                Chart.defaults.global.defaultFontSize = 12;
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

                this.data.datasets.forEach(function (dataset, i) {
                    let meta = chartInstance.controller.getDatasetMeta(i);

                    let labels = meta.data.map(function (bar, index) {
                        let data = dataset.data[index], dataPercentage, dataName;
                        let centerAngle = bar._model.circumference;
                        radian = radian + centerAngle;
                        middleRadian = radian - centerAngle / 2
                        dataPercentage = Math.floor(((data / meta.total) * 100) + 0.5)
                        dataName = bar._model.label

                        const text = dataName + ':' + dataPercentage + '%'
                        const size = ctx.measureText(text)

                        return Label.for({ chart, at: middleRadian, text, size })
                    });

                    let overlapping = findOverlapping(labels)
                    while (overlapping) {
                        let [label1, label2] = overlapping
                        label1.radian -= 0.1
                        label2.radian += 0.1
                        overlapping = findOverlapping(labels)
                    }

                    labels.forEach(label => {

                        // drawLine(label, label.chartSurface)

                        ctx.fillStyle = '#222'
                        ctx.fillText(label.text, label.x, label.y);
                    })


                });
            }
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


                    </div>
                : 
                    <div className="doughnut">
                    <Doughnut
                        data={data}
                        options={lineOptions}
                    />


                </div>}

        </div>
       
    

    )
}

class Label {

    constructor({ chart, radian, text, size }) {
        this.chart = chart
        this.originalRadian = radian
        this.radian = radian
        this.text = text
        this.size = size
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

    static for({ chart, at: radian, text, size }) {
        return new Label({ chart, radian, text, size })
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


// function measureText(text){
//     const { defaultFontSize, defaultFontFamily } = Chart.defaults.global
//     const temp = document.createElement('span')
//     temp.style.fontFamily = defaultFontFamily
//     temp.style.fontSize = defaultFontSize
//     // temp.style.opacity = 0
//     temp.textContent = text
//     document.body.append(temp)
//     let size = temp.getBoundingClientRect()
//     // temp.remove()
//     return size
// }

export default PieChart
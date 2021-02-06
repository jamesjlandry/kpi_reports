import React from 'react';
import { Pie, Doughnut, Chart } from 'react-chartjs-2'

 let PieChart = (props) => {


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

    techKeys.forEach( key => {
        data.labels.push(key)
        data.datasets[0].data.push(props.tData[key])
    })

   console.log(data)

    const lineOptions ={
        maintainAspectRatio: true,
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
            top:50,
            bottom:20
        },
        
      },
      animation: {
        duration: 1,
        onComplete: function () {
            let chartInstance = this.chart,radian = 0,tmpRadian,middleRadian,
            ctx = chartInstance.ctx;
            Chart.defaults.global.defaultFontSize = 12 ;
            Chart.defaults.global.defaultFontFamily = 'PingFangTC';
            Chart.defaults.global.defaultFontStyle = '400';
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
     
            this.data.datasets.forEach(function (dataset, i) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index],x,y,r,dataPercentage,canvasWidth,canvasHeight,dataName,centerAngle;  
                    r = (chartInstance.chartArea.bottom-chartInstance.chartArea.top)/2+20;
                    // arc length
                    centerAngle = bar._model.circumference;
                     // arc center
                    radian = radian + centerAngle;
                    tmpRadian = radian;
                    middleRadian = tmpRadian - centerAngle/2
                     // x, y coordinates
                    canvasWidth = bar._chart.chartArea.right
                    canvasHeight = bar._chart.chartArea.bottom 
                    x = canvasWidth/2 + Math.sin(middleRadian) * r ;
                    y = (canvasHeight+60)/2 -  Math.cos(middleRadian) * r ;
                     // Percentage
                    dataPercentage =  Math.floor(((data/meta.total) * 100) + 0.5)
                    dataName = bar._model.label
                    ctx.fillStyle = '#222'
                    ctx.fillText(dataName+':'+dataPercentage+'%',x,y,50);
                                
                });
            });             
        }
    }
      
        
    }
    
    return (
        <div>
            <Doughnut
                data = {data}
                options={lineOptions}
            />
           
            
        </div>
        
    )
}


export default PieChart
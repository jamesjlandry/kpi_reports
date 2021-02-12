import React from 'react'
import { Bar} from 'react-chartjs-2'

let BarChart= (props) => {

    

    const data = {
        labels: [],
       
        datasets: [
            {   label: "Positive Ultrasound %",
                data: [

                ],
                
                
                backgroundColor: [
                    'rgba(75, 192, 192, 0.9',
                    'rgba(153, 102, 255, 0.9',
                    'rgba(255, 99, 132, 0.9',
                    'rgba(54, 162, 235, 0.9',
                    'rgba(255, 206, 86, 0.9',
                    'rgba(255,159,64, 0.9',
                    
                    
                ],
            }
            
        ],
      
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    
                }
            }]
        }
        
    }

    const keys = Object.keys(props.data)

    keys.forEach(key => {
        data.labels.push(key)
        let rate = (props.data[key]["rate"]).toFixed(2)*100
        
        data.datasets[0].data.push(rate)
    })

    
    return (
        <div>
            <Bar
            data={data}
            options={options}
            />
        </div>
    )

}

export default BarChart
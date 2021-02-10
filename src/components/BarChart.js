import React from 'react'
import { Bar} from 'react-chartjs-2'

let BarChart= (props) => {

    

    const data = {
        labels: [],
        datasets: [
            {
                data: [

                ],
                
                
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                },
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

    const keys = Object.keys(props.data)

    keys.forEach(key => {
        data.labels.push(key)
        let useable = (props.data[key]["Useable"]).toFixed(2)*100
        
        data.datasets[0].data.push(useable)
    })

    
    return (
        <div>
            <Bar
            data={data}
            />
        </div>
    )

}

export default BarChart
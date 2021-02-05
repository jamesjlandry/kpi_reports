import React, {useEffect} from 'react'
import PieChart from './PieChart'

let CleavageRates = (props) => {

    let techs = Object.keys(props.cleaveData)

    return (
        <div>
            <div>
                {techs.map( tech => <div> {tech} <PieChart key={`${tech}_cleave`} data={{
                    labels: ["Good", "Poor", "Discarded"],
                    datasets: [
                        {
                            data: [
                                props.cleaveData[tech]["Good"],
                                props.cleaveData[tech]["Poor"],
                                props.cleaveData[tech]["Discarded"]
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.9',
                                'rgba(54, 162, 235, 0.9',
                                'rgba(255, 206, 86, 0.9'
                              ]
                        }
                    ]

                }} /> </div>)}
            </div>
        </div>

    )




}

export default CleavageRates
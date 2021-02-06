import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    return(
        <div>
            <div>
                {/* {docs.map(doc => <div> <PieChart key={`${doc}_preg`} data={{
                    labels: ["Good", "Poor", "Discarded"],
                    datasets: [
                        {
                            data: [
                                props.pregData[doc]["Good"],
                                props.pregData[doc]["Poor"],
                                props.pregData[doc]["Discarded"]
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.9',
                                'rgba(54, 162, 235, 0.9',
                                'rgba(255, 206, 86, 0.9'
                                ]
                        }
                    ]
                }}
                
                
                /></div>)}
                {vitTechs.map( vTech => <div>  <PieChart key={`${vTech}_preg`} data={{
                    labels: ["Good", "Poor", "Discarded"],
                    datasets: [
                        {
                            data: [
                                props.pregData[vTech]["Good"],
                                props.pregData[vTech]["Poor"],
                                props.pregData[vTech]["Discarded"]
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.9',
                                'rgba(54, 162, 235, 0.9',
                                'rgba(255, 206, 86, 0.9'
                                ]
                        }
                    ]
                }} /> </div>)} */}
            </div>
        </div>
    )


}

export default PregnancyRates
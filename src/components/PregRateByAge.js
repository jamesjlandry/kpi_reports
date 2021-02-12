import React from 'react';
import PieChart from './PieChart'


let PregRateByAge = (props) => {

    const ages = Object.keys(props.pregData)

    return (
        <div>
            <div>
                {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  tData={props.pregData[age]} /> </div>)}
            </div>
        </div>
    )

}

export default PregRateByAge
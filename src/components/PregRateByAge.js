import React from 'react';
import PieChart from './PieChart'


let PregRateByAge = (props) => {

    const ages = Object.keys(props.pregData)

    return (
        <div>
            <div>
                {ages.map(age => <div> {age} <PieChart key={`${age}_age_rate`} tData={props.pregData[age]} /> </div>)}
            </div>
        </div>
    )

}

export default PregRateByAge
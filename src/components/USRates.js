import React from 'react';
import PieChart from './PieChart'


let USRates = (props) => {

    const ages = Object.keys(props.uSData)

    return (
        <div>
            <div>
                {ages.map(age => <div> {age} <PieChart key={`${age}_age_rate`} tData={props.uSData[age]} /> </div>)}
            </div>
        </div>
    )

}

export default USRates
import React from 'react';
import PieChart from './PieChart'


let USRates = (props) => {

    const ages = Object.keys(props.uSData)

    return (
        <div>
            <div className="pie_wrapper">
                {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  tData={props.uSData[age]} /> </div>)}
            </div>
        </div>
    )

}

export default USRates
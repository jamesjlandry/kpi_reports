import React from 'react';
import PieChart from './PieChart'


let USRates = (props) => {

 

    let ages = []
    
    for (let key in props.ultraSoundData) {
        if(key !== "Total") {
            ages.push(key)
        }
    }

    return (
        <div>
            <div className="chart_header">
                Ultrasound Rates
            </div>
            <div className="pie_wrapper">
            <div className="pie_total">
                    <div className="total_label">
                        Total
                    </div>
                    <PieChart  tData={props.ultraSoundData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  tData={props.ultraSoundData[age]} /> </div>)}
                </div>
            </div>
        </div>
    )

}

export default USRates
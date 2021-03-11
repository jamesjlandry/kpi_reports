import React from 'react';
import PieChart from './PieChart'


let USRates = (props) => {

 

    let ages = []
    console.log(props.uSData)
    for (let key in props.uSData) {
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
                    <PieChart  tData={props.uSData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  tData={props.uSData[age]} /> </div>)}
                </div>
            </div>
        </div>
    )

}

export default USRates
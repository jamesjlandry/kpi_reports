import React from 'react';
import PieChart from './PieChart'


let PregRateByAge = (props) => {

   
    let ages = []
   
    for (let key in props.pregData) {
        if(key !== "Total") {
            ages.push(key)
        }
    }


    ages.forEach(age => {

    })

    return (
        <div>
            <div className="chart_header">
                Pregnancy Rates by Age
            </div>
            <div className="pie_wrapper">
                <div className="pie_total">
                    <div className="total_label">
                        Total
                    </div>
                    <PieChart  tData={props.pregData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                    {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  tData={props.pregData[age]} /> </div>)}
                </div>
            </div>
        </div>
    )

}

export default PregRateByAge
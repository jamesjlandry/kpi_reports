import React from 'react';
import PieChart from './PieChart'


let PregRateByAge = (props) => {

 
    let ages = []
    let ageCount = {}
   
    for (let key in props.pregData) {
        if(key !== "Total") {
            ages.push(key)
        }
        ageCount[key] = (props.pregData[key]["Neg"] + props.pregData[key]["Pos"] + props.pregData[key]["BC"])
    }


 

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
                    <PieChart totalCount={ageCount["Total"]} tData={props.pregData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                    {ages.map(age => <div key={`${age}_age_rate`}> {age} <PieChart  totalCount={ageCount[age]} tData={props.pregData[age]} /> </div>)}
                </div>
            </div>
        </div>
    )

}

export default PregRateByAge
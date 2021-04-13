import React from 'react'
import PieChart from './PieChart'


let FertRates = (props) => {

    let techs = []
    let techCount = {}
    
    for (let key in props.fertData) {
        if(key !== "Total") {
            techs.push(key)
        }
        techCount[key] = (props.fertData[key]["2PN"] + props.fertData[key]["0PN"] + props.fertData[key]["1PN"] + props.fertData[key][">2PN"] + props.fertData[key]["Degen"])
    }
    
    
   
    
   
    return (
        <div>
           <div className="chart_header">
               Fertility Rates
           </div>
            <div className="pie_wrapper">
                <div className="pie_total">
                    <div className="total_label">
                        Total
                    </div>
                    <PieChart  totalCount={techCount["Total"]} tData={props.fertData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                    {techs.map(tech => <div key={`${tech}_fert`}> {tech} <PieChart  totalCount={techCount[tech]} tData={props.fertData[tech]} /></div>)}
                </div>
            </div>
        </div>
    )
}

export default FertRates
import React from 'react'
import PieChart from './PieChart'


let FertRates = (props) => {

    let techs = []
    console.log(props.fertData)
    for (let key in props.fertData) {
        if(key !== "Total") {
            techs.push(key)
        }
    }
    
    
   
    
   
    return (
        <div>
           
            <div className="pie_wrapper">
                <div className="pie_total">
                    <div className="total_label">
                        Total
                    </div>
                    <PieChart  tData={props.fertData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                    {techs.map(tech => <div key={`${tech}_fert`}> {tech} <PieChart  tData={props.fertData[tech]} /></div>)}
                </div>
            </div>
        </div>
    )
}

export default FertRates
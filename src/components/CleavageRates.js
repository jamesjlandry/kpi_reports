import React from 'react'
import PieChart from './PieChart'

const CleavageRates = (props) => {

    let techs = []
    
    for (let key in props.cleaveData) {
        if(key !== "Total") {
            techs.push(key)
        }
    }

    

    

    return (
       
        <div>
           
            <div className="chart_header">
                Cleavage Rates
            </div>
            <div className="pie_wrapper">
            <div className="pie_total">
                    <div className="total_label">
                        Total
                    </div>
                    <PieChart  tData={props.cleaveData["Total"]} total={true}/>
                </div>
                <div className="tech_donut" >
                    {techs.map( tech => <div key={`${tech}_cleave`}> {tech} <PieChart  tData={props.cleaveData[tech]} /> </div>)}
                </div>
                
            </div>
        </div>

    )




}

export default CleavageRates
import React from 'react'
import PieChart from './PieChart'


let FertRates = (props) => {
    let techs = Object.keys(props.fertData)
    
   
    
   
    return (
        <div>
           
            <div>
                {techs.map(tech => <div key={`${tech}_fert`}> {tech} <PieChart  tData={props.fertData[tech]} /></div>)}
            </div>
        </div>
    )
}

export default FertRates
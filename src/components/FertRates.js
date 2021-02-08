import React from 'react'
import PieChart from './PieChart'


let FertRates = (props) => {
    let techs = Object.keys(props.fertData)
    
   
    
   
    return (
        <div>
           
            <div>
                {techs.map(tech => <div> {tech} <PieChart key={`${tech}_data`} tData={props.fertData[tech]} /></div>)}
            </div>
        </div>
    )
}

export default FertRates
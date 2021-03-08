import React from 'react'
import PieChart from './PieChart'

const CleavageRates = (props) => {

    let techs = Object.keys(props.cleaveData)

    return (
        <div>
            <div className="pie_wrapper">
                {techs.map( tech => <div key={`${tech}_cleave`}> {tech} <PieChart  tData={props.cleaveData[tech]} /> </div>)}
            </div>
        </div>

    )




}

export default CleavageRates
import React from 'react'
import PieChart from './PieChart'

const CleavageRates = (props) => {

    let techs = Object.keys(props.cleaveData)

    return (
        <div>
            <div>
                {techs.map( tech => <div> {tech} <PieChart key={`${tech}_cleave`} tData={props.cleaveData[tech]} /> </div>)}
            </div>
        </div>

    )




}

export default CleavageRates
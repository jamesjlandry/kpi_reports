import React from 'react';
import BarChart from './BarChart'


let BlastRates = (props) => {

    const techs = Object.keys(props.blastData)
    

    return (
        <div>
            <div className="bar_wrapper">
                {techs.map(tech => <div key={`${tech}_blast_rate`}> {tech} <BarChart  tData={props.blastData[tech]} /> </div>)}
            </div>
        </div>
    )

}

export default BlastRates
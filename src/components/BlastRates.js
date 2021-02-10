import React from 'react';
import BarChart from './BarChart'


let BlastRates = (props) => {

    const techs = Object.keys(props.blastData)

    return (
        <div>
            <div>
                {techs.map(tech => <div> {tech} <BarChart key={`${tech}_blast_rate`} tData={props.blastData[tech]} /> </div>)}
            </div>
        </div>
    )

}

export default BlastRates
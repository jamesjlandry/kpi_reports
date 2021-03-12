import React from 'react'



let MiscKPIs = (props) => {

    const bioResKeys = Object.keys(props.data.bioRes)
    const eupKeys = Object.keys(props.data.eupRate)
    const emWSurvKeys = Object.keys(props.data.embWSurv)
    const avgRateTransKeys = Object.keys(props.data.aReTaG)

    console.log(props)
    return (
        <div>
            <div className="chart_header">
                Misc KPIs
            </div>
            <div>
                Biopsy Result 
            </div>
            <div>
                {bioResKeys.map(tech => <div key={`${tech}_bioRes`}> <div>{tech}: {props.data.bioRes[tech]}</div></div>)}
            </div>
            Euploid Rate
            <div>
                {eupKeys.map(tech => <div key={`${tech}_eupRate`}> <div> {tech}: {(props.data.eupRate[tech].rate *100).toFixed(0)}%</div></div>)}
            </div>
            Embryo Warm Survival Rate
            <div>
                {emWSurvKeys.map(tech => <div key={`${tech}_emWSurv`}> <div> {tech}: {(props.data.embWSurv[tech].rate *100).toFixed(0)}%</div></div>)}
            </div>
            Avg Rate of Embryo Transfer
            <div>
                {avgRateTransKeys.map(age => <div key={`${age}_transRate`}> <div> {age}: {props.data.aReTaG[age].rate.toFixed(1)} </div></div>)}
            </div>
        </div>
    )


}

export default MiscKPIs
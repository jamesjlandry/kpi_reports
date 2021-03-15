import React from 'react'



let MiscKPIs = (props) => {

    const bioResKeys = Object.keys(props.data.bioRes)
    const eupKeys = Object.keys(props.data.eupRate)
    const emWSurvKeys = Object.keys(props.data.embWSurv)
    const avgRateTransKeys = Object.keys(props.data.aReTaG)

   
    return (
        <div>
            <div className="chart_header">
                Misc KPIs
            </div>
            <div className="misc_padding">
            <div className="misc_kpi_type">
                Biopsy Result 
            </div>
            <div>
                {bioResKeys.map(tech => <div key={`${tech}_bioRes`}  > <div className="misc_kpi_tech"> <div className="misc_kpi_tech_identifier">{tech}:</div> <div>{props.data.bioRes[tech]}</div></div></div>)}
            </div>
            <div className="misc_kpi_type">
                Euploid Rate
            </div>
            <div>
                {eupKeys.map(tech => <div key={`${tech}_eupRate`} > <div className="misc_kpi_tech"> <div className="misc_kpi_tech_identifier">{tech}:</div> <div>{(props.data.eupRate[tech].rate *100).toFixed(0)}%</div></div></div>)}
            </div>
            <div className="misc_kpi_type">
                Embryo Warm Survival Rate
            </div>
            
            <div>
                {emWSurvKeys.map(tech => <div key={`${tech}_emWSurv`} > <div className="misc_kpi_tech"> <div className="misc_kpi_tech_identifier">{tech}:</div> <div>{(props.data.embWSurv[tech].rate *100).toFixed(0)}%</div></div></div>)}
            </div>
            <div className="misc_kpi_type">
                Avg Rate of Embryo Transfer
            </div>
            <div>
                {avgRateTransKeys.map(age => <div key={`${age}_transRate`} > <div className="misc_kpi_tech"> <div className="misc_kpi_tech_identifier">{age}:</div> <div>{props.data.aReTaG[age].rate.toFixed(1)}</div> </div></div>)}
            </div>
            </div>
        </div>
    )


}

export default MiscKPIs
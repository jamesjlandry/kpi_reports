import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    let docs = Object.keys(props.pregData["Trans Doctor"])
    let vitTechs = Object.keys(props.pregData["Vit tech"])
    let thawTechs = Object.keys(props.pregData["Thaw tech"])
    let transTechs = Object.keys(props.pregData["Trans tech"])
    

    return(
        <div className="pr_wrapper">
            <div className="pie_total">
               Total <PieChart key={"total_pregRate"} tData={props.pregData['Total']}/>
            </div>
            <div >
                <div>Transfer Doctor</div>
                {docs.map( doc => <div  key={`${doc}_pregrate`} > <div className="doughnut"> {doc} <PieChart  tData={props.pregData["Trans Doctor"][doc]} /> </div>  </div>)}
            </div>
            <div >
                <div>Transfer Tech </div>
                {transTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div >{tech} <PieChart  tData={props.pregData["Trans tech"][tech]} /> </div></div> )}
            </div>
            <div >
                <div>Thaw Tech</div>
                {thawTechs.map( tech => <div   key={`${tech}_pregrate`}> <div > {tech} <PieChart  tData={props.pregData["Thaw tech"][tech]} /> </div></div> )}
            </div>
            <div >
                <div>Vit Tech</div>
                {vitTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div > {tech} <PieChart  tData={props.pregData["Vit tech"][tech]} /> </div></div> )}
            </div>
            
        </div>
    )


}

export default PregnancyRates
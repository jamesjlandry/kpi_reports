import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    let docs = Object.keys(props.pregData["Trans Doctor"])
    let vitTechs = Object.keys(props.pregData["Vit tech"])
    let thawTechs = Object.keys(props.pregData["Thaw tech"])
    let transTechs = Object.keys(props.pregData["Trans tech"])
    

    return(
        <div>
            <div>
               <PieChart key={"total_pregRate"} tData={props.pregData['Total']}/>
            </div>
            <div>
                {docs.map( doc => <div key={`${doc}_pregrate`} > {doc} <PieChart  tData={props.pregData["Trans Doctor"][doc]} /> </div> )}
            </div>
            <div>
                {transTechs.map( tech => <div key={`${tech}_pregrate`}> {tech} <PieChart  tData={props.pregData["Trans tech"][tech]} /> </div> )}
            </div>
            <div>
                {thawTechs.map( tech => <div key={`${tech}_pregrate`}> {tech} <PieChart  tData={props.pregData["Thaw tech"][tech]} /> </div> )}
            </div>
            <div>
                {vitTechs.map( tech => <div key={`${tech}_pregrate`}> {tech} <PieChart  tData={props.pregData["Vit tech"][tech]} /> </div> )}
            </div>
            
        </div>
    )


}

export default PregnancyRates
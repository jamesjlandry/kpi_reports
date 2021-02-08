import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {

    console.log("preg data:",props)

    let pregKeys = Object.keys(props.pregData)

    // let docs = pregKeys.filter()
    // let vitTechs = pregKeys.filter()
    // let thawTechs = pregKeys.filter()
    // let transTechs = pregKeys.filter()
    

    return(
        <div>
            {/* <div>
               <PieChart key={"total_pregRate"} tData={props.pregData['Total']}/>
            </div>
            <div>
                {docs.map( doc => <div> {doc} <PieChart key={`${doc}_pregrate`} tData={props.pregData[doc]} /> </div> )}
            </div>
            <div>
                {transTechs.map( tech => <div> {tech} <PieChart key={`${tech}_pregrate`} tData={props.pregData[tech]} /> </div> )}
            </div>
            <div>
                {thawTechs.map( tech => <div> {tech} <PieChart key={`${tech}_pregrate`} tData={props.pregData[tech]} /> </div> )}
            </div>
            <div>
                {vitTechs.map( tech => <div> {tech} <PieChart key={`${tech}_pregrate`} tData={props.pregData[tech]} /> </div> )}
            </div> */}
            
        </div>
    )


}

export default PregnancyRates
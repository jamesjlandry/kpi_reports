import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    let docs = Object.keys(props.pregData["Trans Doctor"])
    let vitTechs = Object.keys(props.pregData["Vit tech"])
    let thawTechs = Object.keys(props.pregData["Thaw tech"])
    let transTechs = Object.keys(props.pregData["Trans tech"])
    

    return(
        <div className="transfer_wrapper">
            <div className="pie_total" >
               <div>Total</div> <div ><PieChart key={"total_pregRate"} tData={props.pregData['Total']} total={true}/></div>
            </div>
            <div className="doc">
                <div>Transfer Doctor</div>
                {docs.map( doc => <div  key={`${doc}_pregrate`} > <div > {doc} <PieChart  tData={props.pregData["Trans Doctor"][doc]} /> </div>  </div>)}
            </div>
            <div className="trans">
                <div>Transfer Tech </div>
                {transTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div >{tech} <PieChart  tData={props.pregData["Trans tech"][tech]} /> </div></div> )}
            </div>
            <div className="thaw">
                <div>Thaw Tech</div>
                {thawTechs.map( tech => <div   key={`${tech}_pregrate`}> <div > {tech} <PieChart  tData={props.pregData["Thaw tech"][tech]} /> </div></div> )}
            </div>
            <div className="vit">
                <div>Vit Tech</div>
                {vitTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div > {tech} <PieChart  tData={props.pregData["Vit tech"][tech]} /> </div></div> )}
            </div>
            
        </div>
    )


}

export default PregnancyRates
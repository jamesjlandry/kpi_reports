import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    let docs = Object.keys(props.pregData["Trans Doctor"])
    let vitTechs = Object.keys(props.pregData["Vit tech"])
    let thawTechs = Object.keys(props.pregData["Thaw tech"])
    let transTechs = Object.keys(props.pregData["Trans tech"])
    

    return(
        <div>
            <div className="chart_header">
                Transfer KPIs
            </div>
        <div className="transfer_wrapper">
       
            <div className="pie_total" >
               <div className="total_label">Total</div> <div ><PieChart key={"total_pregRate"} tData={props.pregData['Total']} total={true}/></div>
            </div>
            <div className="doc_label" >Transfer Doctor</div>
            <div className="doc_wrapper">
                
                {docs.map( doc => <div  key={`${doc}_pregrate`} > <div > {doc} <PieChart  tData={props.pregData["Trans Doctor"][doc]} /> </div>  </div>)}
            </div>
            <div className="tech_label">Transfer Emb </div>
            <div className="trans_wrapper">
                
                {transTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div >{tech} <PieChart  tData={props.pregData["Trans tech"][tech]} /> </div></div> )}
            </div>
            <div className="tech_label">Thaw Emb</div>
            <div className="thaw_wrapper">
                
                {thawTechs.map( tech => <div   key={`${tech}_pregrate`}> <div > {tech} <PieChart  tData={props.pregData["Thaw tech"][tech]} /> </div></div> )}
            </div>
            <div className="tech_label">Vit Emb</div>
            <div className="vit_wrapper">
                
                {vitTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div > {tech} <PieChart  tData={props.pregData["Vit tech"][tech]} /> </div></div> )}
            </div>
            
        </div>
        </div>
    )


}

export default PregnancyRates
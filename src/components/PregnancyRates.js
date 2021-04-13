import React from 'react'
import PieChart from './PieChart'

const PregnancyRates = (props) => {


    let pregData = props.pregData

    let docs = Object.keys(pregData["Trans Doctor"])
    let vitTechs = Object.keys(pregData["Vit tech"])
    let thawTechs = Object.keys(pregData["Thaw tech"])
    let transTechs = Object.keys(pregData["Trans tech"])
    
    let totalData = {
        "Total": pregData['Total'],
        "Count": pregData["Total"]['Pos'] + pregData["Total"]['Neg']
    }

    let docCount = {}
    let vitCount = {}
    let thawCount = {}
    let transCount = {}

    let getCount = (arr, obj, name) => {
        arr.forEach(tech => {
            obj[tech] = (pregData[name][tech]['Pos'] + pregData[name][tech]['Neg'])
        })
    }

    getCount(docs, docCount, "Trans Doctor")
    getCount(vitTechs, vitCount, "Vit tech")
    getCount(thawTechs, thawCount, "Thaw tech")
    getCount(transTechs, transCount, "Trans tech")

    

    

    return(
        <div>
            <div className="chart_header">
                Transfer KPIs
            </div>
        <div className="transfer_wrapper">
       
            <div className="pie_total" >
               <div className="total_label">Total</div> <div ><PieChart key={"total_pregRate"} totalCount={totalData["Count"]} tData={totalData['Total']} total={true}/></div>
            </div>
            <div className="doc_label" >Transfer Doctor</div>
            <div className="doc_wrapper">
                
                {docs.map( doc =>  <div  key={`${doc}_pregrate`} > <div > {doc} <PieChart  totalCount={docCount[doc]} tData={pregData["Trans Doctor"][doc]} /> </div>  </div>)}
            </div>
            <div className="tech_label">Transfer Emb </div>
            <div className="trans_wrapper">
                
                {transTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div >{tech} <PieChart  totalCount={transCount[tech]} tData={pregData["Trans tech"][tech]} /> </div></div> )}
            </div>
            <div className="tech_label">Thaw Emb</div>
            <div className="thaw_wrapper">
                
                {thawTechs.map( tech => <div   key={`${tech}_pregrate`}> <div > {tech} <PieChart totalCount={thawCount[tech]}  tData={pregData["Thaw tech"][tech]} /> </div></div> )}
            </div>
            <div className="tech_label">Vit Emb</div>
            <div className="vit_wrapper">
                
                {vitTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div > {tech} <PieChart totalCount={vitCount[tech]}  tData={pregData["Vit tech"][tech]} /> </div></div> )}
            </div>
            
        </div>
        </div>
    )


}

export default PregnancyRates
import React from 'react'
import PieChart from './PieChart'
import EditorJs from 'react-editor-js'
import List from '@editorjs/list'

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

    
    const list = List
    

    return(
        <div>
            <div className="kpi_wrapper">
                <div className="chart_header">
                    Transfer KPIs by Transfer Doctor
                </div>
                <div className="pie_wrapper">
                    <div className="pie_total" >
                        <div className="total_label">
                            Total
                        </div> 
                        <PieChart key={"total_pregRate"} totalCount={totalData["Count"]} tData={totalData['Total']} total={true}/>
                    </div>
                    <div className="tech_donut" >
                        {docs.map( doc =>  <div  key={`${doc}_pregrate`} > <div > {doc} <PieChart  totalCount={docCount[doc]} tData={pregData["Trans Doctor"][doc]} /> </div>  </div>)}
                    </div>
                </div>
                <div className="text_box">
                    <CustomEditor tools={{list: list}}/>
                </div>
            </div>

            <div className="kpi_wrapper">
                <div className="chart_header">
                    Transfer KPIs by Trans Emb
                </div>
                <div className="pie_wrapper">
                    <div className="pie_total">
                        <div className="total_label">
                            Total
                        </div>
                        <PieChart totalCount={totalData["Count"]} tData={totalData['Total']} total={true}/>
                    </div>
                    <div className="tech_donut">
                            {transTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div >{tech} <PieChart  totalCount={transCount[tech]} tData={pregData["Trans tech"][tech]} /> </div></div> )}
                    </div>
                </div>
                <div className="text_box">
                    <CustomEditor tools={{list: list}}/>
                </div>
            </div>  

            <div className="kpi_wrapper">
                <div className="chart_header">
                    Transfer KPIs by Thaw Emb
                </div>
                <div className="pie_wrapper">
                    <div className="pie_total">
                        <div className="total_label">
                            Total
                        </div>
                        <PieChart totalCount={totalData["Count"]} tData={totalData['Total']} total={true}/>
                    </div>
                    <div className="tech_donut">
                    {thawTechs.map( tech => <div   key={`${tech}_pregrate`}> <div > {tech} <PieChart totalCount={thawCount[tech]}  tData={pregData["Thaw tech"][tech]} /> </div></div> )}
                    </div>
                </div>
                <div className="text_box">
                    <CustomEditor tools={{list: list}}/>
                </div>
            </div> 
            
            <div className="kpi_wrapper"> 
                <div className="chart_header">
                    Transfer KPIs by Vit Emb
                </div>
                <div className="pie_wrapper">
                    <div className="pie_total">
                        <div className="total_label">
                            Total
                        </div>
                        <PieChart totalCount={totalData["Count"]} tData={totalData['Total']} total={true}/>
                    </div>
                    <div className="tech_donut">
                        {vitTechs.map( tech => <div  key={`${tech}_pregrate`}>  <div > {tech} <PieChart totalCount={vitCount[tech]}  tData={pregData["Vit tech"][tech]} /> </div></div> )}
                    </div>
                </div>
                <div className="text_box">
                    <CustomEditor tools={{list: list}}/>
                </div>
            </div>
            
        </div>
    )
}

function CustomEditor(props) {
    return (
      <div style={{ overflow: 'hidden', marginBottom: -270 }}>
        <EditorJs {...props} />
      </div>
    )
  }

export default PregnancyRates
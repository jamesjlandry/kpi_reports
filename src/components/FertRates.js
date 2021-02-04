import React, {useEffect} from 'react'
import PieChart from './PieChart'

let FertRates = (props) => {
    
    let techs = Object.keys(props.fertData)
    let twoPN = 0
    let onePN = 0
    let abn = 0
    let dgen = 0
    let zeroPN = 0
    console.log(techs)
    
    techs.forEach( tech => {
        twoPN += props.fertData[tech]['twoPN']
        onePN += props.fertData[tech]['onePN']
        abn += props.fertData[tech]['abn']
        dgen += props.fertData[tech]['dgen']
        zeroPN += props.fertData[tech]['zeroPN']
        }  
    )
   
    let total = {
        labels: ["2PN", "1PN", "> 2PN", "DGen", "0PN"],
        datasets: [
            {
                data: [
                    twoPN,
                    onePN,
                    abn,
                    dgen,
                    zeroPN 
                ],
                backgroundColor: [
                            'rgba(255, 99, 132, 0.9',
                            'rgba(54, 162, 235, 0.9',
                            'rgba(255, 206, 86, 0.9',
                            'rgba(255,159,64, 0.9',
                            'rgba(75, 192, 192, 0.9',
                            'rgba(153, 102, 255, 0.9'
                          ]
            }
        ]
    }
    
   
    return (
        <div>
           
            ICSI'd Total
            <PieChart fertData={total}  />
            <div>
                {techs.map(tech => <div> {tech} <PieChart fertData= {{
                    labels: ["2PN", "1PN", "> 2PN", "DGen", "0PN"],
                    datasets: [
                        {
                            data: [
                                props.fertData[tech].twoPN,
                                props.fertData[tech].onePN,
                                props.fertData[tech].abn,
                                props.fertData[tech].dgen,
                                props.fertData[tech].zeroPN
            
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.9',
                                'rgba(54, 162, 235, 0.9',
                                'rgba(255, 206, 86, 0.9',
                                'rgba(255,159,64, 0.9',
                                'rgba(75, 192, 192, 0.9',
                                'rgba(153, 102, 255, 0.9'
                              ]
                        }
                    ]
                }
                } /></div>)}
            </div>
        </div>
    )
}

export default FertRates
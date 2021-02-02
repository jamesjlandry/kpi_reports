import React from 'react'
import PieChart from './PieChart'

let FertRates = (props) => {

    // console.log(props.fertData)
    // let fertData = {
    //     labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
    //     datasets: [
    //         {
    //             data: [
               
    //                 props.chartData.fertRates.ICSITech.Total.TWOPN,
    //                 props.chartData.fertRates.ICSITech.Total.ONEPN,
    //                 props.chartData.fertRates.ICSITech.Total.Abnormal,
    //                 props.chartData.fertRates.ICSITech.Total.DGen,
    //                 props.chartData.fertRates.ICSITech.Total.ZEROPN
    //             ],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.9',
    //                 'rgba(54, 162, 235, 0.9',
    //                 'rgba(255, 206, 86, 0.9',
    //                 'rgba(255,159,64, 0.9',
    //                 'rgba(75, 192, 192, 0.9',
    //                 'rgba(153, 102, 255, 0.9'
    //               ]
    //         }
            
    //     ]
    // }

    // let technicians = Object.keys(props.chartData.fertRates.ICSITech)
    // technicians = technicians.filter(tech => tech !== "Total")
    
   
    return (
        <div>
           
            ICSI'd Total
            <PieChart fertData={props.fertData}  />
            <div>
                {/* {technicians.map(tech => <div> {tech} <PieChart fertData= {{
                    labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
                    datasets: [
                        {
                            data: [
                                props.chartData.fertRates.ICSITech[tech].TWOPN,
                                props.chartData.fertRates.ICSITech[tech].ONEPN,
                                props.chartData.fertRates.ICSITech[tech].Abnormal,
                                props.chartData.fertRates.ICSITech[tech].DGen,
                                props.chartData.fertRates.ICSITech[tech].ZEROPN
            
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
                } /></div>)} */}
            </div>
        </div>
    )
}

export default FertRates
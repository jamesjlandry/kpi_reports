import React from 'react'
import PieChart from './PieChart'

let FertRates = (props) => {

    let fertData = {
        labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
        datasets: [
            {
                data: [
               
                    props.chartData.fertRates.ICSITech.Total.TWOPN,
                    props.chartData.fertRates.ICSITech.Total.ONEPN,
                    props.chartData.fertRates.ICSITech.Total.Abnormal,
                    props.chartData.fertRates.ICSITech.Total.DGen,
                    props.chartData.fertRates.ICSITech.Total.ZEROPN
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
            <PieChart fertData={fertData} displayTitle={props.displayTitle} />
            <div>
                {/* {technicians.map(technician => <PieChart chartData={technician.chartData} displayTitle={technician.displayTitle}/>)} */}
            </div>
        </div>
    )
}

export default FertRates
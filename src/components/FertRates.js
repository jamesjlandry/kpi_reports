import React from 'react'
import PieChart from './PieChart'

let FertRates = (props) => {

    let technicians = [{
        chartData: props.chartData,
        displayTitle: props.displayTitle
    }]
    return (
        <div>
            <PieChart chartData={props.chartData} displayTitle={props.displayTitle} />
            <div>
                {technicians.map(technician => <PieChart chartData={technician.chartData} displayTitle={technician.displayTitle}/>)}
            </div>
        </div>
    )
}

export default FertRates
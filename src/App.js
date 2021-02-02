import React, { useState } from 'react'
import './App.css';
import FertRates from './components/FertRates'
import * as XLSX from 'xlsx';

function App() {

const [chartData, setChartData] = useState()
const [fertData, setFertData] = useState()


  // const chartData = {
  //   fertRates: {
  //     ICSITech: {
  //       "Total": {
  //         "TWOPN": 370,
  //         "ONEPN": 18,
  //         "Abnormal": 8,
  //         "DGen" : 9,
  //         "ZEROPN": 41, 
  //       },
  //       "MDB": {
  //         "TWOPN": 192,
  //         "ONEPN": 8,
  //         "Abnormal": 4,
  //         "DGen" : 2,
  //         "ZEROPN": 27, 
  //       },
  //       "ECM": {
  //         "TWOPN": 107,
  //         "ONEPN": 4,
  //         "Abnormal": 2,
  //         "DGen" : 4,
  //         "ZEROPN": 9,
  //       },
  //       "MDB/ECM": {
  //         "TWOPN": 71,
  //         "ONEPN": 6,
  //         "Abnormal": 2,
  //         "DGen" : 2,
  //         "ZEROPN": 4,
  //       }
  //     }
  //   }
  // }



  const displayTitle = {
    title: "ICSI'd Total"
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload =(e) => {
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, {type: 'buffer'})

        const sheet1 = wb.SheetNames[0]
        const sheet2 = wb.SheetNames[1]

        const ws1 = wb.Sheets[sheet1]
        const ws2 = wb.Sheets[sheet2]

        const data = [
          XLSX.utils.sheet_to_json(ws1),
          XLSX.utils.sheet_to_json(ws2)
      ]
        resolve(data)
      }
      // fileReader.onError((error) => {
      //   reject(error)
      // })
    })

    promise.then((data) => {
      // setChartData(data)
      let arr1 = data[0]
      let arr2 = data[1]
      let twoPN = 0
      let onePN = 0
      let abn = 0
      let dgen = 0
      let zeroPN = 0
      let fertRateKeys = Object.keys(arr1)
      fertRateKeys = fertRateKeys.filter( key => arr1[key]['2PN'] !== 'n/a')
      fertRateKeys.forEach(key => {
        console.log(arr1[key])
        twoPN += arr1[key]['2PN']
        onePN += arr1[key['1PN']]
        abn += arr1[key]['abnormal']
        dgen += arr1[key]['deg']
        zeroPN += arr1[key]['0PN']
      })
      // console.log(arr1)
      setFertData({
        labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
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
      })
    })
  }
 
  return (
    <div className="App">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0]
        readExcel(file)
      }} />
      <div>
        {/* {console.log(chartData)} */}
      </div>
      <FertRates fertData={fertData} displayTitle={displayTitle} />
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import './App.css';
import FertRates from './components/FertRates'
import CleavageRates from './components/CleavageRates'
import * as XLSX from 'xlsx';

function App() {

const [cleaveData, setCleaveData] = useState()
const [fertData, setFertData] = useState()



  

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
      
      let arr1 = data[0]
      let arr2 = data[1]
      let fertRateKeys = Object.keys(arr1)
      let totalICSID = fertRateKeys.filter( key => arr1[key]['# 2PN'] !== 'n/a')
      let fData = {
        "Total ICSI'D": {
          twoPN: 0,
          onePN: 0,
          abn: 0,
          dgen: 0,
          zeroPN: 0
        }
      }
      totalICSID.forEach(key => {
        
       fData["Total ICSI'D"]['twoPN'] += arr1[key]['# 2PN'] 
       fData["Total ICSI'D"]['onePN'] += arr1[key]['#1PN'] 
       fData["Total ICSI'D"]['abn'] += arr1[key]['# abnormal'] 
       fData["Total ICSI'D"]['dgen'] += arr1[key]['# deg'] 
       fData["Total ICSI'D"]['zeroPN'] += arr1[key]['# 0PN'] 

      })

      
      let techICSID = fertRateKeys.filter( key => !arr1[key]['ICSI Tech'].includes('/'))
      
      techICSID.forEach(key => {
        
        if(!fData[arr1[key]['ICSI Tech']]) {
          
          fData[arr1[key]['ICSI Tech']] = {
            twoPN: arr1[key]['# 2PN'],
            onePN:  arr1[key]['#1PN'],
            abn: arr1[key]['# abnormal'],
            dgen: arr1[key]['# deg'],
            zeroPN: arr1[key]['# 0PN']
          }

        } else {
          fData[arr1[key]['ICSI Tech']]['twoPN'] += arr1[key]['# 2PN']
          fData[arr1[key]['ICSI Tech']]['onePN'] += arr1[key]['#1PN']
          fData[arr1[key]['ICSI Tech']]['abn'] += arr1[key]['# abnormal']
          fData[arr1[key]['ICSI Tech']]['dgen'] += arr1[key]['# deg']
          fData[arr1[key]['ICSI Tech']]['zeroPN'] += arr1[key]['# 0PN']
        }
       
       
      })

      let cleaveDayThree = fertRateKeys.filter( key => arr1[key]['# Day 3 Emb'] !== 'n/a')


      let cData = {
        "Total": {
          "Good": 0,
          "Poor": 0,
          "Discarded": 0
        }
      }

      cleaveDayThree.forEach( key => {
        
        cData["Total"]["Good"] += arr1[key]['#d3 >=6c']
        cData["Total"]["Poor"] += (arr1[key]['# Day 3 Emb'] - arr1[key]['#d3 >=6c'])
        cData["Total"]["Discarded"] += (arr1[key]["# 2PN"] - arr1[key]['# Day 3 Emb'])
      })
      
     

      


      setCleaveData(cData)
      setFertData(fData)
      
    })
  }
 
  
  return (
    <div className="App">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0]
        readExcel(file)
      }} />
      {fertData? <FertRates fertData={fertData}  /> : null}
      {cleaveData? <CleavageRates cleaveData={cleaveData}  /> : null}
    </div>
  );
}

export default App;

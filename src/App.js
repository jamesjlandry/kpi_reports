import React, { useState } from 'react'
import './App.css';
import FertRates from './components/FertRates'
import CleavageRates from './components/CleavageRates'
import PregnancyRates from './components/PregnancyRates'
import * as XLSX from 'xlsx';

function App() {

const [cleaveData, setCleaveData] = useState()
const [fertData, setFertData] = useState()
const [pregData, setPregData] = useState()



  

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
      
      const arr1 = data[0]
      const arr2 = data[1]
      const retRateKeys = Object.keys(arr1)
      const fetRateKeys = Object.keys(arr2)
      const totalICSID = retRateKeys.filter( key => arr1[key]['# 2PN'] !== 'n/a')
      const fData = {
        "Total ICSI'D": {
          '2PN': 0,
          '1PN': 0,
          '>2PN': 0,
          dgen: 0,
          '0PN': 0
        }
      }
      totalICSID.forEach(key => {
        
       fData["Total ICSI'D"]['2PN'] += arr1[key]['# 2PN'] 
       fData["Total ICSI'D"]['1PN'] += arr1[key]['#1PN'] 
       fData["Total ICSI'D"]['>2PN'] += arr1[key]['# abnormal'] 
       fData["Total ICSI'D"]['dgen'] += arr1[key]['# deg'] 
       fData["Total ICSI'D"]['0PN'] += arr1[key]['# 0PN'] 

      })

      
      const techICSID = retRateKeys.filter( key => !arr1[key]['ICSI Tech'].includes('/'))
      
      techICSID.forEach(key => {
        
        if(!fData[arr1[key]['ICSI Tech']]) {
          
          fData[arr1[key]['ICSI Tech']] = {
            '2PN': arr1[key]['# 2PN'],
            '1PN':  arr1[key]['#1PN'],
            '>2PN': arr1[key]['# abnormal'],
            dgen: arr1[key]['# deg'],
            '0PN': arr1[key]['# 0PN']
          }

        } else {
          fData[arr1[key]['ICSI Tech']]['2PN'] += arr1[key]['# 2PN']
          fData[arr1[key]['ICSI Tech']]['1PN'] += arr1[key]['#1PN']
          fData[arr1[key]['ICSI Tech']]['>2PN'] += arr1[key]['# abnormal']
          fData[arr1[key]['ICSI Tech']]['dgen'] += arr1[key]['# deg']
          fData[arr1[key]['ICSI Tech']]['0PN'] += arr1[key]['# 0PN']
        }
       
       
      })

      const cleaveDayThree = retRateKeys.filter( key => arr1[key]['# Day 3 Emb'] !== 'n/a')

      
      
      const cData = {
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
      
     
      techICSID.forEach(key => {
        
        if(!cData[arr1[key]['ICSI Tech']]) {
          
          cData[arr1[key]['ICSI Tech']] = {
            "Good": arr1[key]['# 2PN'],
            "Poor":  arr1[key]['#1PN'],
            "Discarded": arr1[key]['# abnormal'],
            
          }

        } else {
          cData[arr1[key]['ICSI Tech']]['Good'] += arr1[key]['#d3 >=6c']
          cData[arr1[key]['ICSI Tech']]['Poor'] +=  (arr1[key]['# Day 3 Emb'] - arr1[key]['#d3 >=6c'])
          cData[arr1[key]['ICSI Tech']]['Discarded'] += (arr1[key]["# 2PN"] - arr1[key]['# Day 3 Emb'])
        }
       
       
      })

      const fetPData = fetRateKeys.filter(key => arr2[key]['Age Group'] === '25-34' || arr2[key]['Age Group'] === '35-37')

      
      const pData = {
        "Total": {
          "Positive": 0,
          "Negative": 0
        },
        "Thaw tech": {},
        "Vit tech": {}, 
        "Trans Doctor": {},
        "Trans tech": {},
      }

      fetPData.forEach( key => {
        arr2[key]["Pos/Neg"] === "POS" ? pData["Total"]["Positive"] +=1 : pData["Total"]["Negative"] +=1
      })

      

      const setPDataTech = (tech, keys, hashKey) => {
        keys.forEach(key => {
          if(!pData[hashKey][arr2[key][tech]]) {
            if(arr2[key]['Pos/Neg'] === 'POS') {
              pData[hashKey][arr2[key][tech]] = {
                "Positive": 1,
                "Negative": 0
              }
            }
            else {
              pData[hashKey][arr2[key][tech]] = {
                "Positive": 0,
                "Negative": 1
              }
            } 
  
          } else {
            arr2[key]['Pos/Neg'] === 'POS' ? pData[hashKey][arr2[key][tech]]["Positive"] += 1 : pData[hashKey][arr2[key][tech]]["Negative"] += 1
          }
        })
      }
    
      
      setPDataTech("trans MD", fetPData, "Trans Doctor")
      setPDataTech("trans emb", fetPData, "Trans tech")
      setPDataTech("Vit Tech", fetPData, "Vit tech")
      setPDataTech("thaw tech", fetPData, "Thaw tech")

     

      setCleaveData(cData)
      setFertData(fData)
      setPregData(pData)
    })
  }
 

  return (
    <div className="App">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0]
        readExcel(file)
      }} />
      {fertData? <FertRates fertData={fertData}  /> : null}
      {pregData? <PregnancyRates pregData={pregData} /> : null}
      {cleaveData? <CleavageRates cleaveData={cleaveData}  /> : null}
    </div>
  );
}

export default App;

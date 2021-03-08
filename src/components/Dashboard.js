import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import FertRates from './FertRates'
import CleavageRates from './CleavageRates'
import PregnancyRates from './PregnancyRates'
import PregRateByAge from './PregRateByAge'
import USRates  from './USRates'
import BarChart from './BarChart'
import MiscKPIs from './MiscKPIs'
import EditorJs from 'react-editor-js';
import * as XLSX from 'xlsx';
import List from '@editorjs/list'

const Dashboard = () => {

    const [cleaveData, setCleaveData] = useState()
    const [fertData, setFertData] = useState()
    const [pregData, setPregData] = useState()
    const [pregAgeData, setPregAgeData] = useState()
    const [uSData, setUSData] = useState()
    const [bRData, setBRData] = useState()
    const [miscKPIData, setMiscKPIData] = useState()

    const data = {}
    const list = List

        // the readExcel function uses sheet.js to set initial data from an uploaded excel file.
        // it utilizes a promise, then, with the promise reorganizes the data using each of the setState functions
        // that the app will generate with Dounught and Bar Charts. 

    const readExcel = (file) => {
        // logic to create an array of objects. Each object is a sheet from the uploaded excel file
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
    
        // after the data is set from sheet.js the following logic is specific to the data for the fertility clinic
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
              "Disc": 0
            }
          }
    
          cleaveDayThree.forEach( key => {
            
            cData["Total"]["Good"] += arr1[key]['#d3 >=6c']
            cData["Total"]["Poor"] += (arr1[key]['# Day 3 Emb'] - arr1[key]['#d3 >=6c'])
            cData["Total"]["Disc"] += (arr1[key]["# 2PN"] - arr1[key]['# Day 3 Emb'])
          })
          
         
    
          techICSID.forEach(key => {
            
            if(!cData[arr1[key]['ICSI Tech']]) {
              
              cData[arr1[key]['ICSI Tech']] = {
                "Good": arr1[key]['# 2PN'],
                "Poor":  arr1[key]['#1PN'],
                "Disc": arr1[key]['# abnormal'],
                
              }
    
            } else {
              cData[arr1[key]['ICSI Tech']]['Good'] += arr1[key]['#d3 >=6c']
              cData[arr1[key]['ICSI Tech']]['Poor'] +=  (arr1[key]['# Day 3 Emb'] - arr1[key]['#d3 >=6c'])
              cData[arr1[key]['ICSI Tech']]['Disc'] += (arr1[key]["# 2PN"] - arr1[key]['# Day 3 Emb'])
            }
           
           
          })
    
    
          const kpiData = {
            'bioRes': {
              'Total': 0,
            },
            'eupRate': {
              "Total": 0,
            },
            'embWSurv': {
              'Total': 0,
            },
            'ooWSurv': {
              'Total': 0,
            },
            'aReTaG': {
              'Total': 0,
            }
          }
          
          const bioRateKeys = techICSID.filter( key => arr1[key]['No Read'] !== 'n/a')
    
            bioRateKeys.forEach(key => {
              
             if(!kpiData['bioRes'][arr1[key]["ICSI Tech"]]) {
                kpiData['bioRes'][arr1[key]["ICSI Tech"]] = (arr1[key]['Total BX'] - arr1[key]['No Read'])
                
                kpiData['bioRes']['Total'] += (arr1[key]['Total BX'] - arr1[key]['No Read'])
    
               
             } else {
               kpiData['bioRes'][arr1[key]["ICSI Tech"]] += (arr1[key]['Total BX'] - arr1[key]['No Read'])
               kpiData['bioRes']['Total'] += (arr1[key]['Total BX'] - arr1[key]['No Read'])
             }})
    
    
          const setRate = (array, keys, techIdentifier, numerator, denominator) => {
            let techs = {
              "Total": {
                "numerator": 0,
                "denominator": 0
              },
            }
            
              keys.forEach(key => {
        
                if(!techs[array[key][techIdentifier]]) {
                  techs[array[key][techIdentifier]] = {
                    "numerator": array[key][numerator],
                    'denominator': array[key][denominator]
                  }
                  
                  techs["Total"]["numerator"] += array[key][numerator]
                  techs["Total"]["denominator"] += array[key][denominator]
                } else {
                  techs[array[key][techIdentifier]]["numerator"] += array[key][numerator]
                  techs[array[key][techIdentifier]]["denominator"] += array[key][denominator]
                  techs["Total"]["numerator"] += array[key][numerator]
                  techs["Total"]["denominator"] += array[key][denominator]
                }
              })
    
              for(let techName in techs) {
                let tech = techs[techName]
                tech.rate = tech.numerator / tech.denominator
              }
    
              return techs
    
          }
    
          const bRData = setRate(arr1, techICSID, "ICSI Tech", "Total # Usable Blast", "# 2PN")
          
          const eupRate = setRate(arr1, bioRateKeys,"ICSI Tech", "# Euploid", "Total BX")
    
          const emWSurvRate = setRate(arr2, fetRateKeys, "thaw tech", "# blast survived", '# blast thawed')
    
          // once spreadsheet is updated to include a did not survive row, will be added to Pending add below to add this KPI.
          // const oOcyteKeys = techICSID.filter( key => arr1[key]["Procedure"] === "DE Thaw-GBV")
          // const ooWSurvRate = setRate(arr1, oOcyteKeys, "ICSI Tech", "Pending add", "Procedure" )
          // kpiData["ooWSurv"] = ooWSurvRate
    
          for(let key in arr2) {
            let age = arr2[key]['Age Group']
            let blastTrans = arr2[key]['# blast trans']
            if(!kpiData['aReTaG'][age]) {
              kpiData['aReTaG'][age] = { 
                "denominator": 1, 
                "numerator": blastTrans
            }
              kpiData['aReTaG']['Total'] = {
                "denominator": 1,
                "numerator": blastTrans
              }
            } else {
              kpiData['aReTaG'][age]["denominator"] += 1
              kpiData['aReTaG'][age]["numerator"] += blastTrans
              kpiData['aReTaG']['Total']["denominator"] += 1
              kpiData['aReTaG']['Total']['numerator'] += blastTrans
            }
          }
    
          for(let key in kpiData['aReTaG']) {
            let rate = kpiData['aReTaG'][key]['numerator'] / kpiData['aReTaG'][key]['denominator']
            kpiData['aReTaG'][key].rate = rate
          }
    
          
    
          kpiData['eupRate'] = eupRate
    
          kpiData['embWSurv'] = emWSurvRate
             
          
    
          const fetPData = fetRateKeys.filter(key => arr2[key]['Age Group'] === '25-34' || arr2[key]['Age Group'] === '35-37')
    
          
          const pData = {
            "Total": {
              "Pos": 0,
              "Neg": 0
            },
            "Thaw tech": {},
            "Vit tech": {}, 
            "Trans Doctor": {},
            "Trans tech": {},
          }
    
          fetPData.forEach( key => {
            arr2[key]["Pos/Neg"] === "POS" ? pData["Total"]["Pos"] +=1 : pData["Total"]["Neg"] +=1
          })
    
          
    
          const setPDataTech = (tech, keys, hashKey) => {
            keys.forEach(key => {
              if(!pData[hashKey][arr2[key][tech]]) {
                if(arr2[key]['Pos/Neg'] === 'POS') {
                  pData[hashKey][arr2[key][tech]] = {
                    "Pos": 1,
                    "Neg": 0
                  }
                }
                else {
                  pData[hashKey][arr2[key][tech]] = {
                    "Pos": 0,
                    "Neg": 1
                  }
                } 
      
              } else {
                arr2[key]['Pos/Neg'] === 'POS' ? pData[hashKey][arr2[key][tech]]["Pos"] += 1 : pData[hashKey][arr2[key][tech]]["Neg"] += 1
              }
            })
          }
        
          
          setPDataTech("trans MD", fetPData, "Trans Doctor")
          setPDataTech("trans emb", fetPData, "Trans tech")
          setPDataTech("Vit Tech", fetPData, "Vit tech")
          setPDataTech("thaw tech", fetPData, "Thaw tech")
    
          const aPData = {
            "Total": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            "<35": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            "35-37": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            "38-40": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            "41-42": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            ">42": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            },
            "Donor": {
              "Neg": 0,
              "BC": 0,
              "Pos": 0,
            }, 
          }
    
         const setAPDataByAge = (keys, ageGroup, age) => {
            keys.forEach(key => {
                
              if(arr2[key]['Age Group'] === ageGroup){
                if(arr2[key]['Pos/Neg'] === "POS") {
                  if(arr2[key]['# sacs'] === 0){
                    aPData[age]["BC"] ++
                    aPData["Total"]["BC"] ++
                  } else {
                    aPData[age]["Pos"] ++
                    aPData["Total"]["Pos"] ++
                  }
                } else {
                  aPData[age]["Neg"] ++
                  aPData["Total"]["Neg"] ++
                }
              } 
            })
         }
    
         
    
         setAPDataByAge(fetRateKeys, "35-37", "35-37")
         setAPDataByAge(fetRateKeys, "donor", "Donor")
         setAPDataByAge(fetRateKeys, "25-34", "<35")
         setAPDataByAge(fetRateKeys, "41-42", "41-42")
         setAPDataByAge(fetRateKeys, "38-40", "38-40")
         setAPDataByAge(fetRateKeys, "43-50", ">42")
            
    
         const uSData = {
          "Total": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          "<35": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          "35-37": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          "38-40": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          "41-42": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          ">42": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          },
          "Donor": {
            "HB": 0,
            "No HB": 0,
            "Mult HB": 0,
            "Mult No HB": 0,
          }, 
        }
    
        const setUSDataByAge = (keys, ageGroup, age) => {
          keys.forEach(key => {
              
            if(arr2[key]['Age Group'] === ageGroup){
              if(arr2[key]['Pos/Neg'] === "POS") {
                if(arr2[key]["# blast trans"] > 1){
                  if(arr2[key]['#HB'] === 0){
                    uSData[age]["Mult No HB"] ++
                    uSData["Total"]["Mult No HB"] ++
                  } else {
                    uSData[age]["Mult HB"] ++
                    uSData["Total"]["Mult HB"] ++
                  }
                } else{
                  if(arr2[key]['#HB'] === 0){
                    uSData[age]["No HB"] ++
                    uSData["Total"]["No HB"] ++
                  } else {
                    uSData[age]["HB"] ++
                    uSData["Total"]["HB"] ++
                  }
                }
              } 
            } 
          })
       }
    
          setUSDataByAge(fetRateKeys, "35-37", "35-37")
          setUSDataByAge(fetRateKeys, "donor", "Donor")
          setUSDataByAge(fetRateKeys, "25-34", "<35")
          setUSDataByAge(fetRateKeys, "41-42", "41-42")
          setUSDataByAge(fetRateKeys, "38-40", "38-40")
          setUSDataByAge(fetRateKeys, "43-50", ">42")
    
    
          setCleaveData(cData)
          setFertData(fData)
          setPregData(pData)
          setPregAgeData(aPData)
          setUSData(uSData)
          setBRData(bRData)
          setMiscKPIData(kpiData)
          console.log(kpiData)
    
        })
      }

      function logout() {
        return auth.signOut()
      }

    return (
        <div className="wrapper">
            <div className="menu">
              <div>
                <Link to='/edit-profile'>Welcome Michael</Link> 
              </div>
                <div onClick={logout} > Log Out</div>
            </div>
            <input type="file" onChange={(e) => {
            const file = e.target.files[0]
            readExcel(file)
            }} />
            <div className="content_wrapper">
              <div className="print_heading">
                <div className="logo">
                  <img src="images/impart_logo.png" />
                </div>
                <div className="title">
                  KPI Report
                </div>
                <div className="clinic_name">

                </div>
              </div>
              <div>

              </div>
            {fertData? <div ><div><FertRates fertData={fertData}  /></div> <div className="text_box"> <EditorJs data={data} tools={{list: list}}/></div></div> : null}
            {pregData? <div><div> <PregnancyRates pregData={pregData} /> </div> <div className="text_box"> <EditorJs data={data} tools={{list: list}} /></div></div> : null}
            {cleaveData? <div><div>  <CleavageRates cleaveData={cleaveData}  /> </div> <div className="text_box"><EditorJs data={data} tools={{list: list}} /></div></div>: null}
            {pregAgeData? <div> <div><PregRateByAge pregData={pregAgeData} /></div> <div className="text_box"> <EditorJs data={data} tools={{list: list}} /></div> </div>: null}
            {uSData? <div> <div><USRates uSData={uSData} /> </div> <div className="text_box" > <EditorJs data={data} tools={{list: list}} /></div> </div>: null}
            {bRData? <div> <div><BarChart data={bRData}/> </div> <div className="text_box"> <EditorJs data={data} tools={{list: list}} /></div></div> : null}
            {miscKPIData ? <div> <div> <MiscKPIs data={miscKPIData} /> </div> <div className="text_box"> <EditorJs data={data} tools={{list: list}} /></div> </div> : null}
            </div>
        </div>
    )
}

export default Dashboard

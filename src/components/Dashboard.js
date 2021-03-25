import React, {  useState } from 'react'
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
    
        // after the data is set from sheet.js the following logic is specific to the data for the fertility clinic
        promise.then((data) => {
          
          const arr1 = data[0]
          const arr2 = data[1]

          const retRateKeys = []
           for(let key in arr1) {
            retRateKeys.push(key)
          }

          const fetRateKeys = []

          for( let key in arr2) {
            fetRateKeys.push(key)
          }
         
         const ret = []
         const fet = []

          function copyArray(array, newArr) {
            for (let key in array){
              newArr.push({})
              let row = array[key]
              let headers = Object.keys(row)
              headers.forEach( header => {
                let newKey = header.replace(/[^a-z0-9]/gi,'').toLowerCase()
                newArr[key][newKey] = array[key][header]
              })
            }
          }
         
          copyArray(arr1, ret)

          copyArray(arr2, fet)
         
          
          
          const totalICSID = retRateKeys.filter( key => ret[key]['2pn'] !== 'n/a')
    
         
    
          const fData = {
            "Total": {
              '2PN': 0,
              '1PN': 0,
              '>2PN': 0,
              'Degen': 0,
              '0PN': 0
            }
          }
          totalICSID.forEach(key => {
            
           fData["Total"]['2PN'] += ret[key]['2pn'] 
           fData["Total"]['1PN'] += ret[key]['1pn'] 
           fData["Total"]['>2PN'] += ret[key]['abnormal'] 
           fData["Total"]['Degen'] += ret[key]['deg'] 
           fData["Total"]['0PN'] += ret[key]['0pn'] 
    
          })
    
          
          const techICSID = retRateKeys.filter( key => !ret[key]['icsitech'].includes('/'))
          
          techICSID.forEach(key => {
            
            if(!fData[ret[key]['icsitech'].toUpperCase()]) {
              
              fData[ret[key]['icsitech'].toUpperCase()] = {
                '2PN': ret[key]['2pn'],
                '1PN':  ret[key]['1pn'],
                '>2PN': ret[key]['abnormal'],
                'Degen': ret[key]['deg'],
                '0PN': ret[key]['0pn']
              }
    
            } else {
              fData[ret[key]['icsitech'].toUpperCase()]['2PN'] += ret[key]['2pn']
              fData[ret[key]['icsitech'].toUpperCase()]['1PN'] += ret[key]['1pn']
              fData[ret[key]['icsitech'].toUpperCase()]['>2PN'] += ret[key]['abnormal']
              fData[ret[key]['icsitech'].toUpperCase()]['Degen'] += ret[key]['deg']
              fData[ret[key]['icsitech'].toUpperCase()]['0PN'] += ret[key]['0pn']
            }
           
           
          })
    
          const cleaveDayThree = retRateKeys.filter( key => ret[key]['day3emb'] !== 'n/a')
    
          
          const cData = {
            "Total": {
              "Good": 0,
              "Poor": 0,
              "Disc": 0
            }
          }
    
          cleaveDayThree.forEach( key => {
            
            cData["Total"]["Good"] += ret[key]['d36c']
            cData["Total"]["Poor"] += (ret[key]['day3emb'] - ret[key]['d36c'])
            cData["Total"]["Disc"] += (ret[key]["2pn"] - ret[key]['day3emb'])
          })
          
         
    
          techICSID.forEach(key => {
            
            if(!cData[ret[key]['icsitech']]) {
              
              cData[ret[key]['icsitech']] = {
                "Good": ret[key]['2pn'],
                "Poor":  ret[key]['1pn'],
                "Disc": ret[key]['abnormal'],
                
              }
    
            } else {
              cData[ret[key]['icsitech']]['Good'] += ret[key]['d36c']
              cData[ret[key]['icsitech']]['Poor'] +=  (ret[key]['day3emb'] - ret[key]['d36c'])
              cData[ret[key]['icsitech']]['Disc'] += (ret[key]["2pn"] - ret[key]['day3emb'])
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
          
          const bioRateKeys = techICSID.filter( key => ret[key]['noread'] !== 'n/a')
    
            bioRateKeys.forEach(key => {
              
             if(!kpiData['bioRes'][ret[key]["icsitech"]]) {
                kpiData['bioRes'][ret[key]["icsitech"]] = (ret[key]['totalbx'] - ret[key]['noread'])
                
                kpiData['bioRes']['Total'] += (ret[key]['totalbx'] - ret[key]['noread'])
    
               
             } else {
               kpiData['bioRes'][ret[key]["icsitech"]] += (ret[key]['totalbx'] - ret[key]['noread'])
               kpiData['bioRes']['Total'] += (ret[key]['totalbx'] - ret[key]['noread'])
             }})
    
    
          const setRate = (array, keys, techIdentifier, numerator, denominator) => {
            let techs = {
              "Total": {
                "numerator": 0,
                "denominator": 0
              },
            }
            
              keys.forEach(key => {
        
                if(!techs[array[key][techIdentifier].toUpperCase()]) {
                  techs[array[key][techIdentifier].toUpperCase()] = {
                    "numerator": array[key][numerator],
                    'denominator': array[key][denominator]
                  }
                  
                  techs["Total"]["numerator"] += array[key][numerator]
                  techs["Total"]["denominator"] += array[key][denominator]
                } else {
                  techs[array[key][techIdentifier].toUpperCase()]["numerator"] += array[key][numerator]
                  techs[array[key][techIdentifier].toUpperCase()]["denominator"] += array[key][denominator]
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
    
          const bRData = setRate(ret, techICSID, "icsitech", "totalusableblast", "2pn")
          
          const eupRate = setRate(ret, bioRateKeys,"icsitech", "euploid", "totalbx")
    
          const emWSurvRate = setRate(fet, fetRateKeys, "thawtech", "blastsurvived", 'blastthawed')
    
          // once spreadsheet is updated to include a did not survive row, will be added to Pending add below to add this KPI.
          // const oOcyteKeys = techICSID.filter( key => ret[key]["Procedure"] === "DE Thaw-GBV")
          // const ooWSurvRate = setRate(arr1, oOcyteKeys, "icsitech", "Pending add", "Procedure" )
          // kpiData["ooWSurv"] = ooWSurvRate
    
          for(let key in fet) {
            
            let age = fet[key]['agegroup']
            let blastTrans = fet[key]['blasttrans']
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
             
          
    
          const fetPData = fetRateKeys.filter(key => fet[key]['agegroup'] === '25-34' || fet[key]['agegroup'] === '35-37')
    
          
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
            fet[key]["posneg"] === "POS" ? pData["Total"]["Pos"] +=1 : pData["Total"]["Neg"] +=1
          })
    
          
    
          const setPDataTech = (tech, keys, hashKey) => {
            keys.forEach(key => {
              if(!pData[hashKey][fet[key][tech].toUpperCase()]) {
                if(fet[key]['posneg'] === 'POS') {
                  pData[hashKey][fet[key][tech].toUpperCase()] = {
                    "Pos": 1,
                    "Neg": 0
                  }
                }
                else {
                  pData[hashKey][fet[key][tech].toUpperCase()] = {
                    "Pos": 0,
                    "Neg": 1
                  }
                } 
      
              } else {
                fet[key]['posneg'] === 'POS' ? pData[hashKey][fet[key][tech].toUpperCase()]["Pos"] += 1 : pData[hashKey][fet[key][tech].toUpperCase()]["Neg"] += 1
              }
            })
          }
        
          
          setPDataTech("transmd", fetPData, "Trans Doctor")
          setPDataTech("transemb", fetPData, "Trans tech")
          setPDataTech("vittech", fetPData, "Vit tech")
          setPDataTech("thawtech", fetPData, "Thaw tech")
    
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
                
              if(fet[key]['agegroup'].toLowerCase() === ageGroup){
                if(fet[key]['posneg'] === "POS") {
                  if(fet[key]['sacs'] === 0){
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
              
            if(fet[key]['agegroup'].toLowerCase() === ageGroup){
              if(fet[key]['posneg'] === "POS") {
                if(fet[key]["blasttrans"] > 1){
                  if(fet[key]['hb'] === 0){
                    uSData[age]["Mult No HB"] ++
                    uSData["Total"]["Mult No HB"] ++
                  } else {
                    uSData[age]["Mult HB"] ++
                    uSData["Total"]["Mult HB"] ++
                  }
                } else{
                  if(fet[key]['hb'] === 0){
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
          
    
        })
      }

      function logout() {
        return auth.signOut()
      }

    return (
        <div className="wrapper">
            <div className="menu">
              <div className="edit_profile_button" >
                <Link to='/edit-profile'>Welcome Michael</Link> 
              </div>
                <div className="logout_button" onClick={logout} > Log Out</div>
            </div>
            <div className="upload">
              <input type="file" onChange={(e) => {
              const file = e.target.files[0]
              readExcel(file)
              }} />
            </div>
         
            <div className="content_wrapper">
              <div className="print_heading">
                <div className="logo">
                  <img src="images/impart_logo.png" />
                </div>
                <div className="title">
                  KPI Report
                </div>
                <div className="logo_two">
                  <img src='images/denver_fertility_logo.png' />
                </div>
                <div className="clinic_name">

                </div>
              </div>
              <div>

              </div>
            {fertData? <div className="kpi_wrapper" ><div><FertRates fertData={fertData}  /></div> <div className="text_box"> <CustomEditor data={data} tools={{list: list}}/></div></div> : null}
            {cleaveData? <div className="kpi_wrapper"><div>  <CleavageRates cleaveData={cleaveData}  /> </div> <div className="text_box"><CustomEditor data={data} tools={{list: list}} /></div></div>: null}
            {pregData? <div className="kpi_wrapper"><div> <PregnancyRates pregData={pregData} /> </div> <div className="text_box"> <CustomEditor data={data} tools={{list: list}} /></div></div> : null}
            {pregAgeData? <div className="kpi_wrapper"> <div><PregRateByAge pregData={pregAgeData} /></div> <div className="text_box"> <CustomEditor data={data} tools={{list: list}} /></div> </div>: null}
            {uSData? <div className="kpi_wrapper"> <div><USRates uSData={uSData} /> </div> <div className="text_box" > <CustomEditor data={data} tools={{list: list}} /></div> </div>: null}
            {bRData? <div className="kpi_wrapper"> <div className="chart_header">Blast Rates</div><div><BarChart data={bRData}/> </div> <div className="text_box"> <CustomEditor data={data} tools={{list: list}} /></div></div> : null}
            {miscKPIData ? <div className="kpi_wrapper"> <div> <MiscKPIs data={miscKPIData} /> </div> <div className="text_box"> <CustomEditor data={data} tools={{list: list}} /></div> </div> : null}
            </div>
        </div>
    )
}

function CustomEditor(props){
  return (
    <div style={{ overflow: 'hidden', marginBottom: -270}}>
      <EditorJs {...props}/>
    </div>
  )
}

export default Dashboard

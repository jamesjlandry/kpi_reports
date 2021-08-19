import * as XLSX from 'xlsx';




async function ReadFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
            const bufferArray = e.target.result
            resolve(bufferArray)
        }
        // fileReader.onerror = (error) => {
        //   reject(error)
        // }
    })
}

let requiredColumnsFets = [
    
    "blastsurvived",
    'blastthawed',
    'agegroup',
    'blasttrans',
    "betaoutcome",
    'sacs',
    "transphys",
    "thawemb",
    "transemb",
    "vitemb",
    'hb',
]

let requiredColumnsRet = [
    '2pn',
    '1pn',
    '0pn',
    'deg',
    'abnormal',
    'icsiemb',
    'day3emb',
    'd36c',
    'noread',
    'totalbx',
    'totalusableblast',
    'euploid'
]


export const ReadExcel = (file) => {
    return new Promise(async (resolve, reject) => {

        const fileBuffer = await ReadFile(file)

        const wb = XLSX.read(fileBuffer, { type: 'buffer' })

        const sheet1 = wb.SheetNames[0]
        const sheet2 = wb.SheetNames[1]

        const ws1 = wb.Sheets[sheet1]
        const ws2 = wb.Sheets[sheet2]

        const data = [
            XLSX.utils.sheet_to_json(ws1),
            XLSX.utils.sheet_to_json(ws2)
        ]

        // after the data is set from sheet.js the following logic is specific to the data for the fertility clinic
        // the first sheet in the workbook must have the retrieval data, the second sheed the FET data
        const arr1 = data[0]
        const arr2 = data[1]


        const retRateKeys = []
        for (let key in arr1) {
            retRateKeys.push(key)
        }

        

        const fetRateKeys = []

        for (let key in arr2) {
            fetRateKeys.push(key)
        }

        const ret = []
        const fet = []

        function copyArray(array, newArr) {
            for (let key in array) {
                newArr.push({})
                let row = array[key]
                let headers = Object.keys(row)
                headers.forEach(header => {
                    let newKey = header.replace(/[^a-z0-9]/gi, '').toLowerCase()
                    newArr[key][newKey] = array[key][header]
                })
            }
        }

        copyArray(arr1, ret)

        copyArray(arr2, fet)

        

        

        let missingColumns =  requiredColumnsRet.filter( requiredColumn => {
            return !(requiredColumn in ret[0])
        })

        const badCellData = []

        missingColumns = [...missingColumns, ...requiredColumnsFets.filter( requiredColumn => {
            return  !(requiredColumn in fet[0])
        })]

       

        if(missingColumns.length > 0) {
            let errorMessage = {
                missingColumns: missingColumns
            }
            return resolve(errorMessage)
        }

        const totalICSID = []

        retRateKeys.forEach( key => {
            if(typeof(ret[key]['2pn']) === "number") {
                totalICSID.push(key)
            }
        })
        

        

        const fertRateData = {
            "Total": {
                '2PN': 0,
                '1PN': 0,
                '>2PN': 0,
                'Degen': 0,
                '0PN': 0,
            }
        }

        totalICSID.forEach(key => {
            fertRateData["Total"]['2PN'] += ret[key]['2pn']
            fertRateData["Total"]['1PN'] += ret[key]['1pn']
            fertRateData["Total"]['>2PN'] += ret[key]['1pn']
            fertRateData["Total"]['Degen'] += ret[key]['deg']
            fertRateData["Total"]['0PN'] += ret[key]['0pn']
        })

        

        const techICSID = []
        for (let key in ret) {
            if (ret[key]["icsiemb"] && typeof(ret[key]["icsiemb"]) !== "string") {
                if(!badCellData.includes("ICSI Emb")) badCellData.push("ICSI Emb")
            }
            else if (ret[key]["icsiemb"] && !ret[key]["icsiemb"].includes('/')) {
                techICSID.push(key)
            }
        }

        if (techICSID.length > 0) {
            techICSID.forEach(key => {

                if (!fertRateData[ret[key]['icsiemb'].toUpperCase()]) {

                    fertRateData[ret[key]['icsiemb'].toUpperCase()] = {
                        '2PN': ret[key]['2pn'],
                        '1PN': ret[key]['1pn'],
                        '>2PN': ret[key]['abnormal'],
                        'Degen': ret[key]['deg'],
                        '0PN': ret[key]['0pn'],
                    }
                } else {
                    fertRateData[ret[key]['icsiemb'].toUpperCase()]['2PN'] += ret[key]['2pn']
                    fertRateData[ret[key]['icsiemb'].toUpperCase()]['1PN'] += ret[key]['1pn']
                    fertRateData[ret[key]['icsiemb'].toUpperCase()]['>2PN'] += ret[key]['abnormal']
                    fertRateData[ret[key]['icsiemb'].toUpperCase()]['Degen'] += ret[key]['deg']
                    fertRateData[ret[key]['icsiemb'].toUpperCase()]['0PN'] += ret[key]['0pn']
                }
            })
        }


        let cleaveDayThree = []
        if ("day3emb" in ret[retRateKeys[0]]) {
            retRateKeys.forEach( key => {
                if(typeof(ret[key]['day3emb']) === "number") {
                    cleaveDayThree.push(key)
                }
                if(typeof(ret[key]['day3emb']) === "undefined") {
                    if(!badCellData.includes("Day 3 Emb")) badCellData.push("Day 3 Emb")
                    
                }
            })
            
        }

        const cleaveRateData = {
            "Total": {
                "Good": 0,
                "Poor": 0,
                "Disc": 0,
            }
        }


        cleaveDayThree.forEach(key => {
            cleaveRateData["Total"]["Good"] += ret[key]['d36c']
            cleaveRateData["Total"]["Poor"] += (ret[key]['day3emb'] - ret[key]['d36c'])
            if (ret[key]["2pn"] > ret[key]['day3emb']) {
                cleaveRateData["Total"]["Disc"] += (ret[key]["2pn"] - ret[key]['day3emb'])
            }
        })


        if (techICSID.length > 0) {
            techICSID.forEach(key => {
                if (!cleaveRateData[ret[key]['icsiemb']]) {
                    if (ret[key]["2pn"] > ret[key]['day3emb']) {
                        cleaveRateData[ret[key]['icsiemb']] = {
                            "Good": ret[key]['d36c'],
                            "Poor": (ret[key]['day3emb'] - ret[key]['d36c']),
                            "Disc": (ret[key]["2pn"] - ret[key]['day3emb']),
                        }
                    } else {
                        cleaveRateData[ret[key]['icsiemb']] = {
                            "Good": ret[key]['d36c'],
                            "Poor": (ret[key]['day3emb'] - ret[key]['d36c']),
                            "Disc": 0,
                        }
                    }

                } else {
                    cleaveRateData[ret[key]['icsiemb']]['Good'] += ret[key]['d36c']
                    cleaveRateData[ret[key]['icsiemb']]['Poor'] += (ret[key]['day3emb'] - ret[key]['d36c'])
                    if (ret[key]["2pn"] > ret[key]['day3emb']) {
                        cleaveRateData[ret[key]['icsiemb']]['Disc'] += (ret[key]["2pn"] - ret[key]['day3emb'])
                    }
                }
            })
        }



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
            'avgRateEmbTrans': {
                'Total': 0,
            }
        }


        const bioRateKeys = techICSID.filter(key => ret[key]['noread'] !== 'n/a')


        const setRate = (array, keys, techIdentifier, numerator, denominator) => {
            let techs = {
                "Total": {
                    "numerator": 0,
                    "denominator": 0
                },
            }
            keys.forEach(key => {
                
                if(typeof(array[key][numerator]) === "number" && typeof(array[key][denominator]) === "number" ) {
                    if (!techs[array[key][techIdentifier].toUpperCase()]) {
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
                } 
                if(typeof(array[key][numerator] !== "number")) {
                    if(!badCellData.includes(numerator)) badCellData.push(numerator)
                }
                if(typeof(array[key][denominator] !== "number")) {
                    if(!badCellData.includes(denominator)) badCellData.push(denominator)
                } 
                
            })
            
            for (let techName in techs) {
                let tech = techs[techName]
                tech.rate = tech.numerator / tech.denominator
            }
            return techs
        }

        const bioResults = setRate(ret, bioRateKeys, "icsiemb", "noread", "totalbx")
        const blastRateData = setRate(ret, techICSID, "icsiemb", "totalusableblast", "2pn")

        const eupRate = setRate(ret, bioRateKeys, "icsiemb", "euploid", "totalbx")

        const embWarmSurvRate = setRate(fet, fetRateKeys, "thawemb", "blastsurvived", 'blastthawed')

        // once spreadsheet is updated to include a did not survive row, will be added to Pending add below to add this KPI.
        // const oOcyteKeys = techICSID.filter( key => ret[key]["Procedure"] === "DE Thaw-GBV")
        // const ooWSurvRate = setRate(arr1, oOcyteKeys, "icsiemb", "Pending add", "procedure" )
        // kpiData["ooWSurv"] = ooWSurvRate

        for (let key in fet) {
            let age = fet[key]['agegroup']
            let blastTrans = fet[key]['blasttrans']
            if (!kpiData['avgRateEmbTrans'][age]) {
                kpiData['avgRateEmbTrans'][age] = {
                    "denominator": 1,
                    "numerator": blastTrans
                }
                kpiData['avgRateEmbTrans']['Total'] = {
                    "denominator": 1,
                    "numerator": blastTrans
                }
            } else {
                kpiData['avgRateEmbTrans'][age]["denominator"] += 1
                kpiData['avgRateEmbTrans'][age]["numerator"] += blastTrans
                kpiData['avgRateEmbTrans']['Total']["denominator"] += 1
                kpiData['avgRateEmbTrans']['Total']['numerator'] += blastTrans
            }
        }

        for (let key in kpiData['avgRateEmbTrans']) {
            let rate = kpiData['avgRateEmbTrans'][key]['numerator'] / kpiData['avgRateEmbTrans'][key]['denominator']
            kpiData['avgRateEmbTrans'][key].rate = rate
        }



        kpiData['eupRate'] = eupRate

        kpiData['embWSurv'] = embWarmSurvRate

        kpiData['bioRes'] = bioResults




        const fetPregRateData = fetRateKeys.filter(key => fet[key]['agegroup'] === '25-34' || fet[key]['agegroup'] === '35-37')
        
        

        const pregRateData = {
            "Total": {
                "Pos": 0,
                "Neg": 0,
            },
            "Thaw tech": {},
            "Vit tech": {},
            "Trans Doctor": {},
            "Trans tech": {},
        }

        fetPregRateData.forEach(key => {
            fet[key]["betaoutcome"] === "POS" ? pregRateData["Total"]["Pos"] += 1 : pregRateData["Total"]["Neg"] += 1
        })



        const setPregRateDataByTech = (tech, keys, hashKey) => {
            keys.forEach(key => {
                
                if (typeof(fet[key][tech]) === "string") {
                    
                    if (!pregRateData[hashKey][fet[key][tech].toUpperCase()]) {
                        if (fet[key]['betaoutcome'] === 'POS') {
                            pregRateData[hashKey][fet[key][tech].toUpperCase()] = {
                                "Pos": 1,
                                "Neg": 0
                            }
                        }
                        else {
                            pregRateData[hashKey][fet[key][tech].toUpperCase()] = {
                                "Pos": 0,
                                "Neg": 1
                            }
                        }
                    } else {
                        fet[key]['betaoutcome'] === 'POS' ? pregRateData[hashKey][fet[key][tech].toUpperCase()]["Pos"] += 1 : pregRateData[hashKey][fet[key][tech].toUpperCase()]["Neg"] += 1
                    }
                }
                else {
                    if(!badCellData.includes(hashKey)) badCellData.push(hashKey)
                }
            })
        }


        setPregRateDataByTech("transphys", fetPregRateData, "Trans Doctor")
        setPregRateDataByTech("transemb", fetPregRateData, "Trans tech")
        setPregRateDataByTech("vitemb", fetPregRateData, "Vit tech")
        setPregRateDataByTech("thawemb", fetPregRateData, "Thaw tech")



        const pregDataByAge = {
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

        const setPregDataByAge = (keys, ageGroup, age) => {
            keys.forEach(key => {
                if (typeof(fet[key]['agegroup']) === "string") {
                    if (fet[key]['agegroup'].toLowerCase() === ageGroup) {
                        if (fet[key]['betaoutcome'] === "POS") {
                            if(typeof(fet[key]['sacs']) === "number") {
                                if (fet[key]['sacs'] === 0) {
                                    pregDataByAge[age]["BC"]++
                                    pregDataByAge["Total"]["BC"]++
                                } else {
                                    pregDataByAge[age]["Pos"]++
                                    pregDataByAge["Total"]["Pos"]++
                                }   
                            }
                          
                        } else {
                            pregDataByAge[age]["Neg"]++
                            pregDataByAge["Total"]["Neg"]++
                        }
                    }
                }
            })
        }



        setPregDataByAge(fetRateKeys, "35-37", "35-37")
        setPregDataByAge(fetRateKeys, "donor", "Donor")
        setPregDataByAge(fetRateKeys, "25-34", "<35")
        setPregDataByAge(fetRateKeys, "41-42", "41-42")
        setPregDataByAge(fetRateKeys, "38-40", "38-40")
        setPregDataByAge(fetRateKeys, "43-50", ">42")

        
        const ultraSoundData = {
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

        const setUltraSoundDataByAge = (keys, ageGroup, age) => {
            keys.forEach(key => {
                if(typeof(fet[key]['agegroup']) === 'string') {
                    if (fet[key]['agegroup'].toLowerCase() === ageGroup) {
                        if (fet[key]['betaoutcome'] === "POS") {
                            if (fet[key]["blasttrans"] > 1) {
                                if (fet[key]['hb'] === 0) {
                                    ultraSoundData[age]["Mult No HB"]++
    
                                    ultraSoundData["Total"]["Mult No HB"]++
                                } else {
                                    ultraSoundData[age]["Mult HB"]++
    
                                    ultraSoundData["Total"]["Mult HB"]++
                                }
                            } else {
                                if (fet[key]['hb'] === 0) {
                                    ultraSoundData[age]["No HB"]++
    
                                    ultraSoundData["Total"]["No HB"]++
                                } else {
                                    ultraSoundData[age]["HB"]++
    
                                    ultraSoundData["Total"]["HB"]++
                                }
                            }
                        }
                    }
                }
            })
        }

        setUltraSoundDataByAge(fetRateKeys, "35-37", "35-37")
        setUltraSoundDataByAge(fetRateKeys, "donor", "Donor")
        setUltraSoundDataByAge(fetRateKeys, "25-34", "<35")
        setUltraSoundDataByAge(fetRateKeys, "41-42", "41-42")
        setUltraSoundDataByAge(fetRateKeys, "38-40", "38-40")
        setUltraSoundDataByAge(fetRateKeys, "43-50", ">42")

        
        let combinedData = {
            cleaveRate: cleaveRateData,
            fertRate: fertRateData,
            pregRate: pregRateData,
            pregAgeData: pregDataByAge,
            ultrasoundData: ultraSoundData,
            blastRateData: blastRateData,
            miscKPI: kpiData,
            badCellData: badCellData
        }
        resolve(combinedData)
    })
}
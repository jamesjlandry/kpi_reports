import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import FertRates from './FertRates'
import CleavageRates from './CleavageRates'
import PregnancyRates from './PregnancyRates'
import PregRateByAge from './PregRateByAge'
import USRates from './USRates'
import BarChart from './BarChart'
import MiscKPIs from './MiscKPIs'
import EditorJs from 'react-editor-js';
import List from '@editorjs/list'
import { ReadExcel } from '../ReadExcel'



const Dashboard = () => {

  const [cleaveData, setCleaveData] = useState()
  const [fertData, setFertData] = useState()
  const [pregData, setPregData] = useState()
  const [pregAgeData, setPregAgeData] = useState()
  const [ultraSoundData, setUltraSoundData] = useState()
  const [blastRateData, setBlastRateData] = useState()
  const [miscKPIData, setMiscKPIData] = useState()
  const [errorMessage, setErrorMessage] = useState()

  async function handleFileSelection(e) {
    const file = e.target.files[0]
    const excelFile = await ReadExcel(file)
    setCleaveData(excelFile.cleaveRate)
    setFertData(excelFile.fertRate)
    setPregData(excelFile.pregRate)
    setPregAgeData(excelFile.pregAgeData)
    setUltraSoundData(excelFile.ultraSoundData)
    setBlastRateData(excelFile.blastRateData)
    setMiscKPIData(excelFile.miscKPI)
    setErrorMessage(excelFile.missingColumns)
    console.log(errorMessage)
    e.target.value = null
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
        <input type="file" onChange={handleFileSelection} />
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
        {errorMessage ? <div>Excel Sheet is missing the following column headers: {errorMessage.map(error => <div>{error}</div>)} </div> : null}
        {fertData ? <ChartWrapper first><FertRates fertData={fertData} /></ChartWrapper> : null}
        {cleaveData ? <ChartWrapper><CleavageRates cleaveData={cleaveData} /></ChartWrapper> : null}
        {pregData ? <PregnancyRates pregData={pregData} /> : null}
        {pregAgeData ? <ChartWrapper><PregRateByAge pregData={pregAgeData} /></ChartWrapper> : null}
        {ultraSoundData ? <ChartWrapper><USRates ultraSoundData={ultraSoundData} /> </ChartWrapper> : null}
        {blastRateData ? <ChartWrapper><div className="chart_header">Blast Rates</div><div><BarChart data={blastRateData} /></div></ChartWrapper> : null}
        {miscKPIData ? <ChartWrapper> <MiscKPIs data={miscKPIData} /></ChartWrapper> : null}
      </div>
    </div >
  )
}

function ChartWrapper({ children, first }) {
  const list = List
  return (
    <div className={`kpi_wrapper ${first ? 'first' : ''}`}>
      <div>
        {children}
      </div>
      <div className="text_box">
        <CustomEditor tools={{ list: list }} />
      </div>
    </div>
  )
}


// editor.js auto sets the margin bottom to 300 and would not let it override in the css file
// this is the solution that worked to reduce the margin.
function CustomEditor(props) {
  return (
    <div style={{ overflow: 'hidden', marginBottom: -270 }}>
      <EditorJs {...props} />
    </div>
  )
}

// turns out printing page numbers with React is hard, so Josh came up with this
window.addEventListener('beforeprint', function(){
  addPageNumbers()
})

window.addEventListener('afterprint', function(){
  removePageNumbers()
})
window.addPageNumbers = addPageNumbers
function addPageNumbers() {
  let dpi = calcScreenDPI()
  let pageHeight = dpi*15
  let totalPages = Math.ceil(document.body.scrollHeight / (pageHeight));  //842px A4 pageheight for 72dpi, 1123px A4 pageheight for 96dpi, 
  for (var i = 1; i <= totalPages; i++) {
    var pageNumberDiv = document.createElement("div");
    pageNumberDiv.className = "page-number"
    var pageNumber = document.createTextNode("Page " + i + " of " + totalPages);
    pageNumberDiv.style.position = "absolute";
    pageNumberDiv.style.top = i*(pageHeight) // all of the past pages
      + 130*(i-1)  // some per-page margin bullshit that gets added
      + 50 // some more margin that I cant add elsewhere  because of some bullshit
      + 'px'
    pageNumberDiv.style.height = "16px";
    pageNumberDiv.appendChild(pageNumber);
    document.body.append(pageNumberDiv);
    pageNumberDiv.style.left = "calc(100% - (" + pageNumberDiv.offsetWidth + "px + 40px))";
  }
}

function removePageNumbers(){
  let pageNumbers = document.querySelectorAll('.page-number')
  pageNumbers.forEach( pageNumber => {
    pageNumber.remove()
  })
}

function calcScreenDPI() {
  const el = document.createElement('div');
  el.style = 'width: 1in;'
  document.body.appendChild(el);
  const dpi = el.offsetWidth;
  document.body.removeChild(el);

  return dpi;
}

export default Dashboard

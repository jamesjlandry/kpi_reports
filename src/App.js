import React from 'react'
import './App.css';
import FertRates from './components/FertRates'


function App() {

  const chartData = {
    fertRates: {
      ICSITech: {
        "Total": {
          "TWOPN": 370,
          "ONEPN": 18,
          "Abnormal": 8,
          "DGen" : 9,
          "ZEROPN": 41, 
        },
        "MDB": {
          "2PN": 192,
          "1PN": 8,
          "Abnormal": 4,
          "DGen" : 2,
          "0PN": 27, 
        },
        "ECM": {
          "2PN": 107,
          "1PN": 4,
          "Abnormal": 2,
          "DGen" : 4,
          "0PN": 9,
        },
        "MDB/ECM": {
          "2PN": 71,
          "1PN": 6,
          "Abnormal": 2,
          "DGen" : 2,
          "0PN": 4,
        }
      }
    }
  }

  // const fertData = {
  //     labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
  //     datasets: [
  //       {
          
  //         data: [
  //           370,
  //           18,
  //           8,
  //           9,
  //           41,
  //         ],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.9',
  //           'rgba(54, 162, 235, 0.9',
  //           'rgba(255, 206, 86, 0.9',
  //           'rgba(255,159,64, 0.9',
  //           'rgba(75, 192, 192, 0.9',
  //           'rgba(153, 102, 255, 0.9'
  //         ]
  //       }
  //     ]
  // }

  const displayTitle = {
    title: "ICSI'd Total"
  }
  return (
    <div className="App">
      
      <FertRates chartData={chartData} displayTitle={displayTitle} />
    </div>
  );
}

export default App;

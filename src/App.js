import React from 'react'
import './App.css';
import FertRates from './components/FertRates'


function App() {

  const chartData = {
      labels: ["2PN", "1PN", "Abnormal", "DGen", "0PN"],
      datasets: [
        {
          
          data: [
            370,
            18,
            8,
            9,
            41,
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

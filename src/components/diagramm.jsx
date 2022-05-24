import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const BarComponent = ({ title, titles, counts}) => {

  return (
    <div className='statistic__bar'>
      <Bar
        data={{
          labels: titles,
          datasets: [
            {
              label: 'Количество',
              backgroundColor: '#283cdc80',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 1,
              data: counts
            }
          ]
        }}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}

export default BarComponent;
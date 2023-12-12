import React, { useEffect, useState } from "react";
import "./style.css";
import { Navigation } from  './components/Navigation';
import { DatePickerComp } from './components/DatePicker';
import { ChartData } from './components/ChartData';
import Chart from 'chart.js/auto';
import * as RESP_DATA from '../data/data';
import { ChartRespDataProps } from "./interfaces/types";
import Cards from "./components/Card";

let chart: any;

const App = () => {
  const chartData = React.useRef();
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const responseData: any = RESP_DATA.default;
  
  const updateChart = (data: any) => {
    // @ts-ignore
    const ctx = chartData.current.getContext('2d');
    if(chart)
      chart = chart.destroy();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Clicks',
            data: data.clicks,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            borderJoinStyle: 'round',
            pointStyle: 'dash',
          },
          {
            label: 'Impressions',
            data: data.impressions,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    });
  };

  const handleDateRangeChange = (sDate: Date, eDate: Date) => {
    const startDate = sDate;
    const endDate = eDate;
    const updatedData = responseData.filter((x: ChartRespDataProps) => new Date(x.date) >= startDate && new Date(x.date) <= endDate);
    const clicks = updatedData.map((x: ChartRespDataProps) => parseInt(x.clicks));
    const impressions = updatedData.map((x: ChartRespDataProps) => parseInt(x.impressions));
    const labels = updatedData.map((x: ChartRespDataProps) => x.date);
    const newChartData = {
      clicks,
      impressions,
      labels
    };
    setTotalClicks(clicks.reduce((acc: any, curr: any) => acc+curr));
    setTotalImpressions(impressions.reduce((acc: any, curr: any) => acc+curr));
    updateChart(newChartData);

  };

  return (
    <div className="row-container h-full">
      <div className="flex h-full">
        <div className="columns-1 border-slate-600 bg-slate-200 ">
          <Navigation />
        </div>
        <div className="columns-7xl w-full">
          <div className="date-picker columns-3 m-6 p-4">
            <DatePickerComp sendDateRange={(sDate, eDate) => handleDateRangeChange(sDate, eDate)} />
          </div>
          <div className="h-5/6 p-4">
            <div className="mb-4">
              <Cards clicks={totalClicks} impressions={totalImpressions} />
            </div>
            <ChartData chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

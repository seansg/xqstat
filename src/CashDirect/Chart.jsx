import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import WaterMarkProvider, { PngBtn } from '%/components/WaterMarkProvider'
import { useDownloadContext } from '../components/DownloadProvider';
import { options } from './config'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const { handleDownload } = useDownloadContext()

  return (
    <>
      <PngBtn onClick={handleDownload} />
      <WaterMarkProvider>
        <div className='h-screen'>
          <Bar options={options} data={data} />
        </div>
      </WaterMarkProvider>
    </>
  )
}

export default Chart

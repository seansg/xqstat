import { useCallback } from 'react'
import ReportContainer from '../ReportContainer';
import csv from '../../data/dayTrading'
import { kdTrans, renameWaveCol } from '../../utils'

const DayTrading = ({ data, setData }) => {
  const parseCol = (col, index, row) => {
    switch (index) {
      case 6: {
        return kdTrans(col, row[3])
      }
      default: {
        return col.replace('.TW', '')
      }
    }
  }

  const handleParseCSV = (context) => {
    const newData = context.filter((datum, index) => {
      return ![0, 1, 2, 3, 4].includes(index) && datum[7] !== '沒方向' && datum.filter(d => !!d).length > 0
    })
    setData({
      date: context[1][0],
      headers: context[3].map((header) => header.replace(/\t/, '')).map((header, i) => {
        if (i === 3) return renameWaveCol
        return header
      }),
      rows: newData.map((row) => {
        return row.map((col, i) => parseCol(col, i, row))
      })
    })
  }

  const todayDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');

  return (
    <ReportContainer
      title={''}
      data={data}
      csv={csv}
      filename={`Ric_${todayDate}_daytrading`}
      handleParseCSV={handleParseCSV}
    />
  )
}

export default DayTrading

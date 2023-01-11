import { useCallback } from 'react'
import ReportContainer from '../ReportContainer';
import csv from '../../data/valueInvesting'
import { renameWaveCol } from '../../utils'

const ValueInvesting = ({ data, setData }) => {
  const parseCol = (col, index, row) => {
    switch (index) {
      default: {
        return col.replace('.TW', '')
      }
    }
  }

  const handleParseCSV = (context) => {
    const newData = context.filter((datum, index) => {
      return ![0, 1, 2, 3, 4].includes(index) && datum.filter(d => !!d).length > 0
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
      key={new Date().getTime()}
      title={'價投-中長線篩選條件'}
      data={data}
      csv={csv}
      filename={`Ric_${todayDate}_valueInvesting`}
      handleParseCSV={handleParseCSV}
    />
  )
}

export default ValueInvesting

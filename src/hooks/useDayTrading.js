import { useCallback } from 'react'
import { kdTrans } from '../utils'

const useDayTrading = (setData) => {
  const handleParseCSV = useCallback((context) => {
    const newData = context.filter((datum, index) => {
      return ![0, 1, 2, 3, 4].includes(index) && datum[7] !== '沒方向' && datum.filter(d => !!d).length > 0
    })
    setData({
      date: context[1][0],
      headers: context[3].map((header) => header.replace(/\t/, '')),
      rows: newData
    })
  }, [setData])

  const parseCol = useCallback((col, index) => {
    switch (index) {
      case 6: {
        return kdTrans(col)
      }
      default: {
        return col.replace('.TW', '')
      }
    }
  }, [])

  const todayDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');

  return {
    filename: `Ric_${todayDate}_daytrading`,
    handleParseCSV,
    parseCol,
  }
}

export default useDayTrading

import { useCallback, useRef } from 'react'
import TextArea from './TextArea'
import { kdTrans, renameWaveCol } from '../utils'
import CSVReader from 'react-csv-reader'

const ParseCsv = ({ setData }) => {
  const inputRef = useRef(null)
  const defaultValue = useRef('')

  const todayDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');


  const parseTypes = {
    DayTrading: {
      handleParseCSV: (context) => {
        if (!context) return
        const newData = context.filter((datum, index) => {
          return ![0, 1, 2, 3, 4].includes(index) && datum[7] !== '沒方向' && datum.filter(d => !!d).length > 0
        })
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
        setData({
          title: '',
          filename: `Ric_${todayDate}_daytrading`,
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
    },
    ShortBand: {
      handleParseCSV: (context) => {
        if (!context) return
        const newData = context.filter((datum, index) => {
          return ![0, 1, 2, 3, 4].includes(index) && datum.filter(d => !!d).length > 0
        })
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
        setData({
          title: '多頭排列組合-短波段選股策略',
          filename: `Ric_${todayDate}_shortband`,
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
    },
    ValueInvesting: {
      handleParseCSV: (context) => {
        if (!context) return
        const newData = context.filter((datum, index) => {
          return ![0, 1, 2, 3, 4].includes(index) && datum.filter(d => !!d).length > 0
        })
        const parseCol = (col, index, row) => {
          switch (index) {
            default: {
              return col.replace('.TW', '')
            }
          }
        }
        setData({
          title: '價投-中長線篩選條件',
          filename: `Ric_${todayDate}_valueInvesting`,
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
    },
  }

  const handleReader = (csv) => {
    inputRef.current.value = csv.join("\n")
  }

  const handleParse = useCallback((mode) => {
    if (!inputRef.current.value) return

    defaultValue.current = inputRef.current.value
    parseTypes[mode].handleParseCSV(inputRef.current.value.split("\n").map(row => row.split(",")))
  }, [parseTypes])

  return (
    <div className="flex justify-content-center flex-col">
      <div className='m-2.5'>
        <CSVReader
          onFileLoaded={handleReader}
          // fileEncoding='big5'
        />
      </div>
      <div className="my-2.5 mx-2.5 flex gap-x-5">
        {
          Object.keys(parseTypes).map((mode) => (
            <button
              key={mode}
              className='px-5 py-2.5 bg-[#1da1f2] text-white rounded'
              onClick={() => handleParse(mode)}
            >
              {mode}
            </button>
          ))
        }
      </div>
      <div className='m-2.5'>
        <TextArea inputRef={inputRef} defaultValue={defaultValue} />
      </div>
    </div>
  )
}

export default ParseCsv

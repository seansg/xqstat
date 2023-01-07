import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import _ from 'lodash'
import DayTrading from './components/DayTrading/index'

const tradingModes = {
  DayTrading: 'DayTrading',
}

const App = () => {
  const [currentTable, setCurrentTable] = useState(tradingModes.DayTrading)
  const [data, setData] = useState({
    date: '',
    headers: [],
    rows: [[]],
  })

  const handleClick = useCallback((mode) => {
    setCurrentTable(mode)
  }, [])

  const component = useMemo(() => {
    switch(currentTable) {
        case 'DayTrading': {
          return DayTrading
        }
        default: {
          () => <></>
        }
      }
  }, [])

  return (
    <>
      <div className='flex m-2.5 gap-x-2.5'>
        {
          Object.keys(tradingModes).map(mode => (
             <button key={mode} className='px-5 py-2.5 bg-[#1da1f2] text-white rounded' onClick={() => handleClick(mode)}>{ mode }</button>
          ))
        }
      </div>
      <hr />
      {component({ data, setData })}
    </>
  )
}

export default App

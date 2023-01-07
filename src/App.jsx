import { useState, useCallback, useMemo, useEffect } from 'react'
import _ from 'lodash'
import DayTrading from './components/DayTrading/index'
import ShortBand from './components/ShortBand/index'
import ValueInvesting from './components/ValueInvesting/index'
import cx from 'classnames'

const tradingModes = {
  DayTrading: 'DayTrading',
  ShortBand: 'ShortBand',
  ValueInvesting: 'ValueInvesting',
}

const initData = {
  date: '',
  headers: [],
  rows: [[]],
}

const App = () => {
  const [currentTable, setCurrentTable] = useState(tradingModes.DayTrading)
  const [data, setData] = useState(initData)

  const handleClick = useCallback((mode) => {
    setCurrentTable(mode)
  }, [])

  const component = useMemo(() => {
    switch(currentTable) {
        case 'DayTrading': {
          return DayTrading
        }
        case 'ShortBand': {
          return ShortBand
        }
        case 'ValueInvesting': {
          return ValueInvesting
        }
        default: {
          () => <></>
        }
      }
  }, [currentTable])

  useEffect(() => {
    setData(initData)
  }, [currentTable])

  return (
    <>
      <div className='flex m-2.5 gap-x-2.5'>
        {
          Object.keys(tradingModes).map(mode => (
            <button
              key={mode}
              className={cx('px-5 py-2.5 bg-[#1da1f2] text-white rounded', {
                'bg-[#1da1f2]': mode !== currentTable,
                'bg-blue-700': mode === currentTable,
              })}
              onClick={() => handleClick(mode)}
            >
              { mode }
            </button>
          ))
        }
      </div>
      <hr />
      {component({ data, setData })}
    </>
  )
}

export default App

import cx from 'classnames'
import PropTypes from 'prop-types'
import WaterMark from 'watermark-component-for-react';

const HtmlTable = ({ data, tableRef, title }) => {
  const content = `🪙 Dr.Provision🪙`;

  return (
    <>
      <div className='mx-auto' key={new Date().getTime()}>
        <div className="flex flex-col text-center" style={{ backgroundColor: '#d6d6d6'}} ref={tableRef}>
          <div>{title}</div>
          <div className='mb-2.5'>{ data.date }</div>
            <WaterMark content={content} font='40px Microsoft Yahei'>
              <table className="w-full text-sm text-left text-black-50">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {
                      data.headers.map((header) => (
                        <th key={header} className='p-2.5 text-center'>{header}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                    {
                      data.rows.map((row, index) => (
                        <tr key={index} className={
                          cx('border-b', {
                            'bg-red-600 text-white': row[7] === '多',
                            'text-red-600': row[7] === '偏多',
                            'text-green-600': row[7] === '偏空',
                            'bg-green-600 text-white': row[7] === '空',
                          })}
                        >
                          {
                            row.map((col, i) => (
                              <td className='p-2.5 text-center' key={col}>{col}</td>
                            ))
                          }
                        </tr>
                      ))
                    }
                </tbody>
              </table>
          </WaterMark>
          <div className='flex justify-end mb-2'>
            <span>方向搭配技術分析僅供參考，盈虧自負。</span>
          </div>
        </div>
      </div>

    </>
  )
}

HtmlTable.defaultProps = {
  parseCol: (v) => v,
}

HtmlTable.propTypes = {
  data: PropTypes.object,
  tableRef: PropTypes.object.isRequired,
  parseCol: PropTypes.func,
}

export default HtmlTable

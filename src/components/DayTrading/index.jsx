import useDayTrading from '../../hooks/useDayTrading';
import ReportContainer from '../ReportContainer';
import csv from '../../data/dayTrading'

const DayTrading = ({ data, setData }) => {
  const { filename, handleParseCSV, parseCol } = useDayTrading(setData)

  return (
    <ReportContainer
      data={data}
      csv={csv}
      filename={filename}
      handleParseCSV={handleParseCSV}
      parseCol={parseCol}
    />
  )
}

export default DayTrading

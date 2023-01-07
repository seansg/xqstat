import { useState, useCallback, useRef } from 'react'
import _ from 'lodash'
import html2canvas from 'html2canvas';

import CSVReader from 'react-csv-reader'

import HtmlTable from './HtmlTable'

const ReportContainer = ({ data, csv, title, filename, handleParseCSV }) => {
  const tableRef = useRef(null)

  const handleDownloadImage = useCallback(async () => {
    const element = tableRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }, [data, filename])


  const handleParse = useCallback(() => {
    handleParseCSV(csv.split("\n").map(row => row.split(",")))
  }, [handleParseCSV, csv, title])

  return (
    <div className="flex justify-content-center flex-col">
      <div className="my-2.5 mx-2.5 flex gap-x-5">
        <button className='px-5 py-1 bg-[#1da1f2] text-white rounded' onClick={handleParse}>Parse</button>
        <CSVReader
          onFileLoaded={handleParseCSV}
          // fileEncoding='big5'
        />
      </div>

      <div className='m-2.5'>
        <button className='px-5 py-2.5 bg-[#1da1f2] text-white rounded' onClick={handleDownloadImage}>to JEPG</button>
      </div>

      <HtmlTable data={data} tableRef={tableRef} title={title}/>
    </div>
  )
}

export default ReportContainer

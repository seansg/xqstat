import { useCallback, useRef } from 'react'
import _ from 'lodash'
import html2canvas from 'html2canvas';

import HtmlTable from './HtmlTable'

const TableDownloader = ({ data }) => {
  const tableRef = useRef(null)

  const handleDownloadImage = useCallback(async () => {
    const element = tableRef.current;
    const canvas = await html2canvas(element);

    const file = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = file;
      link.download = data.filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(file);
    }
  }, [data])

  return (
    <div className="flex justify-content-center flex-col">
      <div className='m-2.5'>
        <button className='px-5 py-2.5 bg-[#1da1f2] text-white rounded' onClick={handleDownloadImage}>to JEPG</button>
      </div>
      <HtmlTable data={data} tableRef={tableRef} title={data.title}/>
    </div>
  )
}

export default TableDownloader

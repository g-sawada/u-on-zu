import React from "react";
import { convertImage } from './convertImage';

export default function DownloadImage() {

  return(
    <div className='my-5'>
      <button type="button" className='btn btn-primary' onClick={convertImage}>
        DL Image
      </button>
      <div>ここにImage</div>
      <img alt="" id="output" />
    </div>
  )
}

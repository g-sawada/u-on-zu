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

    <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    </div>
  )
}

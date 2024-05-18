import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { downloadImage } from './downloadImage';


const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DownloadImageButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [outputWidth, setOutputWidth] = useState(500);
  const [outputHeight, setOutputHeight] = useState(500);
  const [outputFileName, setOutputFileName] = useState('東京');

  return (
    <div className='my-5'>
      <div>
        <button className="btn btn-primary" onClick={handleOpen}>Open modal</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="" sx={style}>
            <div className="container">
              <h2 className="text-2xl font-bold" style={{marginBottom: '40px'}}>出力ファイル設定</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 100px', gap: '10px' }}>
                <label htmlFor="outputWidth">縦幅</label>
                <input 
                  style={{ border: '1px solid #000' }}
                  id="outputWidth"
                  type='number'
                  value={outputHeight}
                  onChange={(e) => setOutputHeight(e.target.value)}
                  />
                <label htmlFor="outputHeight">横幅</label>
                <input 
                  style={{ border: '1px solid #000' }}
                  id="outputHeight"
                  type='number'
                  min={100}
                  max={1000}
                  step={10}
                  value={outputWidth}
                  onChange={(e) => setOutputWidth(e.target.value)}
                  />
                <label htmlFor="outputFileName">ファイル名</label>
                <input 
                  style={{ border: '1px solid #000', width: '200px'}}
                  id="outputFileName"
                  type='text'
                  value={outputFileName}
                  onChange={(e) => setOutputFileName(e.target.value)}
                  />
              </div>

              <div style={{marginTop: '40px'}}>
                <button style={{width: '200px'}} type="button" className='btn btn-primary' onClick={() => {
                  downloadImage(outputHeight, outputWidth, outputFileName)
                  handleClose()
                }}>
                  DL Image
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <div>ここにImage</div>
      <img alt="" id="output" />
    </div>
  )
}

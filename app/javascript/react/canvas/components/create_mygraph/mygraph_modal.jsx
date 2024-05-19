import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
export default function MyGraphModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='my-5'>
        <button className="btn btn-primary" onClick={handleOpen}>MyGraph</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="" sx={style}>
            <div className="container">
              <h2 className="text-2xl font-bold" style={{marginBottom: '40px'}}>マイグラフ保存</h2>

            </div>
          </Box>
        </Modal>
    </div>
  )
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// pass these functions and states as props into the modal component and receive them
// onClose handles when the user clicks outside the modal, prompting it to close
export default function BasicModal({ open, setOpen, title, setTitle, addData }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input placeholder='Add Title' className='add-input' onChange={(event) => setTitle(event.target.value)} value={title}/>
          <div className='button-container'>
            <button className='add-docs' onClick={addData}>Add</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

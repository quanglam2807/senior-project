import * as React from 'react';
import { PropTypes } from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { doc, setDoc, getFirestore } from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';

import firebaseApp from '../../../firebase-app';
import menuCategories from '../../../constants/menuCategories';

const DialogAdd = ({ open, setOpen }) => {
  const [form, setForm] = React.useState({
    category: menuCategories[0],
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Menu Items</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={form.price || ''}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <TextField
          margin="dense"
          id="calories"
          label="Calories"
          type="number"
          fullWidth
          variant="outlined"
          value={form.calories || ''}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {menuCategories.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <label htmlFor="contained-button-file">
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Choose Image
          </Typography>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            value={form.image || ''}
          />
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={async () => {
            const id = uuidv4();
            const newItem = { ...form };
            delete newItem.image;

            await setDoc(doc(getFirestore(firebaseApp), 'items', id), newItem);

            handleClose();
          }}
          disabled={!form.name || !form.price || !form.calories || !form.category}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogAdd.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DialogAdd;

import React, { useState, useEffect } from 'react';
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
import Box from '@mui/material/Box';

import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';

import menuCategories from '../../../constants/menuCategories';

import itemImageDefault from '../../../images/1600x900.png';

const defaultForm = {
  category: menuCategories[0],
};

const DialogAdd = ({ open, setOpen }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(itemImageDefault);

  useEffect(() => {
    if (!image) {
      setImagePreview(itemImageDefault);
      return () => {};
    }

    if (typeof image === 'string') {
      setImagePreview(image);
      return () => {};
    }

    // create the preview
    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image, setImagePreview]);

  const [form, setForm] = useState(defaultForm);

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
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <label htmlFor="contained-button-file">
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Choose Image
              </Typography>
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    return;
                  }

                  setImage(e.target.files[0]);
                }}
              />
            </label>
          </Box>
          <Box sx={{ flex: 1, p: 2 }}>
            <img src={imagePreview} style={{ aspectRatio: '16/9', width: '100%' }} alt="Preview" />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={async () => {
            const id = uuidv4();
            const newItem = { ...form };
            newItem.price = Number(newItem.price);
            newItem.calories = Number(newItem.calories);

            if (image) {
              const imagePath = `items/${id}.jpg`;
              const storageRef = ref(getStorage(), imagePath);

              if (typeof image === 'string') {
                const blob = await window.fetch(image).then((res) => res.blob());
                await uploadBytes(storageRef, blob);
              } else {
                await uploadBytes(storageRef, image);
              }
            }

            await setDoc(doc(getFirestore(), 'items', id), newItem);

            handleClose();
            setForm(defaultForm);
            setImage(null);
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

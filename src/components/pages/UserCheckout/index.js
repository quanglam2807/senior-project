import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import {
  getFirestore, collection, doc, setDoc, Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';

import ClearIcon from '@mui/icons-material/Clear';

import { clearItems, removeItem } from '../../../reducers/cart';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const UserCheckout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [value, loading, error] = useCollection(
    collection(getFirestore(), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const menuItems = useMemo(() => {
    if (!loading && !error && value) {
      return value.docs.map((_doc) => ({
        id: _doc.id,
        ..._doc.data(),
      }));
    }

    return [];
  }, [value, loading, error]);

  const detailedCartItems = useMemo(() => {
    const arr = cartItems.map((cartItem) => ({
      ...cartItem,
      menuItem: menuItems.find((item) => item.id === cartItem.menuItemId),
    })).filter((cartItem) => cartItem.menuItem);
    return arr;
  }, [cartItems, menuItems]);

  const total = useMemo(() => detailedCartItems
    .reduce((partialSum, a) => partialSum + a.menuItem.price, 0), [detailedCartItems]);

  return (
    <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {detailedCartItems.map((cartItem) => (
          <ListItem
            key={cartItem.id}
            sx={{ py: 1, px: 0 }}
          >
            <Box sx={{ pr: 2 }}>
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeItem(cartItem.id))}>
                <ClearIcon />
              </IconButton>
            </Box>
            <ListItemText primary={cartItem.menuItem.name} secondary={cartItem.menuItem.category} />
            <Typography variant="body2">{currencyFormatter.format(cartItem.menuItem.price)}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(total)}
          </Typography>
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 2 }}>
        <Button
          variant="text"
          size="large"
          disabled={detailedCartItems.length < 1}
          onClick={async () => {
            dispatch(clearItems());
          }}
          sx={{ mr: 1 }}
        >
          Remove All
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={detailedCartItems.length < 1}
          onClick={async () => {
            const orderId = uuidv4();
            await setDoc(doc(getFirestore(), 'orders', orderId), {
              cartItems,
              status: 'pending',
              uid: getAuth().currentUser.uid,
              orderedAt: Timestamp.now(),
              lastUpdatedAt: Timestamp.now(),
            });
            dispatch(clearItems());
            enqueueSnackbar('Ordered successfully! We will notify you when the order is ready.', { variant: 'success' });
            navigate('/user/orders');
          }}
        >
          Make Order
        </Button>
      </Box>
    </Box>
  );
};

export default UserCheckout;

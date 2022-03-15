import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const UserCheckout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [value, loading, error] = useCollection(
    collection(getFirestore(), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const menuItems = useMemo(() => {
    if (!loading && !error && value) {
      return value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
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
    <Box sx={{ m: 4 }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {detailedCartItems.map((cartItem) => (
          <ListItem key={cartItem.id} sx={{ py: 1, px: 0 }}>
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
        <Button variant="contained" size="large">Make Order</Button>
      </Box>
    </Box>
  );
};

export default UserCheckout;

import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  getFirestore, collection, where, query,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import moment from 'moment';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const UserOrders = () => {
  const [menuItemsValue, menuItemsLoading, menuItemsError] = useCollection(
    collection(getFirestore(), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [ordersValue, ordersLoading, ordersError] = useCollection(
    query(
      collection(getFirestore(), 'orders'),
      where('uid', '==', getAuth().currentUser.uid),
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const orders = useMemo(() => {
    if (!ordersLoading && !ordersError && ordersValue) {
      return ordersValue.docs.map((_doc) => ({
        id: _doc.id,
        ..._doc.data(),
      }));
    }

    return [];
  }, [ordersValue, ordersLoading, ordersError]);

  const menuItems = useMemo(() => {
    if (!menuItemsLoading && !menuItemsError && menuItemsValue) {
      return menuItemsValue.docs.map((_doc) => ({
        id: _doc.id,
        ..._doc.data(),
      }));
    }

    return [];
  }, [menuItemsValue, menuItemsLoading, menuItemsError]);

  const detailedOrders = useMemo(() => {
    const o = orders.map((order) => {
      const detailedCartItems = order.cartItems.map((cartItem) => ({
        ...cartItem,
        menuItem: menuItems.find((item) => item.id === cartItem.menuItemId),
      })).filter((cartItem) => cartItem.menuItem);

      const total = detailedCartItems
        .reduce((partialSum, a) => partialSum + a.menuItem.price, 0);

      return {
        ...order,
        detailedCartItems,
        total,
        orderAt: order.orderAt.toDate(),
      };
    });

    o.sort((a, b) => b.orderAt - a.orderAt);

    return o;
  }, [orders, menuItems]);

  return (
    <Box
      sx={{
        flex: 1,
        p: 4,
        overflow: 'auto',
        bgcolor: 'grey.100',
      }}
    >
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <Typography variant="h5" gutterBottom>
        My Orders
      </Typography>

      {detailedOrders.length < 1 && (
        <Typography variant="body2" gutterBottom>
          No orders.
        </Typography>
      )}

      {detailedOrders.map((order) => (
        <Paper key={order.id} sx={{ p: 2, my: 2 }}>
          <Alert severity="info">
            <Typography variant="h6">
              {`Pending. Ordered at ${moment(order.orderAt).format('LLLL')}.`}
            </Typography>
          </Alert>

          <List disablePadding>
            {order.detailedCartItems.map((cartItem) => (
              <ListItem key={cartItem.id} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={cartItem.menuItem.name}
                  secondary={cartItem.menuItem.category}
                />
                <Typography variant="body2">{currencyFormatter.format(cartItem.menuItem.price)}</Typography>
              </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {currencyFormatter.format(order.total)}
              </Typography>
            </ListItem>
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default UserOrders;

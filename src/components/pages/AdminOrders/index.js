import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  getFirestore, collection, where, query, doc, updateDoc, Timestamp,
} from 'firebase/firestore';
import moment from 'moment';
import { useSnackbar } from 'notistack';

import currencyFormatter from '../../../helpers/currencyFormatter';

const AdminOrders = () => {
  const [tabValue, setTabValue] = useState('active');
  const { enqueueSnackbar } = useSnackbar();

  const [menuItemsValue, menuItemsLoading, menuItemsError] = useCollection(
    collection(getFirestore(), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [ordersValue, ordersLoading, ordersError] = useCollection(
    query(
      collection(getFirestore(), 'orders'),
      where('status', 'not-in', tabValue === 'active' ? ['cancelled', 'rejected', 'served'] : ['pending', 'approved', 'prepared']),
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
      };
    });

    o.sort((a, b) => b.orderedAt.toDate() - a.orderedAt.toDate());

    return o;
  }, [orders, menuItems]);

  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'grey.100',
      }}
    >
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} aria-label="Categories">
          <Tab
            value="active"
            label="Active Orders"
          />
          <Tab
            value="past"
            label="Past Orders"
          />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        {detailedOrders.length < 1 && (
          <Typography variant="body2" gutterBottom>
            No orders.
          </Typography>
        )}

        {detailedOrders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, my: 2 }}>
            <Alert
              severity={(() => {
                if (order.status === 'approved') {
                  return 'warning';
                }

                if (order.status === 'rejected' || order.status === 'cancelled') {
                  return 'error';
                }

                if (order.status === 'prepared' || order.status === 'served') {
                  return 'success';
                }

                return 'info';
              })()}
              action={(
                <>
                  {order.status === 'approved' && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 2 }}
                      onClick={async () => {
                        const docRef = doc(getFirestore(), 'orders', order.id);
                        await updateDoc(docRef, {
                          status: 'prepared',
                          preparedAt: Timestamp.now(),
                          lastUpdatedAt: Timestamp.now(),
                        });
                        enqueueSnackbar('Marked order as ready to serve.', {
                          variant: 'success',
                        });
                      }}
                    >
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === 'prepared' && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 2 }}
                      onClick={async () => {
                        const docRef = doc(getFirestore(), 'orders', order.id);
                        await updateDoc(docRef, {
                          status: 'served',
                          servedAt: Timestamp.now(),
                          lastUpdatedAt: Timestamp.now(),
                        });
                        enqueueSnackbar('Marked order as served.', {
                          variant: 'success',
                        });
                      }}
                    >
                      Mark as Served
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mr: 2 }}
                      onClick={async () => {
                        const docRef = doc(getFirestore(), 'orders', order.id);
                        await updateDoc(docRef, {
                          status: 'approved',
                          approvedAt: Timestamp.now(),
                          lastUpdatedAt: Timestamp.now(),
                        });
                        enqueueSnackbar('Approved order. Please start preparing the food.', {
                          variant: 'warning',
                        });
                      }}
                    >
                      Approve
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={async () => {
                        const docRef = doc(getFirestore(), 'orders', order.id);
                        await updateDoc(docRef, {
                          status: 'rejected',
                          rejectedAt: Timestamp.now(),
                          lastUpdatedAt: Timestamp.now(),
                        });
                        enqueueSnackbar('Rejected order.', {
                          variant: 'error',
                        });
                      }}
                    >
                      Reject
                    </Button>
                  )}
                </>
              )}
            >
              <Typography variant="h6">
                {(() => {
                  if (order.status === 'approved') {
                    return `Approved at ${moment(order.approvedAt.toDate()).format('LLLL')}. The food is being prepare.`;
                  }

                  if (order.status === 'rejected') {
                    return `Rejected at ${moment(order.rejectedAt.toDate()).format('LLLL')}.`;
                  }

                  if (order.status === 'cancelled') {
                    return `Cancelled at ${moment(order.cancelledAt.toDate()).format('LLLL')}.`;
                  }

                  if (order.status === 'prepared') {
                    return `Prepared at ${moment(order.preparedAt.toDate()).format('LLLL')}. Time to pick up!`;
                  }

                  if (order.status === 'served') {
                    return `Served at ${moment(order.approvedAt.toDate()).format('LLLL')}.`;
                  }

                  return `Pending. Ordered at ${moment(order.orderedAt.toDate()).format('LLLL')}.`;
                })()}
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
    </Box>
  );
};

export default AdminOrders;

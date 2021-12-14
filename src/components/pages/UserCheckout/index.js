import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'Cheeseburger (Lettuce, tomatos, onions | no pickles)',
    price: '$5.99',
  },
  {
    name: 'Product 2',
    desc: 'French Fries',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Onion Rings',
    price: '$3.45',
  },
  {
    name: 'Product 4',
    desc: 'Ceasar Salad',
    price: '$7.25',
  },
];

const idNumber = ['00498594'];
const payments = [
  { name: 'Payment type', detail: 'Dining Dollars' },
  { name: 'ID Holder', detail: 'Jorge Contreras' },
  { name: 'ID Number', detail: '00498594' },
  { name: 'Expiry date', detail: '05/2024' },
];

const Review = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      {products.map((product) => (
        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={product.name} secondary={product.desc} />
          <Typography variant="body2">{product.price}</Typography>
        </ListItem>
      ))}

      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          $20.14
        </Typography>
      </ListItem>
    </List>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Contact Information
        </Typography>
        <Typography gutterBottom>Jorge Contreras</Typography>
        <Typography gutterBottom>{idNumber.join(', ')}</Typography>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Payment details
        </Typography>
        <Grid container>
          {payments.map((payment) => (
            <React.Fragment key={payment.name}>
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.detail}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default Review;

// JSX

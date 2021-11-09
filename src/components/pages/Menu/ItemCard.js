import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import itemIcon from '../../../images/amirali-mirhashemian-sc5sTPMrVfk-unsplash.jpg';

const ItemCard = ({ name, price, calories }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={itemIcon}
      alt={name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`$${price} | ${calories} calories`}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Add to Cart</Button>
    </CardActions>
  </Card>
);

ItemCard.propTypes = {
  // id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
};

export default ItemCard;

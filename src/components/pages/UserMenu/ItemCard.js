import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { addItem } from '../../../reducers/cart';

import itemImageDefault from '../../../images/1600x900.png';

const ItemCard = ({
  id, name, price, calories, image,
}) => {
  const dispatch = useDispatch();

  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ aspectRatio: '16/9' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h6" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`$${price} | ${calories} calories`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => dispatch(addItem(id))}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.defaultProps = {
  image: itemImageDefault,
};

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  image: PropTypes.string,
};

export default ItemCard;

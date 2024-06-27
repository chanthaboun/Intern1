import React, { useState } from 'react';
import '../Styles/ProductList.css';
import Image1 from '../Images/image1.jpeg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Coffee', price: 120000, pv: 32, image: Image1 },
    { id: 2, name: 'Fah Oil', price: 120000, pv: 32, image: Image1 },
    { id: 3, name: 'Fah Oil', price: 150000, pv: 32, image: Image1 },
    { id: 4, name: 'Hongfah Coffe', price: 120000, pv: 32, image: Image1 },
    { id: 5, name: 'FAH OIL', price: 120000, pv: 1000, image: Image1 },
    { id: 6, name: 'FAH OIL', price: 120000, pv: 1000, image: Image1 },
  ];

  const [spacing, setSpacing] = useState(2);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={3} md={4} lg={3}>
          <Paper
            sx={{
              padding: 2,
              textAlign: 'center',
              color: 'text.secondary',
              height: '100%',
            }}
          >
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1">{`₭ ${product.price.toLocaleString()}`}</Typography>
            <Typography variant="body2">{`${product.pv} pv`}</Typography>
            <Button variant="contained" color="primary">Buy</Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

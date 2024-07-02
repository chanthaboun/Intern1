import React from 'react';
import '../Styles/ProductList.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

import Image1 from '../Images/image1.jpeg';
import Image2 from '../Images/images2.jpeg';
import Image3 from '../Images/images3.jpeg';
import Image4 from '../Images/images4.jpeg';
import Image5 from '../Images/images5.jpeg';
import Image6 from '../Images/images6.jpeg';
import Image7 from '../Images/images7.jpeg';
import Image8 from '../Images/images8.jpeg';
import Image9 from '../Images/images9.jpeg';
import Image10 from '../Images/images10.jpeg';
import Image11 from '../Images/images11.jpeg';
import Image12 from '../Images/images12.jpeg';
import Image13 from '../Images/images13.jpeg';
import Image14 from '../Images/images14.jpeg';
import Image15 from '../Images/images15.jpeg';
import Image16 from '../Images/images16.jpeg';
import Image17 from '../Images/images17.jpeg';
import Image18 from '../Images/images18.jpeg';
import Image19 from '../Images/images19.jpeg';

const ProductList = ({ selectCategory }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Niicha', price: 120000, pv: 100, image: Image1 },
    { id: 2, name: 'Food', price: 120000, pv: 32, image: Image2 },
    { id: 3, name: 'Food', price: 150000, pv: 100, image: Image4 },
    { id: 4, name: 'Food', price: 120000, pv: 32, image: Image5 },
    { id: 5, name: 'Niicha', price: 120000, pv: 32, image: Image12 },
    { id: 6, name: 'Niicha', price: 120000, pv: 1000, image: Image11 },
    { id: 7, name: 'Niicha', price: 120000, pv: 32, image: Image10 },
    { id: 8, name: 'Meal', price: 100000, pv: 1000, image: Image6 },
    { id: 9, name: 'Niicha', price: 120000, pv: 32, image: Image9 },
    { id: 10, name: 'Niicha', price: 120000, pv: 1000, image: Image19 },
    { id: 11, name: 'Niicha', price: 140000, pv: 1000, image: Image15 },
    { id: 12, name: 'Niicha', price: 160000, pv: 1000, image: Image13 },
    { id: 13, name: 'Niicha', price: 120000, pv: 1000, image: Image14 },
    { id: 14, name: 'Niicha', price: 150000, pv: 1000, image: Image18 },
    { id: 15, name: 'Niicha', price: 120000, pv: 1000, image: Image8 },
    { id: 16, name: 'Niicha', price: 120000, pv: 1000, image: Image16 },
    { id: 17, name: 'Meal', price: 120000, pv: 1000, image: Image7 },
    { id: 18, name: 'Niicha', price: 110000, pv: 1000, image: Image17 },
    { id: 19, name: 'Food', price: 90000, pv: 1000, image: Image3 },
  ];

  const filterProducts = selectCategory && selectCategory !== "All Products"
    ? products.filter(product => product.name.toLowerCase().includes(selectCategory.toLowerCase()))
    : products;

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const isOtherCategory = !["Food", "Meal", "Niicha"].includes(selectCategory);

  return (
    <Grid container spacing={1} sx={{ marginTop: 5 }}>
      {filterProducts.length === 0 && isOtherCategory ? (
        <Typography variant="h4" sx={{ margin: 'auto', color: 'red', fontFamily: "'Noto Sans Lao', sans-serif" }}>
          ບໍ່ພົບສິນຄ້າ
        </Typography>
      ) : (
        filterProducts.map((product) => (
          <Grid key={product.id} item xs={4} sm={6} md={4} lg={2}
            sx={{
              marginBottom: { lg: -2, xs: -2.3 },
              marginTop: { xs: -3, lg: -1 }
            }}
          >
            <Paper
              sx={{
                py: 3,
                pr: 0.2,
                pl: 0.2,
                textAlign: 'center',
                color: 'text.secondary',
                height: { lg: '80%', xs: '60%' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: -3,
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: '#048BC9',
                    width: { lg: '100px', xs: '40px' },
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 10,
                    color: '#fff',
                    fontSize: { xs: '10px', lg: '20px' },
                    textAlign: 'center' // Ensure the text is centered within the badge
                  }}
                >
                  {`${product.pv} pv`}
                </Typography>
              </Box>
              <img src={product.image} alt={product.name}
                style={{ 
                  width: '100%', 
                  height: '80%', 
                  marginTop: 2 
                }}
                onClick={() => navigate(`/product-detail/${product.id}`, { state: { product } })}
              />

              <Typography variant="h6"
                sx={{
                  fontSize: { xs: 10, lg: 20, color: 'black' },
                  marginLeft: { xs: -9 }
                }}>
                {product.name}
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Typography variant="body1" sx={{
                  fontWeight: '400px',
                  fontFamily: 'blod',
                  color: '#191A1A',
                  fontSize: { xs: '12px', lg: '20px' },
                  
                }}
                >
                  {`₭ ${product.price.toLocaleString()}`}
                </Typography>
                <AddShoppingCartIcon
                  sx={{
                    backgroundColor: '#048BC9',
                    pr: 1,
                    pl: 1,
                    py: 0.2,
                    marginRight: 2,
                    borderRadius: 2,
                    color: '#fff',
                    fontSize: { xs: '20px', lg: '25px' }
                  }}
                  onClick={(e) => handleAddToCart(product, e)}
                />
              </Box>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProductList;




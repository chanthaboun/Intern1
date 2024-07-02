import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DetailProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;

    return (
        <Box sx={{ padding: 3 }}>
            <Button
                startIcon={<ArrowBackIosIcon fontSize='large' />}
                onClick={() => navigate(-1)}
                sx={{
                    marginBottom: 2,
                    fontFamily: "'Noto Sans Lao', sans-serif",
                    color: 'black',
                    fontSize: '20px'
                }}
            >
                ກັບໄປໜ້າກ່ອນ
            </Button>
            <Paper sx={{ textAlign: 'center', padding: 2 }}>
                <Typography variant="h4" sx={{ marginBottom: 2, fontFamily: 'blod' }}>
                    {product.name}
                </Typography>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto', maxWidth: '200px', borderRadius: 5, backgroundImage: '#fff' }}
                />
                <Typography variant="h6" sx={{ marginTop: 2, color: '#93E972' }}>
                    32 points
                </Typography>
                <Grid container sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6} sx={{ margin: '0 auto' }}>
                        <Paper sx={{
                            padding: 2,
                            textAlign: 'center',
                            backgroundColor: '#B9E6FB',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <Box sx={{ flex: 1,  }}>
                                <Typography variant="subtitle1" sx={{ fontFamily: "'Noto Sans Lao', sans-serif", flex:2 }}>ຍອດຂາຍ</Typography>
                                <Typography variant="h5">50{product.sales}</Typography>
                            </Box>
                            <Divider orientation="vertical" sx={{}} flexItem />
                            <Box sx={{ height: '100%', width: '1px', backgroundColor: '#000', marginX: 1 }} />
                            <Box sx={{ flex: 1,  }}>
                                <Typography variant="subtitle1" sx={{ fontFamily: "'Noto Sans Lao', sans-serif" }}>ລາຄາ</Typography>
                                <Typography variant="h5">₭{product.price.toLocaleString()}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default DetailProduct;
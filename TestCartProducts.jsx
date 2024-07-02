import React, { useRef, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert, Popper } from '@mui/material';
import { useCart } from './CartContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const CartProduct = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const buttonRef = useRef(null)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalPoints = cartItems.reduce((sum, item) => sum + item.pv, 0);
    const [showWarning, setShowWarning] = useState(false);

    const handleConfirmAndPay = () => {
        if (cartItems.length === 0) {
            setShowWarning(true)
        } else {
            navigate('/payment', { state: { totalPrice, totalPoints, itemCount: cartItems.length } });
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Button
                startIcon={<ArrowBackIosIcon fontSize='large' />}
                onClick={() => navigate('/')} // This will navigate to the root path
                sx={{
                    marginBottom: 2,
                    fontFamily: "'Noto Sans Lao', sans-serif",
                    color: 'black',
                    fontSize: '20px'
                }}
            >
                ກັບໄປໜ້າກ່ອນ
            </Button>
            <Typography variant="h6"
                sx={{
                    mb: 2,
                    color: '#3498db',
                    fontFamily: "'Noto Sans Lao', sans-serif",
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                ສິນຄ້າໃນກະຕ່າ
            </Typography>

            <Popper open={showWarning} anchorEl={buttonRef.current} placement="top" transition>
                {({ TransitionProps }) => (
                    <Box {...TransitionProps}
                        sx={{
                            p: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 2,
                            position: 'fixed',
                            top: { lg: '50%' },
                            left: { lg: '50%' }
                        }}>
                        <Alert severity="warning"
                            onClose={() => setShowWarning(false)}
                            sx={{
                                fontFamily: "'Noto Sans Lao', sans-serif",

                            }}
                        >
                            ຍັງບໍ່ມີລາຍການສິນຄ້າ, ກະລຸນາເລືອກສິນຄ້າກ່ອນຊຳລະ.
                        </Alert>
                    </Box>
                )}
            </Popper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead >
                        <TableRow sx={{ backgroundColor: '#3498db' }}>
                            <TableCell sx={{ color: 'white', fontFamily: "'Noto Sans Lao', sans-serif", whiteSpace: { xs: 'nowrap' } }}>ລະຫັດສິນຄ້າ</TableCell>
                            <TableCell sx={{ color: 'white', fontFamily: "'Noto Sans Lao', sans-serif", whiteSpace: { xs: 'nowrap' } }}>ຮູບສິນຄ້າ</TableCell>
                            <TableCell sx={{ color: 'white', fontFamily: "'Noto Sans Lao', sans-serif", whiteSpace: { xs: 'nowrap' } }}>ຊື່ສິນຄ້າ</TableCell>
                            <TableCell sx={{ color: 'white', fontFamily: "'Noto Sans Lao', sans-serif", whiteSpace: { xs: 'nowrap' } }}>ລາຄາ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <img src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell sx={{ whiteSpace: { xs: 'nowrap' } }}>₭{product.price.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 2 }}>
                <Typography sx={{
                    marginLeft: { xs: 10, lg: 35 },
                    fontFamily: "'Noto Sans Lao', sans-serif"
                }}
                >Point ທີ່ທ່ານຈະໄດ້ຮັບ:
                    <span style={{ color: 'green' }}>
                        {totalPoints} point
                    </span></Typography>
                <Typography sx={{
                    marginLeft: { xs: 11, lg: 40 },
                    fontFamily: "'Noto Sans Lao', sans-serif"
                }}>
                    ເງິນທີ່ທ່ານຕ້ອງຊຳລະ: <span sx={{ color: 'black' }}>{totalPrice.toLocaleString()} ກີບ</span>
                </Typography>
            </Box>
            <Button variant="contained"
                sx={{
                    mt: 2,
                    backgroundColor: '#3498db',
                    fontFamily: "'Noto Sans Lao', sans-serif",
                    marginLeft: { xs: 24, lg: 55 }
                }}
                onClick={handleConfirmAndPay}
                ref={buttonRef}
            >
                ຢືນຢັນ ແລະ ຊຳລະ
            </Button>
        </Box>
    );
}

export default CartProduct;

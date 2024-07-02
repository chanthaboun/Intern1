import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton, Alert } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate, useLocation } from 'react-router-dom';
import Images from '../Images/QRcode.png';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [alertColor, setAlertColor] = useState('');

  useEffect(() => {
    if (location.state) {
      setTotalPrice(location.state.totalPrice || 0);
      setItemCount(location.state.itemCount || 0);
    }
  }, [location]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setIsScanned(true);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsScanned(false);
    }
  };

  const handleRefresh = () => {
    navigate('/cart-product');
  };

  const handleConfirmPayment = () => {
    if (isScanned) {
      setAlertMessage('ຊຳລະເງິນສຳເລັດ');
      setAlertColor('#2cdb66');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        const currentDate = new Date().toISOString().split('T')[0];
        navigate('/salehitory', { state: { date: currentDate, quantity: itemCount } });
      }, 2000);
    }
  };

  const handleCancel = () => {
    if (isScanned) {
      setIsScanned(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setAlertMessage('ຍົກເລີກສຳເລັດ');
      setAlertColor('#d93f59');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ maxWidth: '500px', margin: 'auto', boxShadow: 4, p: { lg: 4, xs: 0.5 } }}>
      <IconButton sx={{ mr: 1 }} onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2, fontFamily: "'Noto Sans Lao', sans-serif" }}>
        ວິທີຊຳລະເງິນຄ່າສິນຄ້າ
      </Typography>
      <Grid container spacing={1} >
        <Grid item xs={6}>
          <Button variant="contained" color="primary" fullWidth sx={{ textTransform: 'none' }}>
            <AccountBalanceIcon sx={{ fontSize: 45, marginLeft: { xs: '-25px' } }} />
            <Box sx={{ marginLeft: { xs: '20px' } }}>
              <Typography sx={{ fontSize: { xs: '15px' }, fontFamily: "'Noto Sans Lao', sans-serif" }}>ຊຳລະຜ່ານບັນຊີ</Typography>
              <Typography sx={{ fontSize: { xs: '15px' }, fontFamily: "'Noto Sans Lao', sans-serif" }}>ທະນາຄານ</Typography>
            </Box>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth sx={{ textTransform: 'none', backgroundColor: '#B6C3BE' }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 45, marginLeft: { xs: '-19px' }, color: '#626564' }} />
            <Box sx={{ marginLeft: { xs: '20px' } }}>
              <Typography sx={{ fontSize: { xs: '15px' }, fontFamily: "'Noto Sans Lao', sans-serif", color: '#737776' }}>ຊຳລະຜ່ານກະເປົາ</Typography>
              <Typography sx={{ fontSize: { xs: '15px' }, fontFamily: "'Noto Sans Lao', sans-serif", color: '#737776' }}>Ewallet</Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ maxWidth: '500px', margin: 'auto', boxShadow: 4, p: { lg: 4, xs: 2 } }}>
        <Box sx={{ marginLeft: { xs: '-150px', lg: '-210px' } }}>
          <Typography gutterBottom sx={{ textAlign: 'center', mb: 2, fontFamily: "'Noto Sans Lao', sans-serif" }}>
            ຊຳລະຜ່ານ QR ນີ້
          </Typography>
          <Typography gutterBottom sx={{ textAlign: 'center', mb: 2, fontFamily: "'Noto Sans Lao', sans-serif" }}>
            ຈຳນວນເງິນທີ່ຕ້ອງໂອນ
          </Typography>
          <Typography color="primary" sx={{ textAlign: 'center', mb: 2, fontFamily: "'Noto Sans Lao', sans-serif" }}>
            {totalPrice !== undefined ? totalPrice.toLocaleString() : '0'} ກີບ
          </Typography>
        </Box>

         {showAlert && (
          <Alert severity="success" sx={{
            mb: 2,
            fontFamily: "'Noto Sans Lao', sans-serif",
            width: '150px',
            height: '150px',
            position: 'fixed',
            top: {lg:'50%', xs:'30%'},
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: alertColor
          }}>
            {alertMessage}
          </Alert>
        )}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={Images}
                alt="LAPNet QR Code"
                style={{ width: '150px', height: '150px' }}
              />
            </Box>
          </Grid>
        <Grid item xs={6}>
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', width: '150px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <Box sx={{ mt: 2, width: '100%', height: '100%' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CloudUploadIcon sx={{ fontSize: 40, color: 'grey' }} />
                  <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: 20 }, fontFamily: "'Noto Sans Lao', sans-serif" }}>
                    ອັບໂຫລດໃບບິນ
                  </Typography>
                </Box>
              )}
              <label htmlFor="raised-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  size="small"
                  sx={{ textTransform: 'none', fontFamily: "'Noto Sans Lao', sans-serif" }}
                >
                  ເລືອກຮູບ
                </Button>
              </label>
            </Paper>
          </Grid>

        </Grid>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: { xs: -1 } }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: 'none',
              backgroundColor: isScanned ? '#FF0000' : '#CED9D6',
              '&:hover': {
                backgroundColor: isScanned ? '#FF3333' : '#D8E0DD'
              }
            }}
            onClick={handleCancel}
          >
            <Typography sx={{ fontFamily: "'Noto Sans Lao', sans-serif", color: '#ffff', fontWeight: 'bold' }}> ຍົກເລີກ</Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: 'none', fontFamily: "'Noto Sans Lao', sans-serif" }}
            onClick={handleConfirmPayment}
            disabled={!isScanned}
          >
            ຢັ້ງຢືນຊຳລະເງິນ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;

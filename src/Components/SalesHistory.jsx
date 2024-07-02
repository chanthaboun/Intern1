import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location = useLocation();

  useEffect(() => {
    // Load sales data from local storage
    const storedSalesData = JSON.parse(localStorage.getItem('salesData')) || [];
    setSalesData(storedSalesData);

    if (location.state && location.state.date && location.state.quantity) {
      const { date, quantity } = location.state;
      const newSale = {
        invoiceNumber: generateInvoiceNumber(),
        orderDate: date,
        quantity: quantity
      };

      // Check if the entry already exists
      const exists = storedSalesData.some(sale => 
        sale.orderDate === newSale.orderDate && sale.quantity === newSale.quantity
      );

      if (!exists) {
        const updatedSalesData = [...storedSalesData, newSale];
        setSalesData(updatedSalesData);
        // Save updated sales data to local storage
        localStorage.setItem('salesData', JSON.stringify(updatedSalesData));
      }
    }
  }, [location.state]);

  useEffect(() => {
    filterData();
  }, [salesData, startDate, endDate]);

  const generateInvoiceNumber = () => {
    return 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const filterData = () => {
    if (!startDate && !endDate) {
      setFilteredData(salesData);
    } else {
      const filtered = salesData.filter(sale => {
        const saleDate = new Date(sale.orderDate);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return saleDate >= start && saleDate <= end;
      });
      setFilteredData(filtered);
    }
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredData.map(sale => ({
      'Invoice Number': sale.invoiceNumber,
      'Order Date': sale.orderDate,
      'Quantity': sale.quantity
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales History');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'sales_history.xlsx');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h5"
        gutterBottom
        sx={{
          fontFamily: "'Noto Sans Lao', sans-serif",
          display: { lg: 'flex' },
          justifyContent: { lg: 'center' }
        }}
      >
        ປະຫວັດການຂາຍ
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" sx={{ display: { xs: 'flex' } }}>
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size='small'
            sx={{ width: { xs: '150px' }, }}
          />
          <Typography sx={{ fontFamily: "'Noto Sans Lao', sans-serif" }} mx={0.5}>ຫາ</Typography>
          <TextField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size='small'
            sx={{ width: { xs: '150px' } }}
          />
          <Button
            sx={{
              width: { xs: '80px' },
              height: { xs: '40px' },
              marginLeft: { xs: 0.5 },
              backgroundColor: "#0EA2D5",
              '&:hover': {
                backgroundColor: "#0EA2D5", // Same color to remove hover effect
              }
            }}
            onClick={handleExport}
          >
            <Typography sx={{ fontSize: { xs: '10px' }, color: '#fff' }}>Export to Excel</Typography>
          </Button>
        </Box>
      </Box>
      {filteredData.length === 0 && (
        <Typography sx={{ textAlign: 'center', color: 'red', fontFamily: "'Noto Sans Lao', sans-serif", mb: 2 }}>
          ບໍ່ມີລາຍການຂາຍ
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3498db' }}>
              <TableCell sx={{ fontFamily: "'Noto Sans Lao', sans-serif", color: '#fff' }}>ເລກທີບິນ</TableCell>
              <TableCell sx={{ fontFamily: "'Noto Sans Lao', sans-serif", color: '#fff' }}>ວັນທີ່ສັ່ງຊື້</TableCell>
              <TableCell sx={{ fontFamily: "'Noto Sans Lao', sans-serif", color: '#fff' }}>ຈຳນວນສິນຄ້າ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.invoiceNumber}>
                <TableCell>{row.invoiceNumber}</TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default SalesHistory;








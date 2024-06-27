import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import '../Styles/Header.css'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ProductList from './ProductList';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



// Select Form code 
const ITEM_HEIGHT = 48; // ກຳນົດຄວາມສູງຂອງລາຍການ
const ITEM_PADDING_TOP = 8; // ກຳນົດຄວາມກວ້າງຂອງ



const MenuProps = (theme) => ({
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: theme.breakpoints.down('xs') ? 120 : 150,
        },
    },
});

const names = [
    'All Products',
    'Niicha',
    'Food',
    'Meal',
];

// Search Section

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: '#ffffff',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    // width:'100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',  // ເພີ່ມຄວາມກວ້າງເປັນ 100%
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',  // ເຮັດໃຫ້ input ໃຊ້ພື້ນທີ່ທັງໝົດ
        [theme.breakpoints.up('md')]: {
            with: '20ch'
        }
    },
}));


// Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 2,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Header = () => {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [selectCategory, setSelectCategory] = useState('')


    // Old Code 
    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;

    //     const selectValue = typeof value === 'string' ? value.split(',') : value
    //     setPersonName(selectValue[0]);
    //     setSelectCategory(selectValue[0] || '')
    // };

    // New Code 
    const handleChange = (event) => {
        const { value } = event.target;
        setPersonName(value);
        setSelectCategory(value === 'All Products' ? '' : value);
    };


    return (
        <Box >
            <AppBar component='nav' sx={{ padding: '10px' }} >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: { md: '100%' } }}>
                    <FormControl sx={{ width: { xs: '68%', sm: 300 }, mt: 2, marginLeft: { xs: -0.5 } }} className='form'>
                        <Select
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },

                            }}
                            displayEmpty
                            value={personName}
                            onChange={handleChange}
                            input={
                                <OutlinedInput size='small' sx={{ pt: 200 }} />
                            }
                            renderValue={(selected) => {
                                if (!selected || selected.length === 0) {
                                    return <Typography sx={{ color: '#fff', fontFamily: "'Noto Sans Lao', sans-serif", }}>ປະເພດສິນຄ້າ...</Typography>
                                }

                                return selected
                            }}
                            MenuProps={MenuProps(theme)}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {names.map((name) => (
                                // <MenuItem
                                //     key={name}
                                //     value={name}
                                //     style={{
                                //         fontWeight:
                                //             personName.indexOf(name) === -1
                                //                 ? theme.typography.fontWeightLight
                                //                 : theme.typography.fontWeightMedium
                                //     }}
                                // >
                                //     {name}
                                // </MenuItem>

                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <IconButton aria-label="cart" sx={{ backgroundColor: '#B3ECff', padding: 1, marginTop: 2, marginRight: { xs: 3, lg: 5 } }}>
                        <StyledBadge badgeContent={20} color="secondary" sx={{ fontSize: 30 }}>
                            <ShoppingCartIcon sx={{ fontSize: { lg: 30, xs: 25 } }} />
                        </StyledBadge>
                    </IconButton>

                </Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap', marginTop: 1 }}>
                    <Search sx={{
                        backgroundColor: '#fff',
                        width: { xs: '60%', sm: '50%', md: '50%' },  // Adjust the width as needed, for example '80%' or '500px'
                        marginRight: '10px',
                        transition: 'background-color 0.3s',  // Add transition for hover effect
                        padding: 0.5
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ width: { xs: '50%' }, color: '#1DB2F7', fontSize: '40px', fontWeight: '10px', marginTop: -1, marginRight: 90 }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{
                                color: 'gray',
                                width: '100%',  // Use the full width of the Search component
                                '& .MuiInputBase-input': {
                                    width: '100%',  // Make the input use the full width
                                }
                            }}
                        />
                    </Search>
                    <Button variant="contained" sx={{ fontFamily: "'Noto Sans Lao', sans-serif", pr: 4, pl: 4, py: 1.3, borderRadius: '2px', marginTop: { xs: -0.5, sm: 0 } }}>ຄົ້ນຫາ</Button>
                </Box>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 20 }}> {/* Adjust mt (margin-top) as needed */}
                <ProductList SelectCategory={selectCategory} />
            </Container>
        </Box>
    )
}

export default Header

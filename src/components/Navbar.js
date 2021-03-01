import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleCart} from '../redux/actions/cartActions'
import {logout} from '../redux/actions/authActions'
import {auth} from '../firebase/config' 
// Styles
import {AppBar, Typography, Toolbar, InputBase, Badge, IconButton, Menu, MenuItem} from '@material-ui/core'
import {PermIdentity, ShoppingCart, Headset, Search} from '@material-ui/icons'
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

const theme = createMuiTheme({
    overrides:{
        MuiIconButton:{
            root:{
                borderRadius: 0,
                fontSize: '1.2rem',
                padding: 8,
            }
        }
    }
})

const useStyles = makeStyles((theme) => ({
    navbar:{
        padding: theme.spacing(0, 3),
        [theme.breakpoints.up('md')]:{
            padding: theme.spacing(0,8)
        }
    },
    navbarContent:{
        display: 'flex',
        justifyContent:'space-between',
    },
    toolbarMobile:{
        display: 'block',
        [theme.breakpoints.up('sm')]:{
            display :'none',
        },
    },
    navbarBrand:{
        fontSize: '1rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem'
        },
    },
    searchBar:{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(3),
    },
    searchBarExpand: {
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.palette.common.black,
            backgroundColor: theme.palette.common.white,
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(3),
            flexGrow: 1,
            width: 'auto',
        },
      },
      searchButton: {
        padding: theme.spacing(0, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        padding: theme.spacing(1, 2, 1, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
      },
      sectionDesktop: {
          '& > * ':{
              padding: theme.spacing(.5),
          },
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          '& > * + *':{
              marginLeft: theme.spacing(3)
          },
        },
      },
      menuLinks:{
          marginLeft: theme.spacing(.625),
          display: 'none',
          [theme.breakpoints.up('md')]:{
              display: 'inline-block'
          }
      },
      popover:{
          marginTop: theme.spacing(4),
      },
}))

const Navbar = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const {cart, toggleCart, isAuthenticated, logout} = props;
    const {items} = cart;
    const getTotalItems = (items) => items.reduce((ack, item) => ack + item.amount, 0)
    const [anchorEl, setAnchorEl] = useState(null);
    const menuId = 'primary-search-account-menu';
    const history = useHistory()

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        auth.signOut();
        logout()
        history.push('/');
    }

    const linksReset = {
        textDecoration: 'none',
        color: 'inherit'
    }

    const mobileSearchBar = (
        <Toolbar className={classes.toolbarMobile}>
            <div className={classes.searchBar}>
                <InputBase
                    placeholder="Czego szukasz..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton >
                    <Search />
                </IconButton>   
            </div>
        </Toolbar>
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className={classes.popover}
        >
          <MenuItem onClick={handleMenuClose}>Twoje zamówienia  </MenuItem>
          <MenuItem onClick={handleMenuClose}>Twoje dane</MenuItem>
          <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
        </Menu>
      );

    const authLink = (
        <>
            <IconButton 
                color="inherit"   
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
            >
                <PermIdentity />
                <Typography variant="subtitle1" className={classes.menuLinks}>Konto</Typography>
            </IconButton>
            {renderMenu}
        </>
    );

    const guestLink = (
        <Link to="/login" style={linksReset}>
            <IconButton color="inherit">
                <PermIdentity />
                <Typography variant="subtitle1" className={classes.menuLinks}>Zaloguj się</Typography>
            </IconButton>
        </Link>
    );

    return (
        <ThemeProvider theme={theme}>
            <AppBar ref={ref} className={classes.navbar}>
                <Toolbar className={classes.navbarContent}>
                    <Link to='/' style={linksReset}>
                        <Typography variant="h5" align="center" className={classes.navbarBrand}>
                            Sklep Online
                        </Typography>
                    </Link>
                    <div className={classes.searchBarExpand}>
                        <InputBase
                            placeholder="Czego szukasz..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton >
                            <Search />
                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>
                        {
                            isAuthenticated ? authLink : guestLink 
                        }
                            
                        <IconButton color="inherit">
                            <Headset />
                            <Typography variant="subtitle1" className={classes.menuLinks}>Infolinia</Typography>
                        </IconButton>
                        <IconButton onClick={toggleCart} color="inherit">
                            <Badge color="secondary" badgeContent={getTotalItems(items)}>
                                <ShoppingCart />
                            </Badge>
                            <Typography variant="subtitle1" className={classes.menuLinks}>Koszyk</Typography>
                        </IconButton>
                    </div>
                </Toolbar>
                {mobileSearchBar}
            </AppBar>
        </ThemeProvider>
    )
})

Navbar.propTypes = {
    cart: PropTypes.object.isRequired,
    toggleCart: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {toggleCart, logout})(Navbar)

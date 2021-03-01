import {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
// Redux
import {toggleCart} from './redux/actions/cartActions'
import {loadUser} from './redux/actions/authActions'
import {connect} from 'react-redux'
// Styles
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {Drawer, Slide, useScrollTrigger} from '@material-ui/core'
// Components
import Navbar from './components/Navbar'
import Checkout from './components/Checkout'
import Home from './components/Home'
import Cart from './components/cart/Cart'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProductDetails from './components/ProductDetails'
import CartDialog from './components/CartDialog'

const mainTheme = createMuiTheme()

const HideOnScroll = ({children}) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

const App = ({cart, toggleCart, loadUser}) => {
  const {isOpen} = cart;

  useEffect(() => {
    loadUser()
  }, [])

  const PrivateRoute = ({children, cart}) => {
    const emptyCart = cart.items.length === 0 ? true : false;
    return (
      <Route
        render={({location}) => 
          emptyCart ? (
            <Redirect to={{pathname: '/', state: {from: location}}}/>
            ) : (
              children
            )
        }
      />
    )
  }
         
  return (
      <ThemeProvider theme={mainTheme}>
          {/* <Drawer anchor='right' open={isOpen} onClose={toggleCart}>
              <Cart />
          </Drawer> */}
          <CartDialog onClose={toggleCart} open={isOpen}/>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/checkout" cart={cart}>
              <Checkout/>
            </PrivateRoute>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/register" component={SignUp}/>
            <Route path="/:category/:id" children={<ProductDetails />}/>
          </Switch>
      </ThemeProvider>
  );
}

App.propTypes = {
  cart: PropTypes.object.isRequired,
  toggleCart: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, {toggleCart, loadUser})(App)

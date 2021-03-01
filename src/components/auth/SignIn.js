import React, { useState, useEffect } from 'react'
import {Link as RouterLink, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signIn, signInWithGoogle} from '../../redux/actions/authActions'
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import validate from '../../validation/validate'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    alert:{
        color: 'red',
        marginTop: theme.spacing(2),
    },
  }));

const SignIn = ({signIn, signInWithGoogle, user}) => {
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [credError, setCredError] = useState('')
  const classes = useStyles();
  let history = useHistory();
  const GooglePlus = <FontAwesomeIcon icon={faGooglePlusG}/>

  useEffect(() => user ? history.goBack() : null)

    const handleChange = input => e => {
        e.preventDefault();
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordLogin = () => {
      const errors = validate(loginData)
      if(Object.entries(errors).length === 0){
        signIn(loginData) ? history.goBack() : setCredError('Nieprawidłowy email lub hasło.')
      }else{
        setFormErrors(errors);
      } 
      setLoginData({email: '', password: ''})
    }

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {credError && <Typography component="p" variant="subtitle1" className={classes.alert}>{credError}</Typography>}
          <form className={classes.form}>
            <TextField
              autoFocus
              required
              fullWidth
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange()}
              helperText={formErrors['email']}
              error={formErrors['email'] ? true:false}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange()}
              helperText={formErrors['password']}
              error={formErrors['password'] ? true:false}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handlePasswordLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              startIcon={GooglePlus}
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
          </form>
        </div>
      </Container>
        
    )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {signIn, signInWithGoogle})(SignIn)

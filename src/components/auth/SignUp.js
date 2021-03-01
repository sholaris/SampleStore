import React, {useState} from 'react';
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import validate from '../../validation/validate';
import {connect} from 'react-redux'
import {register} from '../../redux/actions/authActions'


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
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert:{
        marginTop: theme.spacing(2),
        color: "red",
        width: '100%',
        fontWeight: 'bold',
    },
}));

const SignUp = ({register}) => {
    const classes = useStyles();
    const [registerData, setRegisterData] = useState({firstName:'', lastName:'', email:'', password:''});
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('')
    let history = useHistory();

    const handleChange = e => {
        e.preventDefault();
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        const errors = validate(registerData)
        if(Object.entries(errors).length === 0){
            register(registerData) ? history.push('/') : setRegisterError('Konto o podanym adresie email już istnieje.');
        }else{
            setErrors(errors);
        }

        setRegisterData({firstName:'', lastName:'', email:'', password:''})
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                {registerError && <Alert variant="outlined" severity="error" className={classes.alert}>{registerError}</Alert>}
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        name="firstName"
                        variant="outlined"
                        id="firstName"
                        label="First Name"
                        helperText={errors['firstName'] && errors['firstName']}
                        error={errors['firstName'] ? true:false}
                        onChange={(e) => handleChange(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        helperText={errors['lastName'] && errors['lastName']}
                        error={errors['lastName'] ? true:false}
                        onChange={(e) => handleChange(e)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        id="email"
                        label="Email Address"
                        name="email"
                        helperText={errors['email'] && errors['email']}
                        error={errors['email'] ? true:false}
                        onChange={(e) => handleChange(e)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        helperText={errors['password'] && errors['password']}
                        error={errors['password'] ? true:false}
                        onChange={(e) => handleChange(e)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    );
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired,
}

export default connect(null, {register})(SignUp)



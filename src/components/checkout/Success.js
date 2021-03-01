import React from 'react'
import {Alert, AlertTitle} from '@material-ui/lab'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    root:{
        width: '80%',
        margin: '0 auto',
        padding: '20px'
    }
})

const Success = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity="success">
                <AlertTitle>Brawo</AlertTitle>
                Zamówienie zostało pomyślnie zrealizowane!
            </Alert>
        </div>
    )
}

export default Success

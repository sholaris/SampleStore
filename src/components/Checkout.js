import React from 'react'
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Main from './checkout/Main'

const useStyles = makeStyles((theme) => ({
  wrap:{
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}))

const Checkout = () => {
    const classes = useStyles()
        return (
            <Container fixed className={classes.wrap}>
                <Main/>
            </Container>
        )
}

export default Checkout

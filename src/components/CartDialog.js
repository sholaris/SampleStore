import React from 'react'
import {Dialog, DialogContent, DialogTitle, Typography, Divider, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import CloseIcon from '@material-ui/icons/Close'
import Cart from './cart/Cart'


const useStyles= makeStyles((theme) => ({
    hr:{
        backgroundColor: 'lightblue',
    },
    closeButton:{
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))

const CartDialog = ({onClose, open}) => {
    const classes = useStyles();
    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h5" component="h2" gutterBottom>Twój koszyk</Typography>
                <IconButton className={classes.closeButton} onClick={onClose}><CloseIcon/></IconButton>
                <Divider className={classes.hr}/>
            </DialogTitle>
            <DialogContent>
                <Cart onClose={onClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default CartDialog

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import {useParams, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../redux/actions/cartActions'
import {LinearProgress, Grid, Button, Typography, Container, Box, List, ListItem, ListItemText, TextField} from '@material-ui/core'
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core'
import {Rating, Alert} from '@material-ui/lab'
import {makeStyles} from '@material-ui/styles'
import Review from './Review'
import content from '../manifest.json'

const useStyles = makeStyles((theme) => ({
    progress:{
        width: '100%',
        marginTop: theme.spacing(9),
    },
    container:{
        marginTop: theme.spacing(10),
        color: theme.palette.grey[800],
    },
    image:{
        width: '95%',
        height: 'auto',
    },
    spacingTop:{
        marginTop: theme.spacing(4),
    },
    flexColumn:{
        flexDirection: 'column',
    },
    justify:{
        textAlign: 'justify',
    },
    upper:{
        textTransform: 'uppercase',
    },
    available:{
        color: theme.palette.success.main,
    },
    btnContrast:{
        display: 'block',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        margin: '2rem auto',
        borderRadius: 0,
        padding: theme.spacing(1, 3),
        '&:hover':{
            backgroundColor: 'rgba(0,0,0, 0.6)',
        },
    },
    btnSmall:{
        padding: theme.spacing(.5, 1),
    },
}))

const ProductDetails = ({addToCart, isAuthenticated}) => {
    const classes = useStyles();
    const [qty, setQty] = useState(1);
    const reviews = content.reviews;

    let {id} = useParams();

    const getProduct = async () => {
        return await (await fetch(`https://fakestoreapi.com/products/${id}`)).json();
    }

    const add = () => {
        setQty((prev) => (prev + 1))
    }

    const remove = () => {
        return qty > 1 ? setQty((prev) => (prev - 1)) : null
    }

    const {data: Product, isLoading, isError} = useQuery("getProduct", getProduct)

    if(isLoading) return (
        <div className={classes.progress}><LinearProgress/></div>
    )

    if(isError) return <div>Something went wrong...</div>

    return (
       <Container maxWidth="lg" className={classes.container}>
           <Link to="/" style={{textDecoration: 'none', color:'inherit'}}>
                <Button href="/">Wróć</Button>
           </Link>
           <Grid container xs={12} spacing={3} className={classes.spacingTop}>
               <Grid item xs={5}>
                   <Box  mb={4}>
                       <img src={Product.image} alt={Product.title} className={classes.image}/>
                   </Box>
                   <Typography variant="h4" component="h2" paragraph className={classes.upper}>Opinie</Typography>
                   {reviews && 
                        <List>
                            {reviews.map(review => <ListItem alignItems="flex-start" divider><Review content={review}/></ListItem>)}
                        </List>
                    }
                    <Typography variant="h6" component="h2" paragraph className={classes.upper}>Dodaj swoją opinię</Typography>
                    {
                        isAuthenticated ? (
                            <TextField
                                multiline
                                fullWidth
                                name="opinion"
                                label="Twoja opinia"
                                rows={4}
                                variant="outlined"
                            />
                        ) : (
                            <Alert severity="info">Zaloguj się aby dodać opinie.</Alert>
                        )
                    }
               </Grid>
               <Grid item xs={4}>
                   <List>
                       <ListItem alignItems="flex-start" divider className={classes.flexColumn}>
                           <ListItemText primary={<Typography variant="h6" component="h3" paragraph>{Product.title}</Typography>}/>
                           <Box display="flex">
                                <Typography variant="body1" component="p">Oceny</Typography>
                                <Rating
                                    name="prodcutRating"
                                    value={3}
                                    readOnly
                                />
                           </Box>
                       </ListItem>
                       <ListItem alignItems="flex-start" divider>
                            <ListItemText primary={<Typography variant="body1" component="p">Cena: ${Product.price}</Typography>}/>
                       </ListItem>
                       <ListItem alignItems="flex-start">
                            <ListItemText primary={<Typography variant="body2" component="p" className={classes.justify}>{Product.description}</Typography>}/>
                       </ListItem>
                   </List>
               </Grid>
               <Grid item xs={3}>
                   <Table>
                       <TableBody>
                           <TableRow>
                               <TableCell/>
                               <TableCell/>
                           </TableRow>
                           <TableRow>
                               <TableCell>Cena:</TableCell>
                               <TableCell>{`$${(Product.price*qty).toFixed(2)}`}</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Status:</TableCell>
                               <TableCell className={classes.available}>Dostępny w sklepie</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Ilość:</TableCell>
                               <TableCell>
                                   <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Button
                                            size="small"
                                            className={classes.btnSmall}
                                            disableElevation
                                            disableRipple
                                            variant="contained"
                                            onClick={remove}
                                        >-</Button>
                                        <Typography variant="subtitle1" component="p">{qty}</Typography>
                                        <Button
                                            size="small"
                                            className={classes.btnSmall}
                                            disableElevation
                                            disableRipple
                                            variant="contained"
                                            onClick={add}
                                        >+</Button>
                                   </Box>
                               </TableCell>
                           </TableRow>
                       </TableBody>
                   </Table>
                   <Button 
                        variant="contained" 
                        className={classes.btnContrast}
                        onClick={() => addToCart(Product, qty)}
                        >Dodaj do koszyka</Button>
               </Grid>
           </Grid>
       </Container>
    )
}

ProductDetails.propTypes = {
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addToCart})(ProductDetails)

import React from 'react'
import PropTypes from 'prop-types'
import {Link as RouterLink } from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'
import {Rating} from '@material-ui/lab'
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    fullHeight:{
        height: '100%',
    },
    card:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width:'100%',
        height: '100%',
        [theme.breakpoints.up('lg')]:{
            margin: '0 auto',
            width: '80%',
        },
    },
    content:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productImage:{
        height: 250,
        backgroundSize: 'contain',
    },
    addToCart:{
        width: '100%',
        backgroundColor: theme.palette.grey[200],
        '&:hover':{
            backgroundColor: theme.palette.grey[300],
        },
    },
    price:{
        marginTop: theme.spacing(2),
        fontSize: '1.8rem',
    },
}))

const Product = ({content, category}) => {
    const classes = useStyles();
    const slugify = value => {
        value = value.replace(/[()\s/.]/g, "-");
    }
    return (
            <Card className={classes.card}>
                <RouterLink to={`/${category}/${content.id}`} style={{textDecoration: 'none', color:'inherit'}}>
                        <CardActionArea className={classes.fullHeight}>
                            <CardMedia
                                className={classes.productImage}
                                image={content.image}
                                title={content.title}
                            />
                            <CardContent className={classes.content}>
                                <Typography
                                    paragraph
                                    variant="subtitle1"
                                    component="h3"
                                    align="left"
                                >
                                    {content.title}
                                </Typography>
                                <Rating value={4} name="productRating" readOnly/>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    align="left"
                                    className={classes.price}
                                >
                                    {'$' + content.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                </RouterLink>
            </Card>
    )
}


Product.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        category: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
}
export default Product

import React from 'react'
import {useQuery} from 'react-query'
import {LinearProgress, Container, Grid, Divider, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Product from './Product';

const useStyles = makeStyles((theme) => ({
    section:{
        margin: theme.spacing(8, 0),
    },
    topSpacing:{
        marginTop: theme.spacing(10),
    },
    root:{
        width: '100%',
        marginTop: theme.spacing(1),
    },
    progress:{
        width: '100%',
        marginTop: theme.spacing(9),
    },
    hr:{
        marginBottom: theme.spacing(3),
        height: 2,
        backgroundColor: 'lightblue',
    },
    heading:{
        margin: theme.spacing(2, 0),
        padding: theme.spacing(0, 1),
        textTransform: 'uppercase',
    }
}))

const Home = () => {
    
        const classes = useStyles();
    
        const getProducts = async () => {
            return await (await fetch('https://fakestoreapi.com/products')).json();
        }

        const getCategories = async () => {
            return await (await fetch('https://fakestoreapi.com/products/categories')).json();
        }

        const {data: products, isLoading, isError} = useQuery('products', getProducts)
        const {data: categories, status, error} = useQuery('categories', getCategories)

        if (isLoading || status === "loading") return (
          <div className={classes.progress}>
              <LinearProgress/>
          </div>
        )
    
        if(isError || error) return <div>Something went wrong...</div>

        return (
            <Container maxWidth='lg' className={classes.topSpacing}>
                {categories?.map(category => (
                    <React.Fragment key={category}>
                        <section className={classes.section}>
                            <Typography variant="h5" component="h3" className={classes.heading}>{category}</Typography>
                            <Divider className={classes.hr}/>
                            <Grid container spacing={2} className={classes.root}>
                                {products?.map(product => product.category === category ? (
                                    <Grid item xs={12} sm={4}>
                                        <Product key={product.id} content={product} category={category}/>
                                    </Grid>
                                ) : null)}
                            </Grid>  
                        </section>
                    </React.Fragment>
                ))}
            </Container>
        )
}

export default Home

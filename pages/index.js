import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Product from '../models/Product';
// import data from "../utils/data";
import db from '../utils/db';
import { useContext } from 'react';
import { Store } from '../utils/store';
import ProductItem from '../components/ProductItem';
// import Carousel from 'react-material-ui-carousel';
// import useStyles from '../utils/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from '../utils/classes';

export default function Home(props) {
  // const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/cart');
  };
  return (
    <Layout>
      {/* <Carousel className={classes.mt1} animation="slide"> */}
      <Carousel>
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
            sx={classes.flex}
          >
            {/* <img
              src={product.featuredImage}
              alt={product.name}
              className={classes.featuredImage}
            ></img> */}
            <img src={product.featuredImage} alt={product.name}></img>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products 1</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({ rating: -1 })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}

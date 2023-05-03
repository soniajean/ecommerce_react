import { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";

const Shop = () => {
    /* What now?
    1. Make an API call to our flask app
    2. set up state variable for products
    3. set that state variable based on the API call
    4.  Set up a way to display those products (otherwise we'll show loading)
    */

    const db = useDatabase();
    const { data:user } = useUser();


    const web_url = 'https://ecomproj.onrender.com/';
    const local_url = 'http://127.0.0.1:5000';
    console.log(web_url, local_url);

    const getProductData = async () => {
        let response = await axios.get(web_url);
        return response.status === 200 ? response.data : null
    }

    const loadProductData = async () => {
        let data = await getProductData();
        // console.log(data, typeof data);
        setProducts(data.data)

    }

    const [products, setProducts] = useState(() => loadProductData());
    // useEffect(loadProductData());  DON"T do this, infinite loop

    // access our cart from our context provider AND its setter
    const {cart, setCart} = useContext(DataContext);

    // func to add product to cart
    const addProduct = (product) => {
        // this is our 'usual' process at this point
        let copyCart = {...cart}

        copyCart.size ++;
        copyCart.total += product.price;
        
        // if (copyCart.products[product.id]){
        //     copyCart.products[product.id].quantity ++;
        // } else {
        //     copyCart.products[product.id] = {data: product, quantity:1};
        // }
        copyCart.products[product.id] ?
        copyCart.products[product.id].quantity ++
        :
        copyCart.products[product.id] = {data: product, quantity:1};
        console.log(copyCart);
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }

    return (
        <div className="container">
            <div className="row">
                <h1> SHOP SHOP SHOP  till you drop.</h1>
            </div>
            <div className="row">
                {/* this is where we'll throw in a bootstrap for each product */  console.log(products, typeof products)}
                {typeof products === 'object' && !products.then ? products.map((product, index) => {
                    return <div className="card m-4 border border-4 border-dark" key={index} style={{width: 18 + 'rem'}}>
                        <img src={product.img_url} className="card-img-top mt-3 rounded" alt={product.name} />
                        <div className="card-body">
                            <h3>{product.name}</h3>
                            <h5 className="card-title">{product.make} {product.model}</h5>
                            <p className="card-text">{product.desc}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Year- {product.year}</li>
                            <li className="list-group-item">Miles- {product.miles}</li>
                            <li className="list-group-item">Price-${product.price}</li>
                        </ul>
                        <div className="card-body">
                            <button href="#" className="card-link b`tn btn-success mb-2" onClick={() => addProduct(product)}>Add to cart!</button>
                            <button href="#" className="card-link btn btn-secondary" disabled>Maybe later?</button>
                        </div>
                    </div>
                }) :
                <h3> We're out finding all the products. . .</h3>
            }

                
            </div>
        </div>

    );
}


export default Shop;
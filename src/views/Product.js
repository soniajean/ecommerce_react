
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";

const Indproduct = () => {
    const { productId } = useParams();
    const [data, setData] = useState();
    const db = useDatabase();
    const { data: user } = useUser();
    const local_url = (`https://ecomproj.onrender.com`);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(local_url);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("API call failed with status:", response.status);
                }
            } catch (error) {
                console.error("Failed to fetch data from API:", error);
            }
        };
        fetchData();
    }, [local_url]);
    const loadProductData = async () => {
        try {
            const response = await axios.get(local_url);
            if (response.status === 200) {
                setData(response.data.data);
            } else {
                console.log("API call failed with status:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch data from API:", error);
        }
    }
    useEffect(() => {loadProductData();}, [local_url]);
    // const [response, fetchData] = useState(() => loadProductData());
    const { cart, setCart } = useContext(DataContext);
    const addProduct = (product) => {
        let copyCart = { ...cart }
        copyCart.size++;
        copyCart.total += product.price;
        copyCart.products[product.id] ?
            copyCart.products[product.id].quantity++
            :
            copyCart.products[product.id] = { data: product, quantity: 1 };
        if (user) {
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div className="cream-bg" >
                    <div className="container shadow-lg p-3 mb-5 bg-cream rounded" >
                        <div className="row g-5 justify-content-evenly">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="row g-0">
                                        <div className="col-6 col-md-5">
                                            <img src={data.image} className="card-img img-fluid rounded-start" />
                                        </div>
                                        <div className="col-6 col-md-7">
                                            <div className="card-body d-flex flex-column">
                                                <div className="h-100">
                                                    <h5 className=""><strong>{data.title}</strong></h5>
                                                    <h6 className="card-text">
                                                        {data.description}
                                                    </h6>
                                                    <h4 className="card-title mb-3"><strong>${Number(data.price).toFixed(2)}</strong></h4>



                                                </div>
                                                <div className="">
                                                    <button type="button" className="btn btn-dark" onClick={() => addProduct(data)}><i className="fa-solid fa-cart-shopping me-1"></i>Purchase</button>
                                                                          
                                                    
                                                </div>

                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Indproduct;
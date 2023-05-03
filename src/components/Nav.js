import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import '../static/Nav.css';
import { DataContext } from "../context/DataProvider";
import { useAuth, useUser, useSigninCheck, useDatabase } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { get, child, ref } from "firebase/database";


const Nav = props => {
    const {cart, setCart} = useContext(DataContext);

    const auth = useAuth();
    

    const {data:user} = useUser(); // this gets our object
    const { signinStatus } = useSigninCheck(); // user signed in?
    const db = useDatabase();
    const signIn = async () => {
    let provider = new GoogleAuthProvider();
    let u = await signInWithPopup(auth, provider);
    console.log(u);
    return u
    }

    const signout = async () => {
        await signOut(auth);
        setCart({size:0, total:0, products: {}})
        
    }

    useEffect(() => {
        if (user){
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setCart(snapshot.val());
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        }
        
    }, [user])


    return (
        <div>
            {console.log(cart.total)}
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container-fluid">
                        <Link className="nav-item nav-link active" to='/'>Home</Link>
                        <Link className="nav-item nav-link active" to='/shop'>Shop</Link>
                        <Link className="nav-item nav-link active" to='/cart'>Cart</Link>
                        {
                            signinStatus === 'loading' ?
                            <button className="btn btn-dark" diabled>Waiting to login</button>:
                            user?
                                <>
                                    <span>{user.displayName}</span>
                                    <button id="logout" className="btn btn-dark" onClick={signout}>Logout</button>
                                </> :
                                 <button className="btn btn-dark" onClick={signIn}>Login</button>


                        }

                        { cart.size === 0 ?
                        <span id="r-span"><Link className="nav-item nav-link active" to='/shop'></Link><i className="fa-solid fa-cart-shopping" id="carticon"></i></span>:
                        <span id="r-span"><Link className="nav-item nav-link active" to='/cart'>{cart.size} - ${cart.total.toFixed(2)} </Link> <i className="fa-solid fa-cart-shopping"></i></span>
                        } 
                        

                </div>
            </nav>

        </div>
    );
}

export default Nav;
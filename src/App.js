
import { Form } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';
import Product from './views/Product';
// import Checkout from './views/Checkout';






function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/shop' element={<Shop />} />
      <Route children path='/cart' element={<Cart />} />
      <Route children path='/Product/:productId' element={<Product />} />
      {/* <Route children path='/checkout' element={<Checkout />} /> */}
      
      
      
      
      </Routes>
      
    </div>
  );
}

export default App;
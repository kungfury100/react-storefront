import './App.css';
import Navbar from './components/Navbar.jsx'
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shops from './pages/Shops';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="App">
      <Navbar />
      <main className="layout-shell app-content">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="contact" element={ <Contact/> } />
          <Route path="shops" element={ <Shops/>} />
          <Route path="cart" element={ <Cart/>} />
          <Route path="product/:index" element={ <Product/>} />

          <Route path="admin" element={ <AdminHome/>} />
          <Route path="admin/add-product" element={ <AddProduct/>} />
          <Route path="admin/edit-product/:index" element={ <EditProduct/>} />
          <Route path="admin/maintain-products" element={ <MaintainProducts/>} />
          <Route path="admin/maintain-categories" element={ <MaintainCategories/>} />
          <Route path="admin/maintain-shops" element={ <MaintainShops/>} />

          <Route path="login" element={ <Login/>} />
          <Route path="signup" element={ <SignUp/>} />

          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </main>
        
    </div>
  )
}

export default App

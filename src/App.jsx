import './App.css';
import Navbar from './components/Navbar.jsx'
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shops from './pages/Shops';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageShops from './pages/admin/ManageShops';
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
          <Route path="product/:id" element={ <ProductDetails/>} />

          <Route path="admin" element={ <AdminHome/>} />
          <Route path="admin/add-product" element={ <AddProduct/>} />
          <Route path="admin/manage-products" element={ <ManageProducts/>} />
          <Route path="admin/manage-categories" element={ <ManageCategories/>} />
          <Route path="admin/manage-shops" element={ <ManageShops/>} />

          <Route path="login" element={ <Login/>} />
          <Route path="signup" element={ <SignUp/>} />

          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </main>
        
    </div>
  )
}

export default App

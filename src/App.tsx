import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import FindUs from './pages/FindUs';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminHome from './pages/admin/AdminHome';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageShops from './pages/admin/ManageShops';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {

  return (
    <div className="App">
      <Navbar />
      <main className="layout-shell app-content">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="find-us" element={ <FindUs/> } />
          <Route path="cart" element={ <Cart/>} />
          <Route path="product/:id" element={ <ProductDetails/>} />
          <Route path="admin" element={ <AdminHome/>} />
          <Route path="admin/manage-products" element={ <ManageProducts/>} />
          <Route path="admin/manage-categories" element={ <ManageCategories/>} />
          <Route path="admin/manage-shops" element={ <ManageShops/>} />
          <Route path="login" element={ <Login/>} />
          <Route path="signup" element={ <SignUp/>} />
          <Route path="profile" element={ <Profile/>} />

          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </main>
        
    </div>
  )
}

export default App

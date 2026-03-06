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
import ManageUsers from './pages/admin/ManageUsers';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import RequireAdminAuth from './components/RequireAdminAuth';

function App() {
  const {isDark} = useContext(DarkModeContext);
  const {loading} = useContext(AuthContext);

  if (loading) {
    return <div></div>
  }

  return (
    <div className={isDark ? "dark-mode" : "light-mode"}>
      <Navbar />
      <main className="layout-shell app-content">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="find-us" element={ <FindUs/> } />
          <Route path="cart" element={ <Cart/>} />
          <Route path="product/:id" element={ <ProductDetails/>} />
          <Route element={<RequireAdminAuth />}>
            <Route path="admin" element={ <AdminHome/>} />
            <Route path="admin/manage-products" element={ <ManageProducts/>} />
            <Route path="admin/manage-categories" element={ <ManageCategories/>} />
            <Route path="admin/manage-shops" element={ <ManageShops/>} />
            <Route path="admin/manage-users" element={ <ManageUsers/>} />
          </Route>
          <Route path="login" element={ <Login/>} />
          <Route path="signup" element={ <SignUp/>} />
          <Route element={<RequireAuth />}>
            <Route path="profile" element={ <Profile/>} />
          </Route>

          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </main>
        
    </div>
  )
}

export default App

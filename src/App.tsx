import { Routes, Route } from 'react-router'
import { CartProvider } from './contexts/CartContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Inquiry from './pages/Inquiry'
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCategories from './pages/admin/AdminCategories'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminSettings from './pages/admin/AdminSettings'
import DentalPrinter from './pages/DentalPrinter'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/dental-printer" element={<DentalPrinter />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Inquiry from './pages/Inquiry'
import Login from './pages/Login'
import CategoryPage from './pages/CategoryPage'
import SupportPage from './pages/SupportPage'
import BlogPage from './pages/BlogPage'
import CmsPage from './pages/CmsPage'
import Cart from './pages/Cart'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<ProductList />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/page/:slug" element={<CmsPage />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

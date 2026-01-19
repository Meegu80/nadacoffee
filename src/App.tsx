import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import StorePage from './pages/Store';
import News from './pages/News';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/franchise" element={<div className="pt-40 px-10 text-center font-bold text-2xl dark:text-white">가맹안내 페이지 (준비 중)</div>} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/news" element={<News />} />
            <Route path="/partner" element={<div className="pt-40 px-10 text-center font-bold text-2xl">파트너 라운지 (준비 중)</div>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;

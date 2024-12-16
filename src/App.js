import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Product from './Pages/Product';
import Category from './Pages/Category';
import Supplier from './Pages/Supplier';
import AuditLog from './Pages/AuditLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Product />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="supplier" element={<Supplier />} />
          <Route path="auditlog" element={<AuditLog />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

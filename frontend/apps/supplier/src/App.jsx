import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Landing Page
import { LandingPage } from './components/LandingPage';

// Auth Pages
import { VendorRegister } from './pages/auth/VendorRegister';
import { SupplierRegister } from './pages/auth/SupplierRegister';
import { VendorLogin } from './pages/auth/VendorLogin';
import { SupplierLogin } from './pages/auth/SupplierLogin';

// Vendor Dashboard
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { VendorCatalog } from './pages/vendor/VendorCatalog';
// import { VendorGroupOrders } from './pages/vendor/VendorGroupOrders';
import {VendorGroupOrders} from './pages/vendor/VendorGroupOrders';
import { VendorIndividualOrders } from './pages/vendor/VendorIndividualOrders';
import { VendorOrderHistory } from './pages/vendor/VendorOrderHistory';
import { VendorProfile } from './pages/vendor/VendorProfile';
import { RecommendationPage } from './pages/vendor/RecommendationPage';




// Supplier Dashboard
import { SupplierDashboard } from './pages/supplier/SupplierDashboard';
import { SupplierProducts } from './pages/supplier/SupplierProducts';
import { SupplierOrders } from './pages/supplier/SupplierOrders';
import { SupplierRoutes } from './pages/supplier/SupplierRoutes';
import { SupplierComplaints } from './pages/supplier/SupplierComplaints';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Routes */}
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/supplier/register" element={<SupplierRegister />} />
            <Route path="/supplier/login" element={<SupplierLogin />} />

            {/* Vendor Dashboard Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/catalog" element={<VendorCatalog />} />
            <Route path="/vendor/group-orders" element={<VendorGroupOrders />} />
            <Route path="/vendor/individual-orders" element={<VendorIndividualOrders />} />
            <Route path="/vendor/order-history" element={<VendorOrderHistory />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/recommendations" element={<RecommendationPage />} />

            {/* Supplier Dashboard Routes */}
            <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
            <Route path="/supplier/products" element={<SupplierProducts />} />
            <Route path="/supplier/orders" element={<SupplierOrders />} />
            <Route path="/supplier/routes" element={<SupplierRoutes />} />
            <Route path="/supplier/complaints" element={<SupplierComplaints />} />

            {/* Redirect unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

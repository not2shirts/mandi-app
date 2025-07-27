import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Truck, Users, TrendingUp, CheckCircle, Star } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Apna Mandi</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Connecting Agricultural Communities
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Gateway to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Fresh Agricultural Markets
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Apna Mandi bridges the gap between food vendors and agricultural suppliers, 
              enabling seamless connections, group buying benefits, and streamlined ordering processes.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-16">
              <Button
                size="lg"
                onClick={() => navigate('/vendor/register')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-105 w-full sm:w-auto group"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                I am a Vendor
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/supplier/register')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 w-full sm:w-auto group"
              >
                <Truck className="w-5 h-5 mr-2" />
                I am a Supplier
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-600">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Verified Suppliers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">₹50L+</div>
                <div className="text-gray-600">Monthly Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Apna Mandi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits that make our platform the preferred choice for vendors and suppliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Buying Power</h3>
              <p className="text-gray-600">Join forces with other vendors to unlock wholesale prices and better deals through collective purchasing.</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Suppliers</h3>
              <p className="text-gray-600">Connect with trusted, verified suppliers who meet our quality standards and delivery commitments.</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Pricing</h3>
              <p className="text-gray-600">Access daily updated prices from multiple suppliers to make informed purchasing decisions.</p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Efficient Delivery</h3>
              <p className="text-gray-600">Streamlined logistics and route optimization ensure timely delivery of your orders.</p>
            </div>

            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Ordering</h3>
              <p className="text-gray-600">Intuitive interface makes ordering simple, with order tracking and history management.</p>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">Comprehensive quality checks and customer support ensure satisfaction with every transaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Apna Mandi Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect, order, and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Vendors */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-8 text-center">For Vendors</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Register Your Business</h4>
                    <p className="text-gray-600">Sign up with your business details and get verified to access the platform.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Browse Products</h4>
                    <p className="text-gray-600">Explore daily-updated catalogs from verified suppliers with competitive pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Place Orders</h4>
                    <p className="text-gray-600">Order individually or join group buying for better rates and bulk discounts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Track & Receive</h4>
                    <p className="text-gray-600">Monitor your orders in real-time and receive fresh products at your location.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Suppliers */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-8 text-center">For Suppliers</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Get Verified</h4>
                    <p className="text-gray-600">Register with your certifications and business credentials for platform access.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">List Products</h4>
                    <p className="text-gray-600">Upload your product catalog with pricing, availability, and delivery areas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Manage Orders</h4>
                    <p className="text-gray-600">Receive and process orders through our streamlined dashboard interface.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Deliver & Grow</h4>
                    <p className="text-gray-600">Use route optimization tools to deliver efficiently and grow your business.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of vendors and suppliers who are already benefiting from our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/vendor/register')}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              Start as Vendor
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/supplier/register')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              Start as Supplier
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Apna Mandi</h3>
              </div>
              <p className="text-gray-400">
                Connecting agricultural communities for a better tomorrow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Register</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Login</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Product Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Group Buying</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Suppliers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Register</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Login</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Manage Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Order Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Apna Mandi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

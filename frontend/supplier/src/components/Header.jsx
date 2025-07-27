import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="w-full bg-white py-4 px-4 sm:px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-brand-dark rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">🍳</span>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-brand-dark">Street Eats Supply</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-brand-dark hover:text-brand-blue transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className="text-brand-dark hover:text-brand-blue transition-colors font-medium"
          >
            How It Works
          </Link>
          <Link
            to="/contact"
            className="text-brand-dark hover:text-brand-blue transition-colors font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/login"
            className="text-brand-dark hover:text-brand-blue transition-colors font-medium hidden sm:block"
          >
            Log In
          </Link>
          <Button
            asChild
            className="bg-brand-blue hover:bg-blue-600 text-white px-4 py-2 sm:px-6 rounded-full font-medium text-sm sm:text-base"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

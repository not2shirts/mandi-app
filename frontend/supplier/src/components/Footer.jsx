import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-6 sm:mb-8">
          <Link
            to="/terms"
            className="text-brand-gray hover:text-brand-blue transition-colors text-sm sm:text-base"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-brand-gray hover:text-brand-blue transition-colors text-sm sm:text-base"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="text-brand-gray hover:text-brand-blue transition-colors text-sm sm:text-base"
          >
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-brand-gray text-sm sm:text-base">
          ©2024 Street Eats Supply. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

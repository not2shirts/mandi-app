import { Button } from "./ui/button";
import vendor from "../assets/vendor.webp";

export function Hero() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Card Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Background Image */}
          <img
            src={vendor}
            alt="Street food stall"
            className="w-full h-[500px] sm:h-[600px] object-cover"
          />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 sm:px-12 max-w-4xl">
              <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Your One-Stop Shop for Street Food Supplies
              </h1>

              <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
                Connect with top suppliers, enjoy group buying discounts, and streamline your ordering process.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg w-full sm:w-auto"
                >
                  I am a Vendor
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg w-full sm:w-auto"
                >
                  I am a Supplier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

const PricingPlans = () => {
  return (
    <section id="pricing" className="bg-[#1B1A1D] py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-gray-200 mt-7 mb-12 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing <br className="hidden sm:inline" />
          elit. Feugiat nulla suspendisse tortor aene.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Card */}
          {["MONTHLY", "YEARLY"].map((planType, i) => (
            <div
              key={planType}
              className="bg-[#27282F] w-full max-w-md mx-auto rounded-2xl p-8 flex flex-col items-start justify-between text-left"
            >
              <span className="bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-full mb-4">
                {planType}
              </span>
              <h3 className="text-3xl font-bold mb-2">$ 100 USD</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Lorem ipsum dolor sit amet, ametor sit amet consectetur adipiscing elit. Et nibh.
              </p>

              <h4 className="font-bold mb-3">FEATURES</h4>
              <ul className="text-sm space-y-2 mb-8">
                {Array(4).fill(0).map((_, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span> Lorem ipsum dolor sit amet
                  </li>
                ))}
              </ul>

              <button className="bg-[#2563eb] w-full py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                CONTACT US
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;

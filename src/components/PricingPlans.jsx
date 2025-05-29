import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../../services/authService";

const PricingPlans = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const config = { headers: getAuthHeaders() };

        const [monthlyRes, yearlyRes] = await Promise.all([
          axios.get(
            "https://tentts.com/gateway/api/v1/admin/website/getSubscriptionSection?subscriptionType=MONTHLY",
            config
          ),  
          axios.get(
            "https://tentts.com/gateway/api/v1/admin/website/getSubscriptionSection?subscriptionType=YEARLY",
            config
          ),
        ]);

        setMonthlyData(monthlyRes.data.responseBody);
        setYearlyData(yearlyRes.data.responseBody);
      } catch (error) {
        console.error("Failed to fetch pricing plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading pricing plans...</div>;
  }

  if (!monthlyData || !yearlyData) {
    return <div className="text-red-500 text-center py-10">Failed to load pricing data.</div>;
  }

  const renderPlanCard = (plan) => (
    <div className="bg-[#27282F] w-full max-w-md mx-auto rounded-2xl p-8 flex flex-col items-start justify-between text-left">
      <span className="bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-full mb-4">
        {plan.title}
      </span>
      <h3 className="text-3xl font-bold mb-2">${plan.price} USD</h3>
      <p className="text-gray-300 mb-6 text-sm">{plan.descriptions}</p>

      <h4 className="font-bold mb-3">FEATURES</h4>
      <ul className="text-sm space-y-2 mb-8">
        {(plan.features?.split(",") || []).map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-blue-500 mr-2 mt-1">•</span> {feature.trim()}
          </li>
        ))}
      </ul>

      <button className="bg-[#2563eb] w-full py-3 rounded-full font-semibold hover:bg-blue-600 transition">
        {plan.buttonText}
      </button>
    </div>
  );

  return (
    <section id="pricing" className="bg-[#1B1A1D] py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">{monthlyData.priceSectionHeading}</h2>
        <p className="text-gray-200 mt-7 mb-12 text-base">
          {monthlyData.priceSectionDescriptions}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderPlanCard(monthlyData)}
          {renderPlanCard(yearlyData)}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;

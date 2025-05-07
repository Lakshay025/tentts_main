import React from "react";
import AppRoutes from "../routes/AppRoutes";
import RouteLoader from "../src/components/RouteLoader"; // adjust if needed

function App() {
  return (
    <div className="scroll-smooth">
      <RouteLoader />
      <AppRoutes />
    </div>
  );
}

export default App;

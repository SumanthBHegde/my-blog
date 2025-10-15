import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-earth-50 to-forest-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-400/10 to-earth-400/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(45,93,61,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;


import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // ✅ Get current user data from Redux
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const excelData = [
    ["Product", "Q1", "Q2", "Q3", "Q4"],
    ["Sales", "2500", "3200", "2800", "4100"],
    ["Marketing", "1800", "2100", "2400", "2900"],
    ["Support", "1200", "1500", "1800", "2200"],
  ];

  const chartData = [
    { name: "Sales", q1: 2500, q2: 3200, q3: 2800, q4: 4100, color: "bg-blue-500" },
    { name: "Marketing", q1: 1800, q2: 2100, q3: 2400, q4: 2900, color: "bg-green-500" },
    { name: "Support", q1: 1200, q2: 1500, q3: 1800, q4: 2200, color: "bg-purple-500" },
  ];

  const pieData = [
    { name: "Sales", value: 45, color: "from-blue-400 to-blue-600" },
    { name: "Marketing", value: 30, color: "from-green-400 to-green-600" },
    { name: "Support", value: 25, color: "from-purple-400 to-purple-600" },
  ];

  // ✅ Button click handler
  const handleGetStarted = () => {
    if (!userData) {
      navigate("/signin"); // not signed in → signin
    } else if (userData.role === "admin") {
      navigate("/admin-dashboard"); // admin role
    } else {
      navigate("/user-dashboard"); // default: user role
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* floating dots */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 2 + "s",
              animationDuration: 2 + Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Excel to Charts
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Transform your spreadsheet data into beautiful, interactive visualizations in seconds
            </p>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-green-400" />
                Upload Excel
              </span>
              <ArrowRight className="w-6 h-6 text-blue-400 animate-bounce" />
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                Get Charts
              </span>
            </div>
          </div>

          
         {/* Excel → Arrow → Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-20">
           {/* Excel Data */}
           <div
              className={`transform transition-all duration-700 delay-200 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Excel Data</h3>
                </div>
                <div className="bg-white rounded-xl p-4 overflow-hidden">
                  <div className="grid grid-cols-5 gap-1 text-xs text-gray-800">
                    {excelData.map((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`p-2 text-center border border-gray-200 ${
                            rowIndex === 0 ? "bg-gray-100 font-bold" : "bg-white"
                          }`}
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight
                className={`w-12 h-12 text-blue-400 transition-all duration-700 delay-300 ${
                  step >= 1 ? "animate-pulse scale-110" : ""
                }`}
              />
            </div>

            {/* Charts */}
            <div
              className={`transform transition-all duration-700 delay-400 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Beautiful Charts</h3>
                </div>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-3">
                      <span className="w-16 text-sm text-gray-300">{item.name}</span>
                      <div className="flex-1 bg-gray-700/50 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-700 rounded-full flex items-center justify-end pr-3`}
                          style={{
                            width: step >= 2 ? `${(item.q4 / 5000) * 100}%` : "0%",
                            transitionDelay: `${index * 100}ms`,
                          }}
                        >
                          <span className="text-white text-xs font-semibold">
                            {step >= 2 ? item.q4 : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bar + Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Bar Chart */}
            <div
              className={`transform transition-all duration-700 delay-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30">
                <h4 className="text-3xl font-bold mb-8 text-center">Interactive Bar Charts</h4>
                <div className="space-y-6">
                  {chartData.map((item, index) => (
                    <div key={item.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium">{item.name}</span>
                        <span className="text-sm text-gray-300">Q4: {item.q4.toLocaleString()}</span>
                      </div>
                      <div className="relative bg-gray-700/50 rounded-full h-8 overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-700 rounded-full`}
                          style={{
                            width: step >= 3 ? `${(item.q4 / 5000) * 100}%` : "0%",
                            transitionDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div
              className={`transform transition-all duration-700 delay-600 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30">
                <h4 className="text-3xl font-bold mb-8 text-center">Dynamic Pie Charts</h4>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {pieData.map((item, index) => {
                        const angle = (item.value / 100) * 360;
                        const startAngle = pieData
                          .slice(0, index)
                          .reduce((acc, curr) => acc + (curr.value / 100) * 360, 0);
                        const endAngle = startAngle + angle;
                        const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 35 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 50 + 35 * Math.sin((endAngle * Math.PI) / 180);
                        const largeArc = angle > 180 ? 1 : 0;
                        return (
                          <path
                            key={item.name}
                            d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={
                              index === 0 ? "#3b82f6" : index === 1 ? "#22c55e" : "#9333ea"
                            }
                            style={{
                              opacity: step >= 3 ? 1 : 0,
                              transform: step >= 3 ? "scale(1)" : "scale(0.5)",
                              transition: `all 0.4s ease-out ${index * 0.1}s`,
                            }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="grid grid-cols-1 gap-3 w-full">
                    {pieData.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/10"
                        style={{
                          opacity: step >= 3 ? 1 : 0,
                          transform: step >= 3 ? "translateX(0)" : "translateX(-10px)",
                          transitionDelay: `${index * 100}ms`,
                          transitionDuration: "500ms",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-xl font-bold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

    {/* CTA */}
          <div
            className={`text-center transform transition-all duration-700 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-md rounded-3xl p-12 border border-blue-500/50">
              <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Data?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Upload your Excel file and see your data come to life with stunning visualizations
              </p>
              <button
                onClick={handleGetStarted}
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

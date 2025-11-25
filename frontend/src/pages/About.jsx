// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import mongoLogo from "../assets/mongodb.jpg";
// import expressLogo from "../assets/express.png";
// import reactLogo from "../assets/react.png";
// import nodeLogo from "../assets/nodejs.png";
// import {
//   BarChart3,
//   Upload,
//   Zap,
//   Shield,
//   Sparkles,
//   Heart,
//   Target,
//   FileSpreadsheet,
//   Database,
//   Server,
//   Code,
//   Cpu,
// } from "lucide-react";

// const cardData = [
//   {
//     title: "Lightning Fast Processing",
//     description:
//       "Upload your Excel files and watch them transform into beautiful charts in under 2 seconds. Our optimized processing engine handles large datasets with ease, making data visualization instant and effortless.",
//     img: "https://cdn.pixabay.com/photo/2018/08/18/13/27/browser-3614768_1280.png",
//     icon: Zap,
//     color: "from-yellow-500 to-orange-500",
//     particles: [
//       { id: 1, delay: 0, duration: 3 },
//       { id: 2, delay: 1, duration: 4 },
//       { id: 3, delay: 2, duration: 3.5 },
//     ],
//   },
//   {
//     title: "Beginner Friendly",
//     description:
//       "No technical expertise required! Simply drag and drop your Excel files, and our intuitive interface guides you through creating stunning visualizations. Anyone can create professional charts in minutes.",
//     img: "https://cdn.pixabay.com/photo/2024/09/04/06/55/ai-generated-9020934_1280.png",
//     icon: Heart,
//     color: "from-green-500 to-teal-500",
//     particles: [
//       { id: 1, delay: 0.5, duration: 3.2 },
//       { id: 2, delay: 1.5, duration: 3.8 },
//       { id: 3, delay: 0.8, duration: 3.5 },
//     ],
//   },
//   {
//     title: "Professional Quality Charts",
//     description:
//       "Generate publication-ready bar charts, line graphs, and pie charts with customizable themes, colors, and styling options. Perfect for presentations, reports, and business analytics.",
//     img: "https://cdn.pixabay.com/photo/2013/07/12/19/15/pie-chart-154411_1280.png",
//     icon: BarChart3,
//     color: "from-purple-500 to-pink-500",
//     particles: [
//       { id: 1, delay: 0.3, duration: 3.7 },
//       { id: 2, delay: 1.2, duration: 3.1 },
//       { id: 3, delay: 2.1, duration: 3.9 },
//     ],
//   },
//   {
//     title: "Secure & Private",
//     description:
//       "Your Excel data is processed securely and never stored permanently on our servers. We prioritize your privacy with end-to-end encryption and secure file handling protocols.",
//     img: "https://cdn.pixabay.com/photo/2016/11/03/11/57/accountant-1794122_1280.png",
//     icon: Shield,
//     color: "from-blue-500 to-cyan-500",
//     particles: [
//       { id: 1, delay: 0.7, duration: 3.3 },
//       { id: 2, delay: 1.8, duration: 3.6 },
//       { id: 3, delay: 0.2, duration: 3.4 },
//     ],
//   },
// ];

// const teamData = [
//   {
//     name: "Sailaja",
//     // role: "Full Stack Developer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
//     // skill: "MERN Stack Expert",
//     // color: "from-blue-400 to-purple-500",
//   },
//   {
//     name: "Yashvi",
//     // role: "Frontend Developer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
//     // skill: "React & Chart.js Specialist",
//     // color: "from-pink-400 to-red-500",
//   },
//   {
//     name: "Abhijeet",
//     // role: "Backend Developer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140039.png",
//     // skill: "Node.js & MongoDB Expert",
//     // color: "from-green-400 to-teal-500",
//   },
//   {
//     name: "SreeRaghavi",
//     // role: "Data Engineer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
//     // skill: "Excel Processing & Analytics",
//     // color: "from-yellow-400 to-orange-500",
//   },
//   {
//     name: "Astha",
//     // role: "DevOps Engineer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140054.png",
//     // skill: "Cloud & Performance",
//     // color: "from-cyan-400 to-blue-500",
//   },
//   {
//     name: "Kamelsh",
//     // role: "UX Designer",
//     img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
//     // skill: "Data Visualization UX",
//     // color: "from-purple-400 to-pink-500",
//   },
// ];

// const FloatingParticles = ({ particles, color }) => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${color} opacity-60`}
//           initial={{
//             x: Math.random() * 100 + "%",
//             y: Math.random() * 100 + "%",
//             scale: 0,
//           }}
//           animate={{
//             x: Math.random() * 100 + "%",
//             y: Math.random() * 100 + "%",
//             scale: [0, 1, 0],
//           }}
//           transition={{
//             duration: particle.duration,
//             delay: particle.delay,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const About = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white relative">
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
//         <motion.div
//           className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
//           animate={{
//             x: mousePosition.x * 0.02,
//             y: mousePosition.y * 0.02,
//           }}
//           transition={{ type: "spring", stiffness: 50, damping: 20 }}
//           style={{ left: "10%", top: "20%" }}
//         />
//         <motion.div
//           className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 blur-3xl"
//           animate={{
//             x: mousePosition.x * -0.015,
//             y: mousePosition.y * -0.015,
//           }}
//           transition={{ type: "spring", stiffness: 50, damping: 20 }}
//           style={{ right: "10%", bottom: "20%" }}
//         />
//       </div>

//       <div className="relative z-10 py-20 px-6 md:px-20">
//         {/* Header Section */}
//         <motion.div
//           className="text-center mb-20"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.div
//             className="inline-flex items-center gap-3 mb-6"
//             whileHover={{ scale: 1.05 }}
//           >
//             {/* <Sparkles className="text-blue-400 w-8 h-8" /> */}
//             <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
//               Why Choose Excellytics?
//             </h2>
//             {/* <Sparkles className="text-blue-400 w-8 h-8" /> */}
//           </motion.div>
//           <motion.p
//             className="text-xl text-gray-300 max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             Transform your Excel data into stunning charts with our powerful
//             visualization platform
//           </motion.p>
//         </motion.div>

//         {/* Enhanced Cards Section */}
//         <div className="space-y-24">
//           {cardData.map((card, idx) => {
//             const isLeft = idx % 2 === 0;
//             const IconComponent = card.icon;

//             return (
//               <motion.div
//                 key={idx}
//                 className={`flex flex-col md:flex-row items-center gap-12 ${
//                   isLeft ? "md:flex-row" : "md:flex-row-reverse"
//                 }`}
//                 initial={{ opacity: 0, y: 100 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: idx * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 {/* Image Section with Enhanced Effects */}
//                 <motion.div
//                   className="relative group"
//                   onHoverStart={() => setHoveredCard(idx)}
//                   onHoverEnd={() => setHoveredCard(null)}
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 >
//                   {/* Floating Particles */}
//                   <FloatingParticles
//                     particles={card.particles}
//                     color={card.color}
//                   />

//                   {/* Glowing Ring */}
//                   <motion.div
//                     className={`absolute inset-0 rounded-full bg-gradient-to-r ${card.color} p-1 opacity-0 group-hover:opacity-100`}
//                     animate={hoveredCard === idx ? { rotate: 360 } : {}}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                   >
//                     <div className="w-full h-full rounded-full bg-[#1A1A2E]"></div>
//                   </motion.div>

//                   {/* Main Image */}
//                   <motion.div
//                     className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] p-4 shadow-2xl border border-blue-400/30"
//                     whileHover={{
//                       boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)",
//                       borderColor: "rgba(59, 130, 246, 0.8)",
//                     }}
//                   >
//                     <img
//                       src={card.img}
//                       alt={card.title}
//                       className="w-full h-full object-contain filter brightness-110"
//                     />

//                     {/* Floating Icon */}
//                     <motion.div
//                       className={`absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
//                       animate={hoveredCard === idx ? { y: [-5, 5, -5] } : {}}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     >
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </motion.div>
//                   </motion.div>

//                   {/* Pulse Effect */}
//                   <motion.div
//                     className={`absolute inset-0 rounded-full bg-gradient-to-r ${card.color} opacity-20`}
//                     animate={hoveredCard === idx ? { scale: [1, 1.2, 1] } : {}}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>

//                 {/* Content Section with Enhanced Styling */}
//                 <motion.div
//                   className="relative group max-w-xl"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 >
//                   {/* Background Gradient */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
//                   ></div>

//                   {/* Main Content */}
//                   <div className="relative bg-[#0F3460]/80 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-blue-400/20 group-hover:border-blue-400/50 transition-all duration-300">
//                     {/* Title with Icon */}
//                     <div className="flex items-center gap-3 mb-4">
//                       <div
//                         className={`w-8 h-8 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}
//                       >
//                         <IconComponent className="w-4 h-4 text-white" />
//                       </div>
//                       <h3 className="text-3xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
//                         {card.title}
//                       </h3>
//                     </div>

//                     {/* Description */}
//                     <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
//                       {card.description}
//                     </p>

//                     {/* Decorative Elements */}
//                     <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
//                       <Target className="w-6 h-6 text-blue-400" />
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Enhanced Team Section */}
//         <motion.div
//           className="mt-32"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center mb-16">
//             <motion.div
//               className="inline-flex items-center gap-3 mb-4"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FileSpreadsheet className="text-blue-400 w-8 h-8" />
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Meet the Excellytics Team
//               </h2>
//               <BarChart3 className="text-blue-400 w-8 h-8" />
//             </motion.div>
//             <p className="text-gray-300 text-lg">
//               The passionate minds behind your data visualization experience
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {teamData.map((member, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: idx * 0.15 }}
//                 whileHover={{
//                   scale: 1.05,
//                   rotateY: 5,
//                 }}
//                 className="relative group"
//                 viewport={{ once: true }}
//               >
//                 {/* Card Background */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
//                 ></div>

//                 {/* Main Card */}
//                 <div className="relative bg-[#1A1A2E]/90 backdrop-blur-xl rounded-xl p-6 text-center shadow-2xl border border-blue-400/20 group-hover:border-blue-400/50 transition-all duration-300">
//                   {/* Profile Image */}
//                   <motion.div
//                     className="relative mx-auto w-24 h-24 mb-4"
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.8 }}
//                   >
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                     >
//                       <div className="w-full h-full rounded-full bg-[#1A1A2E]"></div>
//                     </div>
//                     <img
//                       src={member.img}
//                       alt={member.name}
//                       className="relative z-10 w-full h-full rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
//                     />
//                     {/* Floating Chart Icon */}
//                     <motion.div
//                       className={`absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100`}
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     >
//                       <BarChart3 className="w-4 h-4 text-white" />
//                     </motion.div>
//                   </motion.div>

//                   {/* Member Info */}
//                   <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">
//                     {member.name}
//                   </h3>
//                   <p className="text-sm text-gray-400 mb-2">{member.role}</p>
//                   <p
//                     className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
//                   >
//                     {member.skill}
//                   </p>

//                   {/* Decorative Corner */}
//                   <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
//                     <div
//                       className={`w-3 h-3 rounded-full bg-gradient-to-r ${member.color}`}
//                     ></div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Enhanced MERN Stack Section */}
//         <motion.div
//           className="mt-32 text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
//             whileHover={{ scale: 1.05 }}
//           >
//             Powered by MERN Stack
//           </motion.h2>
//           <p className="text-gray-300 text-lg mb-12">
//             Built with modern, scalable technologies for optimal performance
//           </p>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
//             {/* MongoDB */}
//             <motion.div
//               whileHover={{
//                 scale: 1.2,
//                 rotateY: 180,
//                 filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))",
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 15 }}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="relative">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 />
//                 <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
//                   <img src={mongoLogo} alt="MongoDB" className="w-12 h-12" />
//                   {/* <Database className="w-10 h-10 text-white" /> */}
//                   <img src="" alt="" />
//                 </div>
//               </div>
//               <p className="mt-3 font-medium text-white group-hover:text-green-400 transition-colors duration-300">
//                 MongoDB
//               </p>
//             </motion.div>

//             {/* Express.js */}
//             <motion.div
//               whileHover={{
//                 scale: 1.2,
//                 rotateY: -180,
//                 filter: "drop-shadow(0 0 20px rgba(107, 114, 128, 0.8))",
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 15 }}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="relative">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 />
//                 <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
//                   <img
//                     src={expressLogo}
//                     alt="Express.js"
//                     className="w-12 h-12"
//                   />
//                   {/* <Server className="w-10 h-10 text-white" /> */}
//                 </div>
//               </div>
//               <p className="mt-3 font-medium text-white group-hover:text-gray-400 transition-colors duration-300">
//                 Express.js
//               </p>
//             </motion.div>

//             {/* React */}
//             <motion.div
//               whileHover={{
//                 scale: 1.2,
//                 rotateY: 180,
//                 filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 15 }}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="relative">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 />
//                 <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
//                   <img src={reactLogo} alt="React" className="w-12 h-12" />
//                   {/* <Code className="w-10 h-10 text-white" /> */}
//                 </div>
//               </div>
//               <p className="mt-3 font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
//                 React
//               </p>
//             </motion.div>

//             {/* Node.js */}
//             <motion.div
//               whileHover={{
//                 scale: 1.2,
//                 rotateY: -180,
//                 filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.8))",
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 15 }}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="relative">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 />
//                 <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
//                   <img src={nodeLogo} alt="Node.js" className="w-12 h-12" />
//                   {/* <Cpu className="w-10 h-10 text-white" /> */}
//                 </div>
//               </div>
//               <p className="mt-3 font-medium text-white group-hover:text-green-400 transition-colors duration-300">
//                 Node.js
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default About;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mongoLogo from "../assets/mongodb.jpg";
import expressLogo from "../assets/express.png";
import reactLogo from "../assets/react.png";
import nodeLogo from "../assets/nodejs.png";
import {
  BarChart3,
  Upload,
  Zap,
  Shield,
  Sparkles,
  Heart,
  Target,
  FileSpreadsheet,
  Database,
  Server,
  Code,
  Cpu,
} from "lucide-react";

const cardData = [
  {
    title: "Lightning Fast Processing",
    description:
      "Upload your Excel files and watch them transform into beautiful charts in under 2 seconds. Our optimized processing engine handles large datasets with ease, making data visualization instant and effortless.",
    img: "https://cdn.pixabay.com/photo/2018/08/18/13/27/browser-3614768_1280.png",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    particles: [
      { id: 1, delay: 0, duration: 3 },
      { id: 2, delay: 1, duration: 4 },
      { id: 3, delay: 2, duration: 3.5 },
    ],
  },
  {
    title: "Beginner Friendly",
    description:
      "No technical expertise required! Simply drag and drop your Excel files, and our intuitive interface guides you through creating stunning visualizations. Anyone can create professional charts in minutes.",
    img: "https://cdn.pixabay.com/photo/2024/09/04/06/55/ai-generated-9020934_1280.png",
    icon: Heart,
    color: "from-green-500 to-teal-500",
    particles: [
      { id: 1, delay: 0.5, duration: 3.2 },
      { id: 2, delay: 1.5, duration: 3.8 },
      { id: 3, delay: 0.8, duration: 3.5 },
    ],
  },
  {
    title: "Professional Quality Charts",
    description:
      "Generate publication-ready bar charts, line graphs, and pie charts with customizable themes, colors, and styling options. Perfect for presentations, reports, and business analytics.",
    img: "https://cdn.pixabay.com/photo/2013/07/12/19/15/pie-chart-154411_1280.png",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    particles: [
      { id: 1, delay: 0.3, duration: 3.7 },
      { id: 2, delay: 1.2, duration: 3.1 },
      { id: 3, delay: 2.1, duration: 3.9 },
    ],
  },
  {
    title: "Secure & Private",
    description:
      "Your Excel data is processed securely and never stored permanently on our servers. We prioritize your privacy with end-to-end encryption and secure file handling protocols.",
    img: "https://cdn.pixabay.com/photo/2016/11/03/11/57/accountant-1794122_1280.png",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    particles: [
      { id: 1, delay: 0.7, duration: 3.3 },
      { id: 2, delay: 1.8, duration: 3.6 },
      { id: 3, delay: 0.2, duration: 3.4 },
    ],
  },
];

const FloatingParticles = ({ particles, color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${color} opacity-60`}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ left: "10%", top: "20%" }}
        />

        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>

      <div className="relative z-10 py-20 px-6 md:px-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose Excellytics?
            </h2>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Transform your Excel data into stunning charts with our powerful
            visualization platform
          </motion.p>
        </motion.div>

        {/* Cards Section */}
        <div className="space-y-24">
          {cardData.map((card, idx) => {
            const isLeft = idx % 2 === 0;
            const IconComponent = card.icon;

            return (
              <motion.div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <motion.div
                  className="relative group"
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FloatingParticles
                    particles={card.particles}
                    color={card.color}
                  />

                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${card.color} p-1 opacity-0 group-hover:opacity-100`}
                    animate={hoveredCard === idx ? { rotate: 360 } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#1A1A2E]"></div>
                  </motion.div>

                  <motion.div
                    className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] p-4 shadow-2xl border border-blue-400/30"
                    whileHover={{
                      boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)",
                      borderColor: "rgba(59, 130, 246, 0.8)",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-contain filter brightness-110"
                    />

                    <motion.div
                      className={`absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
                      animate={hoveredCard === idx ? { y: [-5, 5, -5] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${card.color} opacity-20`}
                    animate={hoveredCard === idx ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  className="relative group max-w-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                  ></div>

                  <div className="relative bg-[#0F3460]/80 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-blue-400/20 group-hover:border-blue-400/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-3xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {card.description}
                    </p>

                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* MERN Section */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Powered by MERN Stack
          </motion.h2>

          <p className="text-gray-300 text-lg mb-12">
            Built with modern, scalable technologies for optimal performance
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {/* MongoDB */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotateY: 180,
                filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img src={mongoLogo} alt="MongoDB" className="w-12 h-12" />
                </div>
              </div>
              <p className="mt-3 font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                MongoDB
              </p>
            </motion.div>

            {/* Express.js */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotateY: -180,
                filter: "drop-shadow(0 0 20px rgba(107, 114, 128, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img src={expressLogo} alt="Express.js" className="w-12 h-12" />
                </div>
              </div>
              <p className="mt-3 font-medium text-white group-hover:text-gray-400 transition-colors duration-300">
                Express.js
              </p>
            </motion.div>

            {/* React */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotateY: 180,
                filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img src={reactLogo} alt="React" className="w-12 h-12" />
                </div>
              </div>
              <p className="mt-3 font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                React
              </p>
            </motion.div>

            {/* Node.js */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotateY: -180,
                filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img src={nodeLogo} alt="Node.js" className="w-12 h-12" />
                </div>
              </div>
              <p className="mt-3 font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                Node.js
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

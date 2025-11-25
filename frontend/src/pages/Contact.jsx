// import React, { useState, useEffect } from "react";
// import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";
// import { toast } from "react-toastify";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const saveToLocalQueue = (data) => {
//     const queue = JSON.parse(localStorage.getItem("queuedMessages") || "[]");
//     queue.push(data);
//     localStorage.setItem("queuedMessages", JSON.stringify(queue));
//   };

//   const trySendQueuedMessages = async () => {
//     const queue = JSON.parse(localStorage.getItem("queuedMessages") || "[]");
//     if (queue.length === 0) return;

//     const next = queue[0];
//     try {
//       const response = await fetch("http://localhost:3000/contacts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(next),
//       });

//       if (response.ok) {
//         queue.shift();
//         localStorage.setItem("queuedMessages", JSON.stringify(queue));
//         console.log("Queued message sent!");
//       }
//     } catch (err) {}
//   };

//   useEffect(() => {
//     const interval = setInterval(trySendQueuedMessages, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`http://localhost:3000/contacts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Server error");

//       toast.success("Message sent successfully!");
//     } catch (error) {
//       saveToLocalQueue(formData);
//       toast.success("Message sent successfully!");
//     } finally {
//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 3000);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl hover:scale-105 transition-all duration-300">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//               <Mail className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
//             <p className="text-blue-200">We'd love to hear from you</p>
//           </div>

//           {submitted ? (
//             <div className="text-center py-12 animate-fade-in">
//               <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
//                 <Send className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-2">
//                 Message Sent!
//               </h3>
//               <p className="text-emerald-100">
//                 Thanks for reaching out. We'll get back to you soon.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 {["name", "email", "phone", "subject"].map((field, idx) => {
//                   const icons = [<User />, <Mail />, <Phone />, <MessageSquare />];
//                   const placeholders = [
//                     "Your Name",
//                     "Your Email",
//                     "Phone Number",
//                     "Subject",
//                   ];
//                   const types = ["text", "email", "tel", "text"];
//                   return (
//                     <div key={field} className="relative group">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300">
//                         {icons[idx]}
//                       </span>
//                       <input
//                         type={types[idx]}
//                         name={field}
//                         value={formData[field]}
//                         onChange={handleChange}
//                         placeholder={placeholders[idx]}
//                         required={field !== "phone"}
//                         className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-white/20 focus:scale-105"
//                       />
//                     </div>
//                   );
//                 })}

//                 <div className="relative group">
//                   <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-blue-300" />
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Your message..."
//                     rows="4"
//                     required
//                     className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-white/20 resize-none focus:scale-105"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     <span>Sending...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     <span>Send Message</span>
//                   </>
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



import React, { useState, useEffect } from "react";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { serverUrl } from "../App"; // Import your backend URL

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save message to local storage queue (offline support)
  const saveToLocalQueue = (data) => {
    const queue = JSON.parse(localStorage.getItem("queuedMessages") || "[]");
    queue.push(data);
    localStorage.setItem("queuedMessages", JSON.stringify(queue));
  };

  // Try sending queued messages every 5 seconds
  const trySendQueuedMessages = async () => {
    const queue = JSON.parse(localStorage.getItem("queuedMessages") || "[]");
    if (!queue.length) return;

    const next = queue[0];
    try {
      const response = await fetch(`${serverUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });

      if (response.ok) {
        queue.shift();
        localStorage.setItem("queuedMessages", JSON.stringify(queue));
        console.log("Queued message sent!");
      }
    } catch (err) {
      console.log("Failed to send queued message:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(trySendQueuedMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${serverUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      toast.success("Message sent successfully!");
    } catch (error) {
      // Save to queue if network error
      saveToLocalQueue(formData);
      toast.info(
        "You are offline. Message saved and will be sent automatically later."
      );
    } finally {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
            <p className="text-blue-200">We'd love to hear from you</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-emerald-100">
                Thanks for reaching out. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {["name", "email", "phone", "subject"].map((field, idx) => {
                  const icons = [<User />, <Mail />, <Phone />, <MessageSquare />];
                  const placeholders = [
                    "Your Name",
                    "Your Email",
                    "Phone Number",
                    "Subject",
                  ];
                  const types = ["text", "email", "tel", "text"];
                  return (
                    <div key={field} className="relative group">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300">
                        {icons[idx]}
                      </span>
                      <input
                        type={types[idx]}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={placeholders[idx]}
                        required={field !== "phone"}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-white/20 focus:scale-105"
                      />
                    </div>
                  );
                })}

                <div className="relative group">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-blue-300" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="4"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-white/20 resize-none focus:scale-105"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

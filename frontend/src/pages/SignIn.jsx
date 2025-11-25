
import axios from "axios";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignIn = () => {
  const primaryColor = "#2563eb";
  const bgColor = "#eff6ff";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { email: result.user.email },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Google Sign In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className="text-3xl font-bold mb-2 text-center"
          style={{ color: primaryColor }}
        >
          Excellytics
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Sign in to continue managing insights and analytics
        </p>

        <form onSubmit={handleSignIn}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div
            className="text-right mb-4 cursor-pointer font-medium"
            style={{ color: primaryColor }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign In"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">*{error}</p>}

        {/* Google Sign In */}
        <button
          className="w-full mt-4 flex justify-center items-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle size={20} />
          <span>Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-6">
          Don’t have an account?{" "}
          <span
            className="cursor-pointer font-semibold"
            style={{ color: primaryColor }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

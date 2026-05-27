import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [showOtpBox, setShowOtpBox] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [backendError, setBackendError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendOtp = async (e) => {

  e.preventDefault();

  setBackendError("");
  setSuccessMessage("");

  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {

    setErrors(newErrors);

    return;

  }

  try {

    setIsLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/send-otp",
      {

        name: formData.fullName,

        email: formData.email,

        password: formData.password,

        role: "user",

      }
    );

    setSuccessMessage(res.data.message);

    setShowOtpBox(true);

  } catch (error) {

    setBackendError(
      error.response?.data?.message
    );

  } finally {

    setIsLoading(false);

  }

};
  const handleVerifyOtp = async () => {

  try {

    setIsLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/verify-otp",
      {

        email: formData.email,

        otp,

      }
    );

    setSuccessMessage(res.data.message);

    setTimeout(() => {

      navigate("/login");

    }, 2000);

  } catch (error) {

    setBackendError(
      error.response?.data?.message
    );

  } finally {

    setIsLoading(false);

  }

};

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted:", formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-700 flex items-center justify-center p-5 relative overflow-hidden">
      <title>Signup </title>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-10">🍛</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-float-delay-1 opacity-10">✨</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-float-delay-2 opacity-10">⭐</div>
        <div className="absolute bottom-1/3 left-1/4 text-3xl animate-float-delay-3 opacity-10">🌿</div>
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Animated floating card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600"></div>
          
          <div className="p-8 md:p-10">
            
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/30 transition-all duration-500 scale-0 group-hover:scale-100"></div>
                <img
                  src={logo}
                  alt="BiryaniQ Logo"
                  className="w-24 h-24 rounded-full object-cover shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <div className="flex justify-center gap-1 mt-2">
                <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
                <span className="w-4 h-1 bg-blue-500 rounded-full"></span>
                <span className="w-2 h-1 bg-yellow-500 rounded-full"></span>
              </div>
              <p className="text-gray-500 text-sm mt-3">Join us and enjoy the best biryani! 🍛</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendOtp} className="space-y-4">

                {backendError && (

                <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-xl text-sm font-bold">

                  {backendError}

                </div>

              )}

              {successMessage && (

                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-sm font-bold">

                  {successMessage}

                </div>

              )}

              
              {/* Full Name Field */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className={`relative transition-all duration-300 ${errors.fullName ? "mb-1" : ""}`}>
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      errors.fullName 
                        ? "border-red-400 bg-red-50 focus:border-red-500" 
                        : "border-gray-200 focus:border-pink-500"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1 ml-2 animate-shake">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className={`relative transition-all duration-300 ${errors.email ? "mb-1" : ""}`}>
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      errors.email 
                        ? "border-red-400 bg-red-50 focus:border-red-500" 
                        : "border-gray-200 focus:border-pink-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-2 animate-shake">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className={`relative transition-all duration-300 ${errors.password ? "mb-1" : ""}`}>
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      errors.password 
                        ? "border-red-400 bg-red-50 focus:border-red-500" 
                        : "border-gray-200 focus:border-pink-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-2 animate-shake">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className={`relative transition-all duration-300 ${errors.confirmPassword ? "mb-1" : ""}`}>
                  <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      errors.confirmPassword 
                        ? "border-red-400 bg-red-50 focus:border-red-500" 
                        : "border-gray-200 focus:border-pink-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 ml-2 animate-shake">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password Strength Indicator */}
              {formData.password && !errors.password && (
                <div className="animate-fade-in">
                  <div className="flex gap-1 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          formData.password.length > (i + 1) * 1.5
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.password.length < 6 
                      ? "Password must be at least 6 characters" 
                      : "✓ Strong password"}
                  </p>
                </div>
              )}

                {showOtpBox && (

                <div className="animate-fade-in-up">

                  <div className="relative">

                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-yellow-400 focus:outline-none focus:border-pink-500 text-center text-xl font-bold tracking-[10px]"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  >

                    VERIFY OTP 

                  </button>

                </div>

              )}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-600 to-blue-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-6 relative overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "SIGN UP →"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-4 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <p className="text-gray-600">
                Already have an account?
                <Link
                  to="/login"
                  className="text-pink-600 font-bold ml-2 hover:text-blue-600 transition-colors duration-300 hover:underline"
                >
                  SIGN IN
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* Decorative Footer Text */}
        <div className="text-center mt-6 text-white/70 text-sm animate-fade-in">
          <p>🍛 Freshly cooked • Hygienic • Authentic</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 4.5s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-blob {
          animation: blob 12s infinite;
        }
        
        .animation-delay-2 {
          animation-delay: 2s;
        }
        
        .animation-delay-4 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Register;
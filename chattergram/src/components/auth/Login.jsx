// import React from "react";

// export default function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

//         {/* Brand */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-semibold text-white">
//             Social<span className="text-indigo-500">Hub</span>
//           </h1>
//           <p className="text-slate-400 text-sm mt-2">
//             Log in to your account
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm text-slate-400 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm text-slate-400 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Remember + Forgot */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-slate-400">
//               <input type="checkbox" className="accent-indigo-500" />
//               Remember me
//             </label>
//             <a href="#" className="text-indigo-500 hover:underline">
//               Forgot?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium py-3 rounded-xl"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="h-px bg-slate-800 flex-1" />
//           <span className="text-slate-500 text-xs">OR</span>
//           <div className="h-px bg-slate-800 flex-1" />
//         </div>

//         {/* Social Login */}
//         <div className="space-y-3">
//           <button className="w-full border border-slate-800 rounded-xl py-3 text-white hover:bg-slate-800 transition">
//             Continue with Google
//           </button>
//           <button className="w-full border border-slate-800 rounded-xl py-3 text-white hover:bg-slate-800 transition">
//             Continue with Apple
//           </button>
//         </div>

//         {/* Signup */}
//         <p className="text-center text-sm text-slate-400 mt-6">
//           Don’t have an account?
//           <a href="#" className="text-indigo-500 ml-1 hover:underline">
//             Sign up
//           </a>
//         </p>

//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { login } from "../../services/apiServices";
import { useNavigate } from "react-router";

export default function Login() {
  const navigation =useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    // For testing
    // console.log("Login Data:", formData);


    const res = await login(formData);
    console.log(res?.token);
    localStorage.setItem("TOKEN",res.token);
    localStorage.setItem("USER",JSON.stringify(res?.user));
    // alert("Login successful (check console)");
    navigation("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Social<span className="text-indigo-500">Hub</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Log in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium py-3 rounded-xl"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-slate-500 text-xs">OR</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full border border-slate-800 rounded-xl py-3 text-white hover:bg-slate-800 transition">
            Continue with Google
          </button>
          <button className="w-full border border-slate-800 rounded-xl py-3 text-white hover:bg-slate-800 transition">
            Continue with Apple
          </button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don’t have an account?
          <a href="signup" className="text-indigo-500 ml-1 hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}

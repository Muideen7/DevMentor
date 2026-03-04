"use client"

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <span className="text-accent-coral text-xs font-bold tracking-[0.2em] uppercase">Welcome Back</span>
        <h2 className="text-3xl font-bold text-slate-900 mt-2">Log in to DevMentor AI</h2>
      </div>

      {/* Google Auth */}
      <button 
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors mb-6 group bg-white shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        </svg>
        <span className="text-slate-700 font-medium group-hover:text-accent-coral transition-colors">Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative mb-8">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background-light text-slate-400 italic">or</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm font-bold bg-red-100 p-2 rounded-lg">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">Email Address</label>
          <input 
            className="w-full px-5 py-3.5 rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral outline-none transition-all placeholder:text-slate-400" 
            id="email" 
            name="email" 
            placeholder="you@example.com" 
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">Password</label>
          <div className="relative">
            <input 
              className="w-full px-5 py-3.5 pr-12 rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral outline-none transition-all placeholder:text-slate-400" 
              id="password" 
              name="password" 
              placeholder="Your password" 
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent-coral transition-colors flex items-center justify-center p-1"
            >
              <span className="material-symbols-outlined text-[1.25rem]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input className="w-4 h-4 rounded border-slate-300 text-accent-coral focus:ring-accent-coral/20" type="checkbox"/>
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
          </label>
          <a className="text-sm font-semibold text-accent-coral hover:text-accent-coral/80 transition-colors" href="#">Forgot password?</a>
        </div>
        <button 
          className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In to My Account"} 
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Don't have an account yet? <Link className="text-accent-coral font-bold hover:underline decoration-2 underline-offset-4" href="/signup">Sign Up Free</Link>
        </p>
      </div>
    </>
  );
}

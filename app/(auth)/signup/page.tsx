"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        // Log in automatically after signup
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        router.push("/onboarding/step-1");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <span className="text-accent-coral font-bold uppercase tracking-widest text-[0.7rem]">Create your account</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 mt-1">Start learning with your AI mentor today.</h2>
        <p className="text-slate-500">Free to start. No credit card required.</p>
      </div>

      {/* Google Auth */}
      <button 
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-full hover:bg-slate-50 transition-colors font-medium text-slate-700 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background-light px-4 text-slate-400 italic">or</span>
        </div>
      </div>

      {/* Registration Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm font-bold bg-red-100 p-2 rounded-lg">{error}</p>}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Full Name</label>
          <input 
            className="w-full bg-white border border-slate-200 py-3 px-4 focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none rounded-full" 
            placeholder="John Doe" 
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Email Address</label>
          <input 
            className="w-full bg-white border border-slate-200 py-3 px-4 focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none rounded-full" 
            placeholder="john@example.com" 
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Password</label>
            <input 
              className="w-full bg-white border border-slate-200 py-3 px-4 pr-12 focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none rounded-full" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-400 hover:text-accent-coral transition-colors flex items-center justify-center p-1"
            >
              <span className="material-symbols-outlined text-[1.1rem]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Confirm</label>
            <input 
              className="w-full bg-white border border-slate-200 py-3 px-4 pr-12 focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none rounded-full" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
        </div>
        <button 
          className="w-full bg-primary text-white py-4 rounded-full font-bold mt-6 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-primary/20 disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create My Account"}
          {!loading && <span className="material-symbols-outlined text-xl">arrow_right_alt</span>}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Already have an account? <Link className="text-accent-coral font-bold" href="/login">Log In</Link>
        </p>
        <p className="text-[11px] text-slate-400 mt-6 max-w-xs mx-auto leading-relaxed">
          By signing up, you agree to our <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
        </p>
      </div>
    </>
  );
}

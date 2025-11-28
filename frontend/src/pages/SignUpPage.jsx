import React, { useState } from "react";
// import "../../src/index.css";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  //from zustand store
  const { signup, isSigningUp } = useAuthStore();

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        {/* container */}
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r boder-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  {/* HEADING TEXT */}
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-3xl font-bold mb-6 text-slate-200">
                    Create an Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new accounts</p>
                </div>
                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* full name input */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Enter Full Name"
                      />
                    </div>
                  </div>

                  {/* EMAIL input */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  {/*  Password input */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>
                  {/* BUTTON */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
                {/* FORM END */}
                {/* Redirect to Login */}
                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE - Picture */}
            <div className="hidden md:w-1/2 md:flex items-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="people with phones"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-300">
                    Start chatting today
                  </h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Enywhere</span>
                    <span className="auth-badge">Save</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  //------methods-------
  //checking user authorization
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //--signup method
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      //send request to sign up route
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      // --- toast
      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error.message);
      //--
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

//--BASE URL
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  //------methods-------
  //checking user authorization
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      //connect to sockets
      get().connectSocket();
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
      //connect to sockets
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      //--
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //--login method
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      //send request to sign up route
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      // --- toast
      toast.success("Logged In successfully!");
      //connect to sockets
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      //--
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //--logout method
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      //close the socket connection
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  //---update profile---
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

  //---connect to Socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, //this ensures cookies sent with the connection
    });

    socket.connect();
    set({ socket: socket });

    //listen for online users event
    socket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },

  //disconect from sockets
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

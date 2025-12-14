import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

//----Chat Store----
export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  //---toggle Sound
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  //--set Active tab
  setActiveTab: (tab) => set({ activeTab: tab }),
  //--set a seleted user for chat
  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

  //--get ALL CONTACTS---
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  //---get CHATS---
  getMyChatpartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));

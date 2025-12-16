import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

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

  //---getMessagesByUserId
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    //temp id
    const tempId = `temp-${Date.now()}`;

    //--optional optimistic
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };

    //immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      //removing optimistic messages on failure
      set({ messages: messages });
      toast.error(
        error.response?.data?.message || "something went wrong (sendMessage)"
      );
    }
  },
}));

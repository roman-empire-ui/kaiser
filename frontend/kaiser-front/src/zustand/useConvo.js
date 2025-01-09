import { create } from "zustand";

const useConvo = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [], // Messages array
  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === "function" ? updater(state.messages) : updater,
    })), // Allows functional updates or direct overwrites
}));

export default useConvo;

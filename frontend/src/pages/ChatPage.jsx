import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div>
      <button className="text-white" onClick={logout}>
        Logout
      </button>

      {/* <h1 className="text-white">ChatPage</h1> */}
    </div>
  );
}

export default ChatPage;

import React from 'react';
import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="bg-white p-4 border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-200">
              <img 
                src={selectedUser.profilePicture || "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="} 
                alt={selectedUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online status indicator */}
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-neutral-900">{selectedUser.name}</h3>
            <p className={`text-xs ${onlineUsers.includes(selectedUser._id) ? 'text-green-600' : 'text-neutral-500'}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
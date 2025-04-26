import React from 'react';
import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="bg-surface px-4 py-3 border-b border-neutral-200 shadow-sm flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with interactive status */}
          <div className="relative group">
            <div className="size-10 rounded-full overflow-hidden border-2 border-primary-300 bg-primary-50 flex items-center justify-center">
              <img 
                src={selectedUser.profilePicture || "/default-avatar.png"} 
                alt={selectedUser.name}
                className="size-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            </div>
            {/* Animated status indicator */}
            <div 
              className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-surface ${
                onlineUsers.includes(selectedUser._id)
                  ? "bg-success animate-pulse"
                  : "bg-neutral-400"
              }`}
              title={onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            />
          </div>

          {/* User info with better hierarchy */}
          <div className="min-w-0">
            <h3 className="font-medium text-neutral-900 truncate max-w-[160px] md:max-w-xs">
              {selectedUser.fullName || selectedUser.name}
            </h3>
            <div className="flex items-center gap-1">
              <span 
                className={`text-xs ${
                  onlineUsers.includes(selectedUser._id)
                    ? "text-success font-medium"
                    : "text-neutral-500"
                }`}
              >
                {onlineUsers.includes(selectedUser._id) ? "Active now" : "Last seen recently"}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-1.5 rounded-full transition-all duration-200
                    text-neutral-500 hover:text-neutral-700 
                    hover:bg-neutral-100 active:bg-neutral-200
                    focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          aria-label="Close conversation"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
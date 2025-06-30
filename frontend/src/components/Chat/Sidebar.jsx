// Sidebar.jsx
import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { Users, Search, MoreVertical } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (
    showOnlineOnly
      ? Array.isArray(users)
        ? users.filter((user) => onlineUsers.includes(user._id))
        : []
      : Array.isArray(users)
      ? users
      : []
  ).filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="p-3 flex-shrink-0 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary-800">
            <div className="size-10 rounded-full overflow-hidden bg-primary-100 border border-primary-200">
              <img
                src={authUser?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="size-full object-cover"
              />
            </div>
            <span className="font-semibold hidden md:block">Chats</span>
          </div>

          {/* <button className="text-primary-600 hover:text-primary-800">
            <MoreVertical className="size-5" />
          </button> */}
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-4 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-surface py-2 pl-10 pr-3 rounded-lg text-sm border border-neutral-200 focus:border-primary-300 focus:ring-1 focus:ring-primary-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Online filter */}
        <div className="mt-3 hidden md:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-xs text-neutral-700">Online only</span>
          </label>
          {/* <span className="text-xs text-neutral-500 bg-primary-100 px-2 py-1 rounded-full">
            {onlineUsers.length - 1} online
          </span> */}
          {onlineUsers.length - 1 >= 0 && (
            <span className="text-xs text-neutral-500 bg-primary-100 px-2 py-1 rounded-full">
              {onlineUsers.length - 1} online
            </span>
          )}
        </div>
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-3 py-3 flex items-center gap-3 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-primary-100"
                : "hover:bg-neutral-50"
            } border-b border-neutral-100`}
          >
            <div className="relative">
              <img
                src={user.profilePicture || "/default-avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-surface"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full border-2 border-surface" />
              )}
            </div>

            <div className="hidden md:block text-left min-w-0 flex-1">
              <div className="flex justify-between items-center">
                <div className="font-medium text-neutral-900 truncate">
                  {user.fullName || user.name}

                  {user.role === "admin" && (
                    <span className="ml-2 bg-primary-500 text-surface text-xs py-1 px-2 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-500">
                  {user.lastMessageTime || ""}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div
                  className={`text-sm ${
                    onlineUsers.includes(user._id)
                      ? "text-success"
                      : "text-neutral-500"
                  } truncate`}
                >
                  {user.lastMessage ||
                    (onlineUsers.includes(user._id) ? "Online" : "Offline")}
                </div>
                {user.unreadCount > 0 && (
                  <span className="bg-primary-500 text-surface rounded-full size-5 flex items-center justify-center text-xs">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-neutral-500 py-10 px-4">
            <div className="text-sm">
              {showOnlineOnly ? "No online contacts" : "No contacts available"}
            </div>
            <div className="text-xs mt-1 text-neutral-400">
              {showOnlineOnly
                ? "Try disabling online filter"
                : "Your contacts will appear here"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

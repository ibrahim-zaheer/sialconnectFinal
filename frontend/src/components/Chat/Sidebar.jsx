import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Ensure users is always an array
  const filteredUsers = showOnlineOnly
    ? (Array.isArray(users) ? users.filter((user) => onlineUsers.includes(user._id)) : [])
    : (Array.isArray(users) ? users : []);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-64 border-r border-neutral-200 bg-white flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-neutral-200 w-full p-4">
        <div className="flex items-center gap-3">
          <Users className="size-5 text-primary-600" />
          <span className="font-semibold text-neutral-900 hidden lg:block">Contacts</span>
        </div>
        
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm text-neutral-600">Show online only</span>
          </label>
          <span className="text-xs text-neutral-500">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-3 py-3 flex items-center gap-3 hover:bg-neutral-100 transition-colors ${
              selectedUser?._id === user._id ? "bg-primary-50" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePicture || "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="}
                alt={user.name}
                className="size-10 object-cover rounded-full border-2 border-white shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-neutral-900 truncate">{user.fullName || user.name}</div>
              <div className={`text-xs ${
                onlineUsers.includes(user._id) ? "text-green-600" : "text-neutral-500"
              }`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-neutral-500 py-6 px-4">
            <div className="text-sm">
              {showOnlineOnly ? "No online users" : "No contacts available"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
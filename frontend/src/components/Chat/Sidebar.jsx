import { useEffect, useState } from "react";
import {useChatStore } from "../../store/useChatStore";

const Sidebar = ()=>{

    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);




    useEffect(() => {
        getUsers();
      }, [getUsers]);

      return(
<h1>Ibrhim</h1>
      )
};

export default Sidebar;
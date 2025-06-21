


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// function NotificationBell({ userId }) {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Create socket connection
//   useEffect(() => {
//     if (!userId) return;

//     const socket = io('http://localhost:5000', {
//       query: { userId }, // send userId so backend can map socket
//     });

//     // Listen for real-time notifications
//     socket.on('newNotification', (notification) => {
//       setNotifications((prev) => [notification, ...prev]);
//     });

//     // Clean up socket on unmount or userId change
//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   // Fetch initial notifications
//   useEffect(() => {
//     if (!userId) return;
//     fetchNotifications();
//   }, [userId]);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/notification/notifications/${userId}`);
//       setNotifications(res.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark all notifications as read when dropdown opens
//   const markAllAsRead = async () => {
//     try {
//       await axios.post(`/api/notification/notifications/${userId}/markRead`);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (error) {
//       console.error('Error marking notifications as read:', error);
//     }
//   };

//   const toggleDropdown = () => {
//     const willOpen = !open;
//     setOpen(willOpen);

//     if (willOpen) {
//       const unreadCount = notifications.filter((n) => !n.isRead).length;
//       if (unreadCount > 0) {
//         markAllAsRead();
//       }
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return (
//     <div style={{ position: 'relative' }}>
//       <button
//         onClick={toggleDropdown}
//         style={{ position: 'relative', fontSize: '24px', cursor: 'pointer' }}
//         aria-label="Notifications"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span
//             style={{
//               position: 'absolute',
//               top: '-4px',
//               right: '-4px',
//               background: 'red',
//               borderRadius: '50%',
//               padding: '2px 6px',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: 'bold',
//             }}
//           >
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div
//           style={{
//             position: 'absolute',
//             right: 0,
//             background: 'white',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//             width: '320px',
//             maxHeight: '400px',
//             overflowY: 'auto',
//             zIndex: 1000,
//             marginTop: '8px',
//             borderRadius: '4px',
//           }}
//         >
//           {loading ? (
//             <p style={{ padding: '12px' }}>Loading notifications...</p>
//           ) : notifications.length === 0 ? (
//             <p style={{ padding: '12px' }}>No notifications</p>
//           ) : (
//             notifications.map((n) => (
//               <div
//                 key={n._id}
//                 style={{
//                   padding: '10px 15px',
//                   borderBottom: '1px solid #eee',
//                   backgroundColor: n.isRead ? 'white' : '#eef6ff',
//                   cursor: 'default',
//                 }}
//               >
//                 <p style={{ margin: 0 }}>
//                   {n.actionUrl ? (
//                     <a href={n.actionUrl} target="_blank" rel="noopener noreferrer">
//                       {n.message}
//                     </a>
//                   ) : (
//                     n.message
//                   )}
//                 </p>
//                 <small style={{ color: '#666' }}>
//                   {new Date(n.timestamp).toLocaleString()}
//                 </small>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationBell;



import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:5000', {
      query: { userId }, // Send userId so backend can map socket
    });

     socket.on('connect', () => {
      console.log(`Socket connected at notification bell: ${socket.id}`); // Log socket id
    });
    // Listen for real-time notifications
    // socket.on('new_notification', (notification) => {
    //   setNotifications((prev) => [notification, ...prev]); // Add new notification to the list
    //   console.log("New real-time notification:", notification);
    // });

      socket.on('new_notification', (notification) => {
    console.log("Listening for new_notification event."); // Log when the event listener is activated
    console.log("New real-time notification received:", notification);

    setNotifications((prev) => [notification, ...prev]); // Add new notification to the list
  });
    // Clean up socket on unmount or userId change
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Fetch initial notifications
  useEffect(() => {
    if (!userId) return;
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/notification/notifications/${userId}`);
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post(`/api/notification/notifications/${userId}/markRead`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const toggleDropdown = () => {
    const willOpen = !open;
    setOpen(willOpen);

    if (willOpen) {
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      if (unreadCount > 0) {
        markAllAsRead();
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={toggleDropdown}
        style={{ position: 'relative', fontSize: '24px', cursor: 'pointer' }}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'red',
              borderRadius: '50%',
              padding: '2px 6px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            background: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '320px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000,
            marginTop: '8px',
            borderRadius: '4px',
          }}
        >
          {loading ? (
            <p style={{ padding: '12px' }}>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p style={{ padding: '12px' }}>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: n.isRead ? 'white' : '#eef6ff',
                  cursor: 'default',
                }}
              >
                <p style={{ margin: 0 }}>
                  {n.actionUrl ? (
                    <a href={n.actionUrl} target="_blank" rel="noopener noreferrer">
                      {n.message}
                    </a>
                  ) : (
                    n.message
                  )}
                </p>
                <small style={{ color: '#666' }}>
                  {new Date(n.timestamp).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;









// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import axios from 'axios';
// import { useAuthStore } from '../../store/useAuthStore';


// function NotificationBell({ userId }) {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
    
//     // Correct way to get state from zustand store
//   // const { socket, authUser } = useAuthStore();
//    const socket = useAuthStore.getState().socket;
//     const authUser = useAuthStore.getState().authUser;

//   useEffect(() => {
//     if (!userId || !socket) return;

//     const handleNewNotification = (notification) => {
//       console.log("📬 Received real-time notification", notification);
//       setNotifications(prev => [notification, ...prev]);
//     };

//     socket.on('newNotification', handleNewNotification);

//     // Clean up only the event listener, not the entire socket
//     return () => {
//       socket.off('newNotification', handleNewNotification);
//     };
//   }, [userId, socket]); // Add socket to dependency array

//   // Fetch initial notifications
//   useEffect(() => {
//     if (!userId) return;
//     fetchNotifications();
//   }, [userId]);

//   // Move error checks inside useEffect
//   useEffect(() => {
//     if (!authUser) {
//       console.error("authUser is missing in NotificationBell");
//     }
//     if (socket && !socket.connected) {
//       console.error("Socket is not connected in NotificationBell");
//     }
//     if(socket){
//       console.log("socket is connected");
//     }
//   }, [authUser, socket]);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/notification/notifications/${userId}`);
//       setNotifications(res.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await axios.post(`/api/notification/notifications/${userId}/markRead`);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (error) {
//       console.error('Error marking notifications as read:', error);
//     }
//   };

//   const toggleDropdown = () => {
//     const willOpen = !open;
//     setOpen(willOpen);

//     if (willOpen) {
//       const unreadCount = notifications.filter((n) => !n.isRead).length;
//       if (unreadCount > 0) {
//         markAllAsRead();
//       }
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return (
//     <div style={{ position: 'relative' }}>
//       <button
//         onClick={toggleDropdown}
//         style={{ position: 'relative', fontSize: '24px', cursor: 'pointer' }}
//         aria-label="Notifications"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span
//             style={{
//               position: 'absolute',
//               top: '-4px',
//               right: '-4px',
//               background: 'red',
//               borderRadius: '50%',
//               padding: '2px 6px',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: 'bold',
//             }}
//           >
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div
//           style={{
//             position: 'absolute',
//             right: 0,
//             background: 'white',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//             width: '320px',
//             maxHeight: '400px',
//             overflowY: 'auto',
//             zIndex: 1000,
//             marginTop: '8px',
//             borderRadius: '4px',
//           }}
//         >
//           {loading ? (
//             <p style={{ padding: '12px' }}>Loading notifications...</p>
//           ) : notifications.length === 0 ? (
//             <p style={{ padding: '12px' }}>No notifications</p>
//           ) : (
//             notifications.map((n) => (
//               <div
//                 key={n._id}
//                 style={{
//                   padding: '10px 15px',
//                   borderBottom: '1px solid #eee',
//                   backgroundColor: n.isRead ? 'white' : '#eef6ff',
//                   cursor: 'default',
//                 }}
//               >
//                 <p style={{ margin: 0 }}>
//                   {n.actionUrl ? (
//                     <a href={n.actionUrl} target="_blank" rel="noopener noreferrer">
//                       {n.message}
//                     </a>
//                   ) : (
//                     n.message
//                   )}
//                 </p>
//                 <small style={{ color: '#666' }}>
//                   {new Date(n.timestamp).toLocaleString()}
//                 </small>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationBell;

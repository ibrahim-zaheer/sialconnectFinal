// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function NotificationBell({ userId }) {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch notifications on mount and when userId changes
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

//   // Mark all notifications as read when dropdown is opened
//   const markAllAsRead = async () => {
//     try {
//       await axios.post(`/api/notification/notifications/${userId}/markRead`);
//       setNotifications((prev) =>
//         prev.map((n) => ({ ...n, isRead: true }))
//       );
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
//                 <p style={{ margin: 0 }}>{n.message}</p>
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
//                 <p style={{ margin: 0 }}>{n.message}</p>
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
import axios from 'axios';
import { io } from 'socket.io-client';

function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Create socket connection
  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:5000', {
      query: { userId }, // send userId so backend can map socket
    });

    // Listen for real-time notifications
    socket.on('newNotification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
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

  // Mark all notifications as read when dropdown opens
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


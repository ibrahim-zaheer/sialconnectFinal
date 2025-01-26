// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // Update with your backend URL

// const ChatRoom = ({ currentUser, chatPartner }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const roomId = [currentUser, chatPartner].sort().join("-");
//     socket.emit("joinRoom", { sender: currentUser, receiver: chatPartner });

//     // Fetch chat history
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(`/message/${currentUser}/${chatPartner}`);
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };
//     fetchMessages();

//     // Listen for real-time messages
//     socket.on("receiveMessage", (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [currentUser, chatPartner]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { sender: currentUser, receiver: chatPartner, message });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat with {chatPartner}</h2>
//       <ul>
//         {messages.map((msg) => (
//           <li key={msg._id}>
//             <strong>{msg.sender}:</strong> {msg.message}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
















// // import React, { useState, useEffect } from 'react';

// // const ChatRoom = ({ currentUser, chatPartner }) => {
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState('');

// //     // Fetch messages between currentUser and chatPartner
// //     const fetchMessages = async () => {
// //         try {
// //             const response = await fetch(`/messages/messages/${currentUser}/${chatPartner}`);
// //             const data = await response.json();
// //             setMessages(data);
// //         } catch (error) {
// //             console.error('Error fetching messages:', error);
// //         }
// //     };

// //     // Send a new message
// //     const sendMessage = async () => {
// //         try {
// //             await fetch('/messages/messages', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     sender: currentUser,
// //                     receiver: chatPartner,
// //                     message,
// //                 }),
// //             });

// //             // Clear the message input after sending
// //             setMessage('');
// //             // Fetch messages to update the list
// //             fetchMessages();
// //         } catch (error) {
// //             console.error('Error sending message:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         // Fetch messages on component mount
// //         fetchMessages();
// //         // Poll for new messages every 2 seconds
// //         const interval = setInterval(() => {
// //             fetchMessages();
// //         }, 2000);

// //         return () => clearInterval(interval);
// //     }, [currentUser, chatPartner]); // Re-run effect if users change

// //     return (
// //         <div>
// //             <h2>Chat with {chatPartner}</h2>
// //             <ul>
// //                 {messages.map((msg) => (
// //                     <li key={msg._id}>
// //                         <strong>{msg.sender}:</strong> {msg.message}
// //                     </li>
// //                 ))}
// //             </ul>
// //             <div>
// //                 <input
// //                     type="text"
// //                     placeholder="Type your message..."
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                 />
// //                 <button onClick={sendMessage}>Send</button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ChatRoom;

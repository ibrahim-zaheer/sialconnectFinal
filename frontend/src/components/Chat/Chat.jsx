import React, { useEffect, useState } from "react";
import socket from "../../services/socket";

const Chat = ({ userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  

  useEffect(() => {
    // Join the socket room
    socket.emit("join", userId);

    // Receive messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", {
        senderId: userId,
        receiverId,
        message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: userId, message },
      ]);
      setMessage("");
    }
  };

  return (
    <div>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.senderId === userId ? "right" : "left" }}>
            <p><strong>{msg.senderId === userId ? "You" : "Them"}:</strong> {msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

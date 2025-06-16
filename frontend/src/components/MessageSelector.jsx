import React from 'react';

// Reusable MessageSelector Component
const MessageSelector = ({ predefinedMessages, setMessage }) => {
  const handlePredefinedMessage = (message) => {
    setMessage(message);  // Set selected message in the parent component's state
  };

  return (
    <div className="space-y-2">
      {predefinedMessages.map((msg, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handlePredefinedMessage(msg)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          {msg}
        </button>
      ))}
    </div>
  );
};

export default MessageSelector;

import React from "react";
import { useChatStore } from "../../store/useChatStore.js";
import { useRef, useState } from "react";
import { Image, Send, X,Mic } from "lucide-react";
import toast from "react-hot-toast";
import VoiceMessageRecorder from "./VoiceMessageRecorder.jsx";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  // const { sendMessage } = useChatStore();
  const { sendMessage, selectedUser } = useChatStore();
  const [inputMode, setInputMode] = useState("text");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSendVoiceMessage = async (voiceData) => {
    if (!selectedUser) return;

    try {
      await sendMessage(voiceData);
      setInputMode("text"); // Switch back to text input after sending
    } catch (error) {
      console.error("Error sending voice message:", error);
      toast.error("Failed to send voice message");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-neutral-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-neutral-200 hover:bg-neutral-100 transition-colors"
              type="button"
            >
              <X className="size-4 text-neutral-600" />
            </button>
          </div>
        </div>
      )}


            {/* Input mode toggle */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          className={`btn btn-sm ${inputMode === 'text' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setInputMode("text")}
        >
          Text
        </button>
        <button
          type="button"
          className={`btn btn-sm ${inputMode === 'voice' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setInputMode("voice")}
        >
          <Mic size={16} />
        </button>
      </div>
{/* 
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-2 rounded-full hover:bg-neutral-100 transition-colors ${imagePreview ? "text-primary-600" : "text-neutral-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2 rounded-full ${text.trim() || imagePreview ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"} transition-colors`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
       */}
         {inputMode === "text" ? (
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <button
              type="button"
              className={`hidden sm:flex btn btn-circle ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={22} />
          </button>
        </form>
      ) : (
        <VoiceMessageRecorder 
          onSend={handleSendVoiceMessage}
          onCancel={() => setInputMode("text")}
        />
      )}
  
    </div>
  );
};

export default MessageInput;

// import React from "react";
// import { useChatStore } from "../../store/useChatStore.js";
// import { useRef, useState } from "react";
// import { Image, Send, X,Mic } from "lucide-react";
// import toast from "react-hot-toast";
// import VoiceMessageRecorder from "./VoiceMessageRecorder.jsx";
// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
//   // const { sendMessage } = useChatStore();
//   const { sendMessage, selectedUser } = useChatStore();
//   const [inputMode, setInputMode] = useState("text");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleSendVoiceMessage = async (voiceData) => {
//     if (!selectedUser) return;

//     try {
//       await sendMessage(voiceData);
//       setInputMode("text"); // Switch back to text input after sending
//     } catch (error) {
//       console.error("Error sending voice message:", error);
//       toast.error("Failed to send voice message");
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview) return;

//     try {
//       await sendMessage({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       // Clear form
//       setText("");
//       setImagePreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };
//   return (
//     <div className="p-4 w-full">
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-lg border border-neutral-300"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-neutral-200 hover:bg-neutral-100 transition-colors"
//               type="button"
//             >
//               <X className="size-4 text-neutral-600" />
//             </button>
//           </div>
//         </div>
//       )}


//             {/* Input mode toggle */}
//       <div className="flex items-center gap-2 mb-2">
//         <button
//           type="button"
//           className={`btn btn-sm ${inputMode === 'text' ? 'btn-primary' : 'btn-ghost'}`}
//           onClick={() => setInputMode("text")}
//         >
//           Text
//         </button>
//         <button
//           type="button"
//           className={`btn btn-sm ${inputMode === 'voice' ? 'btn-primary' : 'btn-ghost'}`}
//           onClick={() => setInputMode("voice")}
//         >
//           <Mic size={16} />
//         </button>
//       </div>
// {/* 
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div className="flex-1 flex gap-2">
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="Type a message..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//           />

//           <button
//             type="button"
//             className={`p-2 rounded-full hover:bg-neutral-100 transition-colors ${imagePreview ? "text-primary-600" : "text-neutral-400"}`}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Image size={20} />
//           </button>
//         </div>
//         <button
//           type="submit"
//           className={`p-2 rounded-full ${text.trim() || imagePreview ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"} transition-colors`}
//           disabled={!text.trim() && !imagePreview}
//         >
//           <Send size={20} />
//         </button>
//       </form>
//        */}
//          {inputMode === "text" ? (
//         <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//           <div className="flex-1 flex gap-2">
//             <input
//               type="text"
//               className="w-full input input-bordered rounded-lg input-sm sm:input-md"
//               placeholder="Type a message..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               ref={fileInputRef}
//               onChange={handleImageChange}
//             />

//             <button
//               type="button"
//               className={`hidden sm:flex btn btn-circle ${
//                 imagePreview ? "text-emerald-500" : "text-zinc-400"
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <Image size={20} />
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="btn btn-sm btn-circle"
//             disabled={!text.trim() && !imagePreview}
//           >
//             <Send size={22} />
//           </button>
//         </form>
//       ) : (
//         <VoiceMessageRecorder 
//           onSend={handleSendVoiceMessage}
//           onCancel={() => setInputMode("text")}
//         />
//       )}
  
//     </div>
//   );
// };

// export default MessageInput;

import React from "react";
import { useChatStore } from "../../store/useChatStore.js";
import { useRef, useState } from "react";
import { Image, Send, X, Mic } from "lucide-react";
import toast from "react-hot-toast";
import VoiceMessageRecorder from "./VoiceMessageRecorder.jsx";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedUser } = useChatStore();
  const [inputMode, setInputMode] = useState("text");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
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
      setInputMode("text");
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

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-surface border-t border-neutral-200">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border-2 border-primary-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 shadow-md hover:bg-error-600 transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
          <span className="text-sm text-neutral-500">Image ready to send</span>
        </div>
      )}

      {/* Input mode toggle */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex bg-neutral-100 rounded-full p-1">
          <button
            type="button"
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              inputMode === "text"
                ? "bg-primary-600 text-white shadow-sm"
                : "text-neutral-600 hover:bg-neutral-200"
            }`}
            onClick={() => setInputMode("text")}
          >
            Text
          </button>
          <button
            type="button"
            className={`p-2 rounded-full transition-colors ${
              inputMode === "voice"
                ? "bg-primary-600 text-white shadow-sm"
                : "text-neutral-600 hover:bg-neutral-200"
            }`}
            onClick={() => setInputMode("voice")}
            aria-label="Voice message"
          >
            <Mic size={18} />
          </button>
        </div>
      </div>

      {inputMode === "text" ? (
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex-1 flex flex-col">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full pl-4 pr-12 py-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-surface text-neutral-900 placeholder-neutral-400"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Message input"
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
                className={`absolute right-3 p-1 rounded-full transition-colors ${
                  imagePreview
                    ? "text-primary-600"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach image"
              >
                <Image size={20} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`p-3 rounded-full transition-colors ${
              text.trim() || imagePreview
                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-md"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
            disabled={!text.trim() && !imagePreview}
            aria-label="Send message"
          >
            <Send size={20} />
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
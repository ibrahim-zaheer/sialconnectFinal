import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VoiceMessagePlayer = ({ url, duration }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300"
      onClick={togglePlayback}
    >
      <button className="text-blue-600">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <span className="text-sm text-gray-700">{duration ? `${duration}s` : ""}</span>
      <audio
        ref={audioRef}
        src={url}
        onEnded={handleEnded}
        hidden
      />
    </div>
  );
};

export default VoiceMessagePlayer;

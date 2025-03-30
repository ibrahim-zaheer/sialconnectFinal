import { useState, useRef, useEffect } from 'react';
import { storage, ref, uploadBytes, getDownloadURL } from '../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaTimes, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';


const VoiceMessageRecorder = ({ onSend, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state !== 'inactive') {
        stopRecording();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Microphone access denied. Please allow microphone access to send voice messages.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSend = async () => {
    if (audioChunksRef.current.length === 0) return;
  
    setIsUploading(true);
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

  
      const formData = new FormData();
      formData.append('voice', audioBlob, 'voice-message.mp3');
  
      const response = await axios.post('/api/message/upload/voice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const s3Url = response.data.url;
  
      onSend({
        voiceMessage: s3Url,
        duration: duration,
      });
  
      resetRecorder();
    } catch (error) {
      console.error('Voice upload error:', error);
      toast.error('Failed to upload voice message');
    } finally {
      setIsUploading(false);
    }
  };
  

  const resetRecorder = () => {
    setAudioURL('');
    setDuration(0);
    audioChunksRef.current = [];
    setIsPlaying(false);
    if (onCancel) onCancel();
  };

  const togglePlayback = () => {
    if (audioURL) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="voice-recorder p-3 bg-gray-100 rounded-lg">
      {!audioURL ? (
        <div className="flex items-center gap-3">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            disabled={isUploading}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
          <div className="flex-1">
            {isRecording ? (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-gray-700">Recording... {duration}s</span>
              </div>
            ) : (
              <span className="text-gray-700">Press to record a voice message</span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              className="p-2 bg-blue-500 text-white rounded-full"
              disabled={isUploading}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className="flex-1 flex items-center gap-3">
              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                hidden
              />
              <span className="text-gray-700">{duration}s</span>
              <div className="flex-1 bg-gray-300 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full" 
                  style={{ width: `${(duration % 10) * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={resetRecorder}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md flex items-center gap-1"
              disabled={isUploading}
            >
              <FaTimes /> Cancel
            </button>
            <button
              onClick={handleSend}
              className="px-3 py-1 bg-green-500 text-white rounded-md flex items-center gap-1"
              disabled={isUploading}
            >
              {isUploading ? 'Sending...' : (<>Send <FaPaperPlane /></>)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceMessageRecorder;
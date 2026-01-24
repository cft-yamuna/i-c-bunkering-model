import { useEffect, useRef } from 'react';

interface VideoPlayerScreenProps {
  videoNumber: number;
  onVideoEnd: () => void;
  onBack: () => void;
  onHome: () => void;
}

export default function VideoPlayerScreen({ videoNumber, onVideoEnd, onBack, onHome }: VideoPlayerScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoNumber]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between px-6">
        <button
          onClick={onBack}
          className="transition-all duration-300 hover:scale-110"
        >
          <img src="/back.png" alt="Back" className="w-24 h-auto" />
        </button>
        <button
          onClick={onHome}
          className="transition-all duration-300 hover:scale-110"
        >
          <img src="/home.png" alt="Home" className="w-24 h-auto" />
        </button>
      </div>
      <video
        ref={videoRef}
        onEnded={onVideoEnd}
        controls
        className="w-full h-full object-contain"
      >
        <source src={`/${videoNumber}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

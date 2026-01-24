import { useState, useEffect, useCallback } from 'react';

interface ButtonSelectionScreenProps {
  onSelectVideo: (videoNumber: number) => void;
  onBack: () => void;
}

type AnimationPhase = 'idle' | 'pressing' | 'popping';

export default function ButtonSelectionScreen({ onSelectVideo, onBack }: ButtonSelectionScreenProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');

  const resetTimer = useCallback(() => {
    // Timer will be reset on any activity
  }, []);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      inactivityTimer = setTimeout(() => {
        onBack();
      }, 60000); // 1 minute
    };

    const handleActivity = () => {
      clearTimeout(inactivityTimer);
      startTimer();
    };

    // Start initial timer
    startTimer();

    // Listen for activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [onBack]);

  const handleButtonClick = (buttonNumber: number) => {
    if (clickedButton !== null) return; // Prevent multiple clicks

    setClickedButton(buttonNumber);
    setAnimationPhase('pressing');

    // After press animation (300ms), switch to activated image and pop out
    setTimeout(() => {
      setAnimationPhase('popping');
    }, 300);

    // Navigate after pop animation completes
    setTimeout(() => {
      onSelectVideo(buttonNumber);
    }, 900);
  };

  const getButtonAnimation = (buttonNumber: number) => {
    if (clickedButton !== buttonNumber) return '';
    if (animationPhase === 'pressing') return 'animate-press';
    if (animationPhase === 'popping') return 'animate-pop';
    return '';
  };

  const getButtonImage = (buttonNumber: number) => {
    if (clickedButton === buttonNumber && animationPhase === 'popping') {
      return `/b${buttonNumber}activated.png`;
    }
    return `/b${buttonNumber}.png`;
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 p-8">
        <button
          onClick={() => handleButtonClick(1)}
          className={`transform transition-all duration-300 hover:scale-105 ${getButtonAnimation(1)}`}
        >
          <img
            src={getButtonImage(1)}
            alt="Button 1"
            className="w-auto h-auto max-w-lg"
          />
        </button>

        <div className="flex gap-8">
          <button
            onClick={() => handleButtonClick(2)}
            className={`transform transition-all duration-300 hover:scale-105 ${getButtonAnimation(2)}`}
          >
            <img
              src={getButtonImage(2)}
              alt="Button 2"
              className="w-auto h-auto max-w-lg"
            />
          </button>

          <button
            onClick={() => handleButtonClick(3)}
            className={`transform transition-all duration-300 hover:scale-105 ${getButtonAnimation(3)}`}
          >
            <img
              src={getButtonImage(3)}
              alt="Button 3"
              className="w-auto h-auto max-w-lg"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

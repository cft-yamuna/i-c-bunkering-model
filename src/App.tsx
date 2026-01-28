import { useState, useEffect } from 'react';
import ButtonSelectionScreen from './components/ButtonSelectionScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import type { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('buttons');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Disable right-click context menu and zoom
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSelectVideo = (videoNumber: number) => {
    setSelectedVideo(videoNumber);
    setCurrentScreen('video');
  };

  const handleVideoEnd = () => {
    setCurrentScreen('buttons');
    setSelectedVideo(null);
  };

  const handleGoHome = () => {
    setCurrentScreen('buttons');
    setSelectedVideo(null);
  };

  const handleGoBack = () => {
    setCurrentScreen('buttons');
    setSelectedVideo(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentScreen === 'buttons' && (
        <ButtonSelectionScreen onSelectVideo={handleSelectVideo} onBack={handleGoHome} />
      )}

      {currentScreen === 'video' && selectedVideo && (
        <VideoPlayerScreen
          videoNumber={selectedVideo}
          onVideoEnd={handleVideoEnd}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;

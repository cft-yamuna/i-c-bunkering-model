import { useState, useEffect } from 'react';
import ButtonSelectionScreen from './components/ButtonSelectionScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import type { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('buttons');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
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

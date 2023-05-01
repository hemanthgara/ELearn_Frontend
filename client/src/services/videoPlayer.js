import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement, setVCurrentTime) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current?.play()
      : videoElement.current?.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;

    setPlayerState({
      ...playerState,
      progress,
    });

    const duration = videoElement.current.duration;

    setVCurrentTime(
      Math.floor(duration / 60).toString().length > 2
        ? ""
        : Math.floor(videoElement.current.currentTime / 60).toString()
            .length === 1
        ? "0" +
          (Math.floor(videoElement.current.currentTime / 60) +
            ":" +
            ("0" + Math.floor(videoElement.current.currentTime % 60)).slice(-2))
        : Math.floor(videoElement.current.currentTime / 60) +
          ":" +
          ("0" + Math.floor(videoElement.current.currentTime % 60)).slice(-2)
    );
  };

  useEffect(() => {
    if (videoElement.current) {
      playerState.isMuted
        ? (videoElement.current.muted = true)
        : (videoElement.current.muted = false);
    }
  }, [playerState.isMuted, videoElement]);

  return {
    playerState,
    handleOnTimeUpdate,
  };
};

export default useVideoPlayer;

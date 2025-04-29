'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export interface VideoProps {
  type: 'youtube' | 'vimeo' | 'mp4';
  src: string;
  title?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  aspectRatio?: 'square' | 'video' | 'cinema';
  className?: string;
}

export default function VideoPlayer({
  type,
  src,
  title = '',
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  aspectRatio = 'video',
  className = '',
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get correct aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'cinema':
        return 'aspect-[21/9]';
      default:
        return 'aspect-video';
    }
  };

  // Handle play/pause for MP4 videos
  const togglePlay = () => {
    if (type !== 'mp4' || !videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Track play state for MP4 videos
  useEffect(() => {
    if (type !== 'mp4' || !videoRef.current) return;
    
    const video = videoRef.current;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (loop && video) {
        video.currentTime = 0;
        video.play();
      }
    };
    const handleLoadedData = () => setVideoLoaded(true);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [loop, type]);

  // YouTube video embed
  if (type === 'youtube') {
    // Extract YouTube ID from URL
    const getYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const youtubeId = getYouTubeId(src);
    if (!youtubeId) {
      return <div className="text-red-500">Invalid YouTube URL</div>;
    }
    
    const youtubeParams = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      loop: loop ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: controls ? '1' : '0',
      rel: '0',
      modestbranding: '1',
    });
    
    if (loop) {
      youtubeParams.append('playlist', youtubeId);
    }
    
    return (
      <div className={`relative overflow-hidden rounded-lg ${getAspectRatioClass()} ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?${youtubeParams.toString()}`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    );
  }

  // Vimeo video embed
  if (type === 'vimeo') {
    // Extract Vimeo ID from URL
    const getVimeoId = (url: string) => {
      const regExp = /vimeo\.com\/(?:video\/|channels\/[^\/]+\/|groups\/[^\/]+\/videos\/|album\/[^\/]+\/video\/|)(\d+)(?:$|\/|\?)/;
      const match = url.match(regExp);
      return match && match[1];
    };
    
    const vimeoId = getVimeoId(src);
    if (!vimeoId) {
      return <div className="text-red-500">Invalid Vimeo URL</div>;
    }
    
    const vimeoParams = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      loop: loop ? '1' : '0',
      muted: muted ? '1' : '0',
      controls: controls ? '1' : '0',
      title: '0',
      byline: '0',
      portrait: '0',
    });
    
    return (
      <div className={`relative overflow-hidden rounded-lg ${getAspectRatioClass()} ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?${vimeoParams.toString()}`}
          title={title || "Vimeo video player"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    );
  }

  // MP4 video player
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${getAspectRatioClass()} ${className}`}
    >
      {poster && !videoLoaded && (
        <div className="absolute inset-0 z-10">
          <Image
            src={poster}
            alt={title || "Video poster"}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="bg-black/50 rounded-full p-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        title={title}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      {!controls && !isPlaying && videoLoaded && (
        <button
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
          onClick={togglePlay}
          aria-label="Play video"
        >
          <div className="bg-black/50 rounded-full p-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
} 
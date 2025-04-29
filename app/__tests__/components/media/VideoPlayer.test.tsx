import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => (props: any) => {
  const { fill, ...rest } = props;
  return <img {...rest} data-testid="video-poster" />;
});

import VideoPlayer from '../../../components/media/VideoPlayer';

describe('VideoPlayer', () => {
  describe('YouTube Player', () => {
    it('renders YouTube video with correct URL and parameters', () => {
      render(
        <VideoPlayer
          type="youtube"
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          autoplay={true}
          loop={true}
          muted={true}
        />
      );
      
      const iframe = screen.getByTitle('YouTube video player') as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toContain('youtube.com/embed/dQw4w9WgXcQ');
      expect(iframe.src).toContain('autoplay=1');
      expect(iframe.src).toContain('loop=1');
      expect(iframe.src).toContain('muted=1');
      expect(iframe.src).toContain('playlist=dQw4w9WgXcQ');
    });

    it('handles invalid YouTube URL', () => {
      render(
        <VideoPlayer
          type="youtube"
          src="https://youtube.com/invalid"
        />
      );
      
      expect(screen.getByText('Invalid YouTube URL')).toBeInTheDocument();
    });
  });

  describe('Vimeo Player', () => {
    it('renders Vimeo video with correct URL and parameters', () => {
      render(
        <VideoPlayer
          type="vimeo"
          src="https://vimeo.com/123456789"
          autoplay={true}
          loop={true}
          muted={true}
        />
      );
      
      const iframe = screen.getByTitle('Vimeo video player') as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toContain('player.vimeo.com/video/123456789');
      expect(iframe.src).toContain('autoplay=1');
      expect(iframe.src).toContain('loop=1');
      expect(iframe.src).toContain('muted=1');
    });

    it('handles invalid Vimeo URL', () => {
      render(
        <VideoPlayer
          type="vimeo"
          src="https://vimeo.com/invalid"
        />
      );
      
      expect(screen.getByText('Invalid Vimeo URL')).toBeInTheDocument();
    });
  });

  describe('MP4 Player', () => {
    beforeEach(() => {
      // Mock video element methods
      window.HTMLMediaElement.prototype.play = jest.fn();
      window.HTMLMediaElement.prototype.pause = jest.fn();
    });

    it('renders MP4 video with correct attributes', () => {
      render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          title="Test Video"
          autoplay={true}
          loop={true}
          muted={true}
          controls={true}
        />
      );
      
      const video = screen.getByTitle('Test Video') as HTMLVideoElement;
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/test-video.mp4');
      expect(video.autoplay).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.muted).toBe(true);
      expect(video.controls).toBe(true);
    });

    it('renders poster image when provided', () => {
      render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          poster="/test-poster.jpg"
          title="Test Video"
        />
      );
      
      const video = screen.getByTitle('Test Video') as HTMLVideoElement;
      expect(video).toHaveAttribute('poster', '/test-poster.jpg');
    });

    it('renders play button when controls are disabled', () => {
      render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          controls={false}
        />
      );
      
      const playButton = screen.getByRole('button', { name: 'Play video' });
      expect(playButton).toBeInTheDocument();
      expect(playButton).toHaveAttribute('aria-label', 'Play video');
    });

    it('toggles play/pause on button click when controls are disabled', () => {
      render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          controls={false}
        />
      );
      
      const playButton = screen.getByRole('button', { name: 'Play video' });
      fireEvent.click(playButton);
      
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
      
      // Update button state after play
      const pauseButton = screen.getByRole('button', { name: 'Pause video' });
      expect(pauseButton).toBeInTheDocument();
      expect(pauseButton).toHaveAttribute('aria-label', 'Pause video');
    });

    it('applies video attributes correctly', () => {
      render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          title="Test Video"
          autoplay
          loop
          muted
          controls={false}
        />
      );
      const video = screen.getByTitle('Test Video') as HTMLVideoElement;
      expect(video.autoplay).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.muted).toBe(true);
      expect(video.controls).toBe(false);
    });

    it('handles video events correctly', () => {
      render(<VideoPlayer type="mp4" src="/test-video.mp4" title="Test Video" />);
      const video = screen.getByTitle('Test Video');

      // Mock event handlers
      const playHandler = jest.fn();
      const pauseHandler = jest.fn();
      const loadedDataHandler = jest.fn();
      
      video.addEventListener('play', playHandler);
      video.addEventListener('pause', pauseHandler);
      video.addEventListener('loadeddata', loadedDataHandler);

      act(() => {
        fireEvent.play(video);
      });
      expect(playHandler).toHaveBeenCalled();
      
      act(() => {
        fireEvent.pause(video);
      });
      expect(pauseHandler).toHaveBeenCalled();
      
      act(() => {
        fireEvent.loadedData(video);
      });
      expect(loadedDataHandler).toHaveBeenCalled();
    });
  });

  describe('Wistia Player', () => {
    const validUrls = [
      { url: 'https://wistia.com/medias/abc12345', id: 'abc12345' },
      { url: 'https://wistia.com/embed/iframe/def67890', id: 'def67890' },
      { url: 'https://wi.st/xyz12345', id: 'xyz12345' },
      { url: 'https://company.wistia.com/medias/ghi12345', id: 'ghi12345' },
      { url: 'https://example.com?wvideo=jkl12345', id: 'jkl12345' }
    ];

    const invalidUrls = [
      'https://wistia.com/medias/a', // Too short
      'https://wistia.com/medias/abcd12345678901', // Too long
      'https://wistia.com/medias/abc@123', // Invalid characters
      'https://notwistia.com/video/123',
      'https://wistia.com/invalid/path'
    ];

    it('handles different Wistia URL formats', () => {
      validUrls.forEach(({ url, id }) => {
        const { container } = render(
          <VideoPlayer type="wistia" src={url} title="Test Video" />
        );
        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe?.src).toContain(`https://fast.wistia.net/embed/iframe/${id}`);
        expect(container.querySelector('[data-testid="wistia-error"]')).not.toBeInTheDocument();
      });
    });

    it('shows error message for invalid Wistia URLs', () => {
      invalidUrls.forEach(url => {
        cleanup(); // Clean up before each iteration
        const { container, getByTestId } = render(
          <VideoPlayer type="wistia" src={url} title="Test Video" />
        );
        expect(getByTestId('wistia-error')).toBeInTheDocument();
        expect(container.querySelector('iframe')).not.toBeInTheDocument();
      });
    });

    it('validates Wistia ID length and format', () => {
      const { container: validContainer } = render(
        <VideoPlayer type="wistia" src="https://wistia.com/medias/abc12345" title="Test Video" />
      );
      expect(validContainer.querySelector('iframe')).toBeInTheDocument();
      expect(validContainer.querySelector('[data-testid="wistia-error"]')).not.toBeInTheDocument();

      const { container: invalidContainer, getByTestId } = render(
        <VideoPlayer type="wistia" src="https://wistia.com/medias/abc" title="Test Video" />
      );
      expect(getByTestId('wistia-error')).toBeInTheDocument();
      expect(invalidContainer.querySelector('iframe')).not.toBeInTheDocument();
    });

    it('applies correct aspect ratio classes', () => {
      const ratios = ['square', 'video', 'cinema'] as const;
      ratios.forEach(ratio => {
        const { container } = render(
          <VideoPlayer type="wistia" src="https://example.wistia.com/medias/abc123xyz" aspectRatio={ratio} />
        );
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain(
          ratio === 'square' ? 'aspect-square' :
          ratio === 'video' ? 'aspect-video' :
          'aspect-[21/9]'
        );
      });
    });
  });

  describe('Common Features', () => {
    it('applies correct aspect ratio classes', () => {
      const { container: square } = render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          aspectRatio="square"
        />
      );
      expect(square.firstChild).toHaveClass('aspect-square');

      const { container: video } = render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          aspectRatio="video"
        />
      );
      expect(video.firstChild).toHaveClass('aspect-video');

      const { container: cinema } = render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          aspectRatio="cinema"
        />
      );
      expect(cinema.firstChild).toHaveClass('aspect-[21/9]');
    });

    it('applies custom className', () => {
      const { container } = render(
        <VideoPlayer
          type="mp4"
          src="/test-video.mp4"
          className="custom-class"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
}); 
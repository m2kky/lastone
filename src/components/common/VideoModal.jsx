import { useEffect, useRef } from 'react'
import '../../styles/videoModal.css'

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  const modalRef = useRef(null)
  const videoRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      window.dataLayer?.push({ event: 'play_video' })
    } else {
      document.body.style.overflow = ''
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
        window.dataLayer?.push({ event: 'close_video' })
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose()
      window.dataLayer?.push({ event: 'close_video' })
    }
  }

  return (
    <div 
      ref={modalRef}
      className="video-modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="video-modal-content">
        <button 
          ref={closeButtonRef}
          className="video-modal-close" 
          onClick={onClose}
          aria-label="Close video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <h2 id="video-modal-title" className="sr-only">Speaking Highlights Video</h2>
        
        <video 
          ref={videoRef}
          controls 
          autoPlay
          preload="none"
          className="video-modal-player"
        >
          <source src={videoUrl} type="video/mp4" />
          <track 
            kind="captions" 
            src="/captions.vtt" 
            srcLang="en" 
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

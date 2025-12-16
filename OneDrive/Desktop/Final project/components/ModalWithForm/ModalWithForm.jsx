import './ModalWithForm.css'
import { useEffect, useRef } from 'react'

function ModalWithForm({
  name,
  title,
  children,
  buttonText,
  onSubmit,
  onClose,
  isOpen,
}) {
  const modalRef = useRef(null)

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    // Add event listener for Escape key
    document.addEventListener('keydown', handleEscape)

    // Focus the modal container for accessibility
    if (modalRef.current) {
      modalRef.current.focus()
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className="modal__container"
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>
        <form
          className="modal__form"
          name={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm


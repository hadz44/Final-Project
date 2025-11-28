import { useEffect } from "react";
import "./Modal.css"; // Import the new CSS file

export const Modal = ({ name, onClose, children, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <div className={`modal modal_type_${name} modal_opened`} onClick={handleOverlay}>
      {children}
    </div>
  ) : null;
}; 
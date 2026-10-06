import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className={`w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white border border-[#F5E6D3] text-left align-middle shadow-2xl transition-all relative z-10 animate-fade-in`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F5E6D3] px-6 py-4 bg-[#FFFAF0]">
            <div className="flex items-center gap-2">
              <span className="text-luxury-brown">✦</span>
              <h3 className="font-serif text-lg font-semibold text-luxury-dark tracking-wide">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-luxury-brown text-xl font-bold p-1 rounded-lg hover:bg-luxury-beigeLight transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

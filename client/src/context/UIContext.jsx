import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'booking', 'login', 'share', etc.

  const toggleChat = () => setIsChatOpen((prev) => !prev);
  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <UIContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        activeModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);

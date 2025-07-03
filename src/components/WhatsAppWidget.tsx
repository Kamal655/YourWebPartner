
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const phoneNumber = "916300371553"; // Your WhatsApp number
  const message = "Hi! I'm interested in your web development services. Can you help me?";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group flex items-center space-x-2"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:inline-block text-sm font-medium pr-2 animate-fade-in">
          WhatsApp
        </span>
      </button>
    </div>
  );
};

export default WhatsAppWidget;

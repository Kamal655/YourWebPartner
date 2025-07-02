
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone, Mail } from 'lucide-react';

const EnhancedChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm here to help you with your web development needs. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Tell me about your services",
    "I need a website quote",
    "How long does it take?",
    "What's your pricing?",
    "Schedule a consultation"
  ];

  const botResponses = {
    "services": "We offer Web Design, Web Development, UI/UX Design, and SEO Optimization. Which service interests you most?",
    "quote": "I'd be happy to help you get a quote! Could you tell me what type of website you're looking for?",
    "time": "Project timelines vary: Basic websites take 1-2 weeks, Professional sites 2-4 weeks, and Enterprise solutions 4-8 weeks.",
    "pricing": "Our packages start from ₹15,000 for basic websites. Check our pricing section for detailed packages!",
    "consultation": "Great! You can schedule a free consultation by clicking 'Get Started' on our pricing section or contacting us directly.",
    "default": "Thanks for your message! For detailed assistance, please contact us at yourwebpartner1@gmail.com or +91 6300371553."
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('service')) return botResponses.services;
    if (lowerMessage.includes('quote') || lowerMessage.includes('price')) return botResponses.quote;
    if (lowerMessage.includes('time') || lowerMessage.includes('how long')) return botResponses.time;
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost')) return botResponses.pricing;
    if (lowerMessage.includes('consultation') || lowerMessage.includes('schedule')) return botResponses.consultation;
    return botResponses.default;
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'rotate-180' : ''}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">YourWebPartner</h4>
                <p className="text-sm text-blue-100">Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${message.isBot ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`px-3 py-2 rounded-2xl ${message.isBot ? 'bg-gray-100 text-gray-900' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Contact Options */}
            <div className="flex justify-center space-x-4 mt-3 pt-3 border-t border-gray-100">
              <a
                href="tel:+916300371553"
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
              <a
                href="mailto:yourwebpartner1@gmail.com"
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedChatWidget;

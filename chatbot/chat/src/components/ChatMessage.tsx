import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? <Bot size={20} className="animate-bounce" /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">{isBot ? 'CDP Assistant' : 'You'}</div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">{message.content}</div>
      </div>
    </div>
  );
}

import React from 'react';
import { Message, Role } from '../types';
import { UserIcon, BotIcon } from './Icons';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${isUser ? 'ml-3 bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'mr-3 bg-slate-800 border border-slate-700'}`}>
          {isUser ? <UserIcon className="w-5 h-5 text-white" /> : <BotIcon className="w-5 h-5 text-indigo-400" />}
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none shadow-sm'
          }`}>
            {message.content}
            {message.isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
            )}
          </div>
          <span className="text-[10px] text-slate-500 mt-1.5 px-1 font-medium tracking-wide uppercase">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

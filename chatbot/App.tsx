
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Role, Message, ChatSession } from './types';
import { gemini } from './services/geminiService';
import { PlusIcon, SendIcon, TrashIcon, MenuIcon, BotIcon } from './components/Icons';
import ChatBubble from './components/ChatBubble';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('skillbridge-ai-sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      const revived = parsed.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        messages: s.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
      }));
      setSessions(revived);
      if (revived.length > 0) setCurrentSessionId(revived[0].id);
    } else {
      createNewSession();
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('skillbridge-ai-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sessions, currentSessionId, isTyping]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'Problem Solution',
      messages: [],
      createdAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setIsSidebarOpen(false);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (currentSessionId === id) {
      if (newSessions.length > 0) {
        setCurrentSessionId(newSessions[0].id);
      } else {
        createNewSession();
      }
    }
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const handleSend = async () => {
    if (!inputValue.trim() || !currentSessionId || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: Role.USER,
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setInputValue('');
    setIsTyping(true);

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        const title = s.messages.length === 0 ? userMessage.content.slice(0, 40) : s.title;
        return { ...s, title, messages: [...s.messages, userMessage] };
      }
      return s;
    }));

    const botMessageId = crypto.randomUUID();
    let accumulatedContent = '';

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          messages: [...s.messages, {
            id: botMessageId,
            role: Role.MODEL,
            content: '',
            timestamp: new Date(),
            isStreaming: true
          }]
        };
      }
      return s;
    }));

    try {
      const history = currentSession?.messages ? [...currentSession.messages, userMessage] : [userMessage];
      const stream = gemini.streamChat(history);

      for await (const chunk of stream) {
        accumulatedContent += chunk;
        setSessions(prev => prev.map(s => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: s.messages.map(m =>
                m.id === botMessageId ? { ...m, content: accumulatedContent } : m
              )
            };
          }
          return s;
        }));
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || 'Error: Could not reach SkillBridge intelligence services.';
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: s.messages.map(m =>
              m.id === botMessageId ? { ...m, content: errorMessage, isStreaming: false } : m
            )
          };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: s.messages.map(m =>
              m.id === botMessageId ? { ...m, isStreaming: false } : m
            )
          };
        }
        return s;
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-80 glass-panel border-r border-slate-800/50 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="font-bold text-lg text-white">S</span>
              </div>
              <h1 className="font-bold text-xl tracking-tight">SkillBridge <span className="text-xs text-indigo-400 font-medium ml-1">AI</span></h1>
            </div>
          </div>

          <button
            onClick={createNewSession}
            className="flex items-center justify-center w-full space-x-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all rounded-xl font-medium mb-6 shadow-xl shadow-indigo-500/20"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Explanation</span>
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 -mx-2 px-2">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Solved Topics</h2>
            {sessions.map(session => (
              <div
                key={session.id}
                onClick={() => {
                  setCurrentSessionId(session.id);
                  setIsSidebarOpen(false);
                }}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${currentSessionId === session.id
                    ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-100'
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'
                  }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className={`w-1.5 h-1.5 rounded-full ${currentSessionId === session.id ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                  <span className="text-sm font-medium truncate">{session.title}</span>
                </div>
                <button
                  onClick={(e) => deleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 px-2">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-2">BRIDGE ENGINE</p>
              <p className="text-xs font-semibold text-slate-300 flex items-center">
                v3.0 Problem-Solver <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative min-w-0">
        <header className="h-16 flex items-center justify-between px-6 lg:px-10 glass-panel border-b border-slate-800/50 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:block h-2 w-2 rounded-full bg-indigo-500"></div>
            <h2 className="font-semibold text-sm tracking-wide text-slate-200 uppercase">
              {currentSession?.title || 'Solving Workspace'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/20">SkillBridge Connected</span>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 pb-32"
        >
          {currentSession?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-8 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center mb-4">
                  <BotIcon className="w-10 h-10 text-indigo-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Need an explanation?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Welcome to SkillBridgeAI. I'm here to solve any problem you encounter. Describe your issue or paste your problem statement below.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  "Explain how this module works",
                  "I'm stuck on Step 3 of the project",
                  "Can you simplify this concept?",
                  "Debug this error for me"
                ].map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => setInputValue(prompt)}
                    className="p-4 text-left text-sm bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all text-slate-300 hover:text-white group"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {currentSession?.messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && !currentSession?.messages[currentSession.messages.length - 1]?.isStreaming && (
                <div className="flex justify-start items-center space-x-2 p-4 text-slate-500 text-xs animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span>SkillBridgeAI is analyzing...</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="relative glass-panel rounded-3xl border border-slate-700/50 shadow-2xl p-1.5 group focus-within:border-indigo-500/50 transition-all">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask SkillBridgeAI a problem..."
                className="w-full bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-500 py-3 pl-4 pr-16 text-sm resize-none custom-scrollbar min-h-[52px] max-h-48"
                rows={1}
                style={{ height: 'auto' }}
              />
              <div className="absolute right-2.5 bottom-2.5 flex items-center space-x-2">
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${inputValue.trim() && !isTyping
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 hover:scale-105 hover:bg-indigo-500'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-600 mt-4 tracking-wide font-medium">
              Bridging the gap between problems and understanding.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

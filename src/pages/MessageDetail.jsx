import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal, Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Try to get data from navigation state, otherwise fallback (in a real app, fetch by ID)
  const messageData = location.state || {
    name: '未知用户',
    avatar: '👤',
    bg: 'bg-slate-100',
    type: 'chat'
  };

  // Mock chat history
  const chatHistory = [
    { id: 1, sender: 'agent', text: '你好！我是您的智能助手，请问有什么可以帮您？', time: '10:00' },
    { id: 2, sender: 'user', text: '我想了解一下黄果树瀑布的门票价格。', time: '10:05' },
    { id: 3, sender: 'agent', text: '黄果树瀑布景区的旺季门票为160元/人，淡季为150元/人。建议您提前在小程序预约哦。', time: '10:06' },
    { id: 4, sender: 'agent', text: messageData.content || '最新消息内容在此...', time: '10:30' }
  ];

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col relative z-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 active:bg-slate-200"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-slate-800">{messageData.name}</h1>
            <span className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                在线
            </span>
        </div>

        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="text-center text-xs text-slate-400 my-4">今天 10:00</div>
        
        {chatHistory.map((msg) => (
            <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'agent' && (
                        <div className={`w-8 h-8 rounded-full ${messageData.bg} flex items-center justify-center text-sm shadow-sm shrink-0`}>
                            {messageData.avatar}
                        </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.sender === 'user' 
                            ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white rounded-br-none' 
                            : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 pb-8">
        <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600">
                <Mic size={24} />
            </button>
            <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 flex items-center">
                <input 
                    type="text" 
                    placeholder="发消息..." 
                    className="flex-1 bg-transparent outline-none text-sm text-slate-700"
                />
            </div>
            <button className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
                <Send size={18} className="ml-0.5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, CheckCircle, MessageSquare, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'system'

  // Mock Data
  const messages = [
    {
      id: 1,
      type: 'chat',
      avatar: '🌊',
      name: '黄果树景区智能体',
      content: '您关注的景区明日有雨，建议携带雨具。',
      time: '10:30',
      unread: 2,
      bg: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'chat',
      avatar: '🛏️',
      name: '亚朵酒店智能体',
      content: '您的房间已准备好，欢迎入住。',
      time: '昨天',
      unread: 0,
      bg: 'bg-orange-100'
    },
    {
      id: 3,
      type: 'system',
      avatar: '🔔',
      name: '系统通知',
      content: '您的实名认证已通过。',
      time: '12:00',
      unread: 1,
      bg: 'bg-slate-100'
    },
    {
      id: 4,
      type: 'system',
      avatar: '🎁',
      name: '活动提醒',
      content: '您获得了一张新的优惠券，快去查看吧！',
      time: '周一',
      unread: 0,
      bg: 'bg-pink-100'
    },
    {
      id: 5,
      type: 'chat',
      avatar: '🍲',
      name: '老凯俚酸汤鱼',
      content: '您预订的晚餐位置已保留。',
      time: '周一',
      unread: 0,
      bg: 'bg-yellow-100'
    }
  ];

  const filteredMessages = messages.filter(msg => 
    activeTab === 'chat' ? msg.type === 'chat' : msg.type === 'system'
  );

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide pb-24 px-6 pt-12 bg-slate-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">消息中心</h1>
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full shadow-sm text-slate-500">
                <CheckCircle size={20} />
            </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
        <TabButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
          label="对话消息"
          count={messages.filter(m => m.type === 'chat' && m.unread).reduce((a, b) => a + b.unread, 0)}
        />
        <TabButton 
          active={activeTab === 'system'} 
          onClick={() => setActiveTab('system')} 
          label="系统通知"
          count={messages.filter(m => m.type === 'system' && m.unread).reduce((a, b) => a + b.unread, 0)}
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-slate-100 mb-6">
        <Search size={18} className="text-slate-400 ml-1" />
        <input type="text" placeholder="搜索消息..." className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400" />
      </div>

      {/* Message List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
            {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                    <MessageItem 
                        key={msg.id}
                        {...msg}
                        onClick={() => navigate(`/message/${msg.id}`, { state: msg })}
                    />
                ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-slate-400"
                >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageSquare size={24} />
                    </div>
                    <p className="text-sm">暂无消息</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, count }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all relative ${
      active ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
    {count > 0 && (
      <span className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full" />
    )}
  </button>
);

const MessageItem = ({ avatar, name, content, time, unread, bg, onClick }) => (
  <motion.button 
    layout
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-98 transition-transform text-left"
  >
    <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center text-xl shadow-inner shrink-0`}>
      {avatar}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="font-bold text-slate-800 text-sm truncate pr-2">{name}</h3>
        <span className="text-[10px] text-slate-400 shrink-0">{time}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">{content}</p>
    </div>
    {unread > 0 && (
      <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-red-200">
        {unread}
      </div>
    )}
  </motion.button>
);

export default Message;

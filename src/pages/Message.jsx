import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, CheckCircle } from 'lucide-react';

const Message = () => {
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide pb-24 px-6 pt-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">消息<br/>中心</h1>
        <button className="w-10 h-10 bg-white rounded-blob-2 shadow-sm border border-white/60 flex items-center justify-center text-slate-500 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </header>

      {/* Search */}
      <div className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-slate-100 mb-8">
        <Search size={18} className="text-slate-400 ml-1" />
        <input type="text" placeholder="搜索消息..." className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400" />
      </div>

      {/* Message List */}
      <div className="space-y-4">
        <MessageItem 
          avatar="🌊" 
          name="黄果树景区智能体" 
          content="您关注的景区明日有雨，建议携带雨具。" 
          time="10:30" 
          unread={2} 
          bg="bg-blue-100"
        />
        <MessageItem 
          avatar="🛏️" 
          name="亚朵酒店智能体" 
          content="您的房间已准备好，欢迎入住。" 
          time="昨天" 
          bg="bg-orange-100"
        />
        <MessageItem 
          avatar="🇨🇳" 
          name="贵州省文旅厅" 
          content="欢迎来到多彩贵州！如有问题请随时咨询。" 
          time="周一" 
          bg="bg-red-100"
        />
        <MessageItem 
          avatar="🍲" 
          name="老凯俚酸汤鱼" 
          content="您预订的晚餐位置已保留。" 
          time="周一" 
          bg="bg-yellow-100"
        />
      </div>
    </div>
  );
};

const MessageItem = ({ avatar, name, content, time, unread, bg }) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm active:bg-white transition-colors"
  >
    <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center text-xl shadow-inner`}>
      {avatar}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="font-bold text-slate-800 text-sm truncate">{name}</h3>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">{content}</p>
    </div>
    {unread && (
      <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center">
        {unread}
      </div>
    )}
  </motion.div>
);

export default Message;

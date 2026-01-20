import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CreditCard, Heart, Shield, LogOut, ChevronRight, User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide pb-24 px-6 pt-12">
      {/* Header */}
      <header className="flex justify-end mb-4">
        <button className="p-2 text-slate-400 hover:text-slate-600">
          <Settings size={20} />
        </button>
      </header>

      {/* Profile Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-float border border-slate-100 relative overflow-hidden mb-8 text-center">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-50 to-transparent" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full p-1 mb-4 shadow-lg">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
               <User size={40} className="text-slate-300" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1">旅行者</h1>
          <p className="text-sm text-slate-400 mb-6">ID: 8829103</p>

          <div className="flex justify-center gap-8">
            <Stat label="收藏" value="12" />
            <Stat label="足迹" value="5" />
            <Stat label="积分" value="850" />
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        <MenuItem icon={CreditCard} label="我的钱包" />
        <MenuItem icon={Heart} label="心愿单" />
        <MenuItem icon={Shield} label="隐私与安全" />
        <MenuItem icon={LogOut} label="退出登录" color="text-red-500" />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-lg font-bold text-slate-800">{value}</div>
    <div className="text-xs text-slate-400">{label}</div>
  </div>
);

const MenuItem = ({ icon: Icon, label, color = "text-slate-700" }) => (
  <motion.button 
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm">
        <Icon size={18} />
      </div>
      <span className={`font-medium ${color}`}>{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </motion.button>
);

export default Profile;

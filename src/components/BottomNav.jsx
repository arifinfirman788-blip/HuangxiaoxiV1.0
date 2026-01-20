import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, ShoppingBag, User, Plus, X, Users, Link, ScanLine, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="absolute bottom-6 left-4 right-4 z-40">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl px-2 py-3 flex justify-around items-center relative">
          <NavIcon 
            icon={Home} 
            label="首页" 
            active={isActive('/')} 
            onClick={() => {
              navigate('/');
              setIsMenuOpen(false);
            }} 
          />
          <NavIcon 
            icon={Map} 
            label="行程" 
            active={isActive('/trip')} 
            onClick={() => {
              navigate('/trip');
              setIsMenuOpen(false);
            }} 
          />
          
          {/* Central Plus Button */}
          <div className="relative -top-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-50 transition-colors ${isMenuOpen ? 'bg-slate-800 text-white' : 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-white'}`}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Plus size={28} strokeWidth={2.5} />
              </motion.div>
            </motion.button>
          </div>

          <NavIcon 
            icon={ShoppingBag} 
            label="优选" 
            active={isActive('/shop')} 
            onClick={() => {
              navigate('/shop');
              setIsMenuOpen(false);
            }} 
          />
          <NavIcon 
            icon={User} 
            label="我的" 
            active={isActive('/profile')} 
            onClick={() => {
              navigate('/profile');
              setIsMenuOpen(false);
            }} 
          />
        </div>
      </div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-md flex flex-col justify-end pb-32 px-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
              <MenuOption 
                title="创建新行程" 
                subtitle="召唤智能行程规划师，为您定制规划"
                icon={Sparkles}
                gradient="bg-gradient-to-r from-violet-500 to-fuchsia-600"
                textColor="text-white"
                subtitleColor="text-white/80"
                delay={0.1}
              />
              <MenuOption 
                title="加入行程" 
                subtitle="加入好友创建的旅行，开启奇妙旅途"
                icon={Users}
                delay={0.15}
              />
              <MenuOption 
                title="智能导入地点/行程" 
                subtitle="粘贴链接、文本、上传图片进行识别"
                icon={Link}
                delay={0.2}
              />
              <MenuOption 
                title="扫码创建行程" 
                subtitle="扫描导游行程码直接加入团队行程"
                icon={ScanLine}
                delay={0.25}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MenuOption = ({ title, subtitle, icon: Icon, gradient = "bg-white", textColor = "text-slate-800", subtitleColor = "text-slate-500", delay }) => (
  <motion.button
    initial={{ y: 50, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 50, opacity: 0, scale: 0.9 }}
    transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full p-5 rounded-3xl shadow-lg text-left flex items-center justify-between ${gradient}`}
  >
    <div>
      <h3 className={`text-lg font-bold mb-1 ${textColor}`}>{title}</h3>
      <p className={`text-xs ${subtitleColor}`}>{subtitle}</p>
    </div>
    {Icon && (
      <div className={`p-2 rounded-full ${textColor === 'text-white' ? 'bg-white/20' : 'bg-slate-100'}`}>
        <Icon size={24} className={textColor === 'text-white' ? 'text-white' : 'text-slate-600'} />
      </div>
    )}
  </motion.button>
);

const NavIcon = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 gap-1 transition-all duration-300 ${active ? 'text-cyan-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-cyan-50' : 'bg-transparent'}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[10px] font-medium ${active ? 'text-cyan-600' : 'text-slate-400'}`}>
      {label}
    </span>
  </button>
);

export default BottomNav;

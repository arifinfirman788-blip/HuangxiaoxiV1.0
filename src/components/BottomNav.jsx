import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, ShoppingBag, User, Plus, X, Users, Link, ScanLine, Sparkles, FileText, Image, Upload, Check, Loader2, Plane, Utensils, Bed, Flag, MapPin, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = ({ onAdoptTrip, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Auth check helper
  const handleNav = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCreateTrip = () => {
    if (!isAuthenticated) {
        setIsMenuOpen(false);
        navigate('/login', { state: { from: { pathname: '/chat-planning' } } });
        return;
    }
    setIsMenuOpen(false);
    navigate('/chat-planning');
  };

  const handleImportTrip = () => {
    if (!isAuthenticated) {
        setIsMenuOpen(false);
        navigate('/login'); // Modal state is not preserved easily, so just login first
        return;
    }
    setIsMenuOpen(false);
    setIsImportModalOpen(true);
  };

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
            onClick={() => handleNav('/trip')} 
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
            onClick={() => handleNav('/profile')} 
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
                onClick={handleCreateTrip}
              />
              <MenuOption 
                title="智能导入地点/行程" 
                subtitle="粘贴链接、文本、上传图片进行识别"
                icon={Link}
                delay={0.2}
                onClick={handleImportTrip}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onConfirm={(data) => {
          setIsImportModalOpen(false);
          // Adopt trip immediately
          if (onAdoptTrip) {
            onAdoptTrip(data);
          }
          // Navigate to Trip page to show the result
          navigate('/trip');
        }}
      />
    </>
  );
};

const ImportModal = ({ isOpen, onClose, onConfirm }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);
  const [activeDay, setActiveDay] = useState(1);

  const handleParse = () => {
    if (!inputText && activeTab === 'text') return;
    
    setIsParsing(true);
    // Simulate parsing delay
    setTimeout(() => {
      setIsParsing(false);
      setParsedResult({
        title: "识别到的行程：黄果树瀑布2日游",
        days: 2,
        date: "05.01-05.02",
        rating: "9.8",
        distance: "120km",
        status: "upcoming",
        image: getPlaceholder(800, 400, 'Imported Trip'),
        itinerary: [
          {
            date: "05.01",
            dayLabel: "Day 1",
            tag: "自然奇观",
            // Remove icon component from state to avoid DataCloneError
            weather: { temp: "20°C", desc: "晴" }, 
            highlights: "黄果树瀑布 — 陡坡塘 — 天星桥",
            tips: "建议穿着舒适的运动鞋，注意防晒。",
            timeline: [
              {
                id: 'p-1',
                time: '09:00',
                title: '黄果树大瀑布',
                type: 'scenic',
                status: 'planned',
                image: getPlaceholder(400, 300, 'Waterfall'),
                details: {
                  name: '黄果树大瀑布',
                  desc: '亚洲第一大瀑布'
                }
              },
              {
                id: 'p-2',
                time: '14:00',
                title: '天星桥景区',
                type: 'scenic',
                status: 'planned',
                image: getPlaceholder(400, 300, 'Scenic Spot'),
                details: {
                  name: '天星桥',
                  desc: '风刀水剑刻就的万倾盆景'
                }
              }
            ]
          },
          {
            date: "05.02",
            dayLabel: "Day 2",
            tag: "返程",
            // Remove icon component from state to avoid DataCloneError
            weather: { temp: "22°C", desc: "多云" },
            highlights: "青岩古镇 — 送机",
            tips: "预留充足时间前往机场。",
            timeline: [
              {
                id: 'p-3',
                time: '10:00',
                title: '青岩古镇',
                type: 'scenic',
                status: 'planned',
                image: getPlaceholder(400, 300, 'Ancient Town'),
                details: {
                  name: '青岩古镇',
                  desc: '四大古镇之一'
                }
              },
              {
                id: 'p-4',
                time: '15:00',
                title: '送机服务',
                type: 'transport',
                status: 'planned',
                details: {
                  name: '前往机场',
                  desc: '结束愉快旅程'
                }
              }
            ]
          }
        ]
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          {/* Modal Content - Mobile Bottom Sheet Style */}
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) {
                onClose();
              }
            }}
            className={`bg-white w-full rounded-t-[2rem] pointer-events-auto relative overflow-hidden flex flex-col transition-all duration-500 ease-in-out shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] z-50 ${parsedResult ? 'h-[85vh]' : 'h-auto pb-8'}`}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing bg-white z-10" onClick={(e) => e.stopPropagation()}>
               <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>

            {!parsedResult ? (
              <div className="p-6 pt-2 pb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-6">智能导入行程</h2>
                
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button 
                    onClick={() => setActiveTab('text')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'text' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                  >
                    <FileText size={14} /> 文本/链接
                  </button>
                  <button 
                    onClick={() => setActiveTab('file')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'file' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                  >
                    <Image size={14} /> 图片/文件
                  </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[200px] mb-6">
                  {activeTab === 'text' ? (
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="请粘贴您的行程文本、攻略链接..."
                      className="w-full h-48 bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none border border-slate-100"
                    />
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 gap-3 text-slate-400">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <Upload size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-500">点击上传图片或文件</p>
                        <p className="text-[10px] mt-1">支持 JPG, PNG, PDF, DOCX</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button 
                  onClick={handleParse}
                  disabled={isParsing || (activeTab === 'text' && !inputText)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isParsing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> 正在智能识别...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-yellow-400" /> 开始识别
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Result Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-800">确认行程信息</h2>
                    <button onClick={() => setParsedResult(null)} className="text-xs text-slate-400 font-bold">重新识别</button>
                  </div>
                  
                  <div className="mb-4">
                    <input 
                      type="text" 
                      value={parsedResult.title}
                      onChange={(e) => setParsedResult({...parsedResult, title: e.target.value})}
                      className="w-full bg-slate-50 p-3 rounded-xl text-lg font-bold text-slate-800 border-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  {/* Days Tabs */}
                  <div className="flex border-b border-slate-100 mb-4">
                    {parsedResult.itinerary.map((day, idx) => {
                      const dayNum = idx + 1;
                      return (
                        <button
                          key={dayNum}
                          onClick={() => setActiveDay(dayNum)}
                          className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeDay === dayNum ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          DAY {dayNum}
                          {activeDay === dayNum && (
                            <motion.div 
                              layoutId="activeDayTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Itinerary List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                  {parsedResult.itinerary.map((day, idx) => (
                    activeDay === idx + 1 && (
                      <div key={idx} className="space-y-6 relative">
                         {/* Day Info */}
                         <div className="flex items-center gap-2 mb-4">
                           <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{day.date}</span>
                           <span className="text-xs font-bold text-slate-500">{day.tag}</span>
                           <div className="flex items-center gap-1 ml-auto text-xs text-slate-500">
                             <span>{day.weather.desc}</span>
                             <span>{day.weather.temp}</span>
                           </div>
                         </div>

                        <div className="absolute top-8 bottom-0 left-[7px] w-0.5 bg-slate-100" />
                        {day.timeline.map((item) => (
                          <TimelineItem 
                            key={item.id}
                            time={item.time}
                            icon={
                              item.type === 'flight' || item.type === 'transport' ? <Plane size={14} className="text-white" /> :
                              item.type === 'food' ? <Utensils size={14} className="text-white" /> :
                              item.type === 'hotel' ? <Bed size={14} className="text-white" /> :
                              <Flag size={14} className="text-white" />
                            }
                            iconBg={
                              item.type === 'flight' || item.type === 'transport' ? "bg-blue-500" :
                              item.type === 'food' ? "bg-orange-400" :
                              item.type === 'hotel' ? "bg-purple-500" :
                              "bg-green-500"
                            }
                            title={item.title}
                          >
                            <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                               {item.details.desc || item.details.name}
                               {item.image && (
                                  <div className="mt-2 w-full h-24 rounded-lg overflow-hidden">
                                     <img src={item.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                               )}
                            </div>
                          </TimelineItem>
                        ))}
                      </div>
                    )
                  ))}
                </div>

                {/* Confirm Button */}
                <div className="p-6 pt-4 border-t border-slate-100 bg-white">
                  <button 
                    onClick={() => onConfirm(parsedResult)}
                    className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-transform"
                  >
                    <Check size={16} /> 确认并生成行程
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TimelineItem = ({ time, icon, iconBg, title, children }) => (
  <div className="relative pl-8">
    <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${iconBg} flex items-center justify-center shadow-sm z-10`}>
      {icon}
    </div>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-bold text-slate-800">{time}</span>
      <span className="px-1.5 py-0.5 bg-cyan-50 text-cyan-600 text-[10px] font-bold rounded-md">{title}</span>
    </div>
    {children}
  </div>
);

const MenuOption = ({ title, subtitle, icon: Icon, gradient = "bg-white", textColor = "text-slate-800", subtitleColor = "text-slate-500", delay, onClick }) => (
  <motion.button
    initial={{ y: 50, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 50, opacity: 0, scale: 0.9 }}
    transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
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

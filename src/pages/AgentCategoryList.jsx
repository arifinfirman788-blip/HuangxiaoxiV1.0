import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, MoreHorizontal, Star, Landmark, Building, Coffee, User, Home as HomeIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { categories, agents } from '../data/agents';

// Fix Leaflet marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const iconMap = {
  Landmark: Landmark,
  Building: Building,
  Coffee: Coffee,
  User: User,
  Home: HomeIcon
};

const AgentCategoryList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('全部');

  const category = categories[id];
  const allCategoryAgents = agents.filter(a => a.category === id);

  // Extract unique skills for filter chips
  const commonSkills = Array.from(new Set(allCategoryAgents.flatMap(a => a.skills))).slice(0, 5);
  
  const filterOptions = ['全部', '在线', ...commonSkills];

  const filteredAgents = allCategoryAgents.filter(agent => {
    if (activeFilter === '全部') return true;
    if (activeFilter === '在线') return agent.status === 'online';
    return agent.skills.includes(activeFilter);
  });

  if (!category) return <div>Category not found</div>;

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 relative z-20">
      {/* Header - Floating over map */}
      <header className="absolute top-0 left-0 right-0 z-[400] px-4 py-4 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full shadow-sm pointer-events-auto cursor-pointer hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        
        {/* Dynamic Title hidden when using switcher, or kept for context */}
        {/* <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm pointer-events-auto">
           <h1 className="text-sm font-bold text-slate-800">{category.name}</h1>
        </div> */}
        <div className="w-10" /> {/* Spacer */}
        
        <button className="w-10 h-10 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full shadow-sm pointer-events-auto hover:bg-white transition-colors">
          <MoreHorizontal size={20} className="text-slate-800" />
        </button>
      </header>

      {/* Top Half: Map Section */}
      <div className="h-[45vh] w-full relative z-0">
         <MapContainer 
           center={[26.6, 106.6]} 
           zoom={7} 
           scrollWheelZoom={true} 
           className="h-full w-full z-0" 
           zoomControl={false}
         >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredAgents.map(agent => (
              <Marker key={agent.id} position={agent.location}>
                <Popup className="custom-popup" closeButton={false}>
                   <div className="p-1 min-w-[140px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-lg shrink-0">
                           {agent.avatar}
                        </div>
                        <div className="min-w-0">
                           <h3 className="font-bold text-slate-800 text-sm truncate">{agent.name}</h3>
                           <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                              <span className="text-[10px] text-slate-500">{agent.status === 'online' ? '在线' : '离线'}</span>
                           </div>
                        </div>
                      </div>
                      <button className="w-full bg-slate-900 text-white text-xs py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors">
                         <MessageCircle size={12} /> 立即对话
                      </button>
                   </div>
                </Popup>
              </Marker>
            ))}
         </MapContainer>
         
         {/* Gradient Overlay for seamless blend */}
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[400]" />
      </div>

      {/* Bottom Half: List Panel */}
      <div className="flex-1 bg-slate-50 -mt-6 rounded-t-[2rem] relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col border-t border-white/60">
        
        {/* Drag Handle Area */}
        <div className="w-full bg-slate-50 pt-3 pb-2 flex justify-center sticky top-0 z-20 shrink-0">
           <div className="w-10 h-1 bg-slate-300/50 rounded-full" />
        </div>

        {/* Category Switcher - NEW */}
        <div className="px-4 pb-4 bg-slate-50 pt-1 shrink-0">
           <div className="flex justify-between items-center px-2">
             {Object.values(categories).map((cat) => {
                const Icon = iconMap[cat.icon];
                const isActive = cat.id === id;
                return (
                  <button 
                    key={cat.id}
                    onClick={() => {
                        if (!isActive) {
                            setActiveFilter('全部');
                            navigate(`/category/${cat.id}`);
                        }
                    }}
                    className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                  >
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${isActive ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-500 border border-slate-100'}`}>
                        <Icon size={20} />
                     </div>
                     <span className={`text-[10px] font-bold ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                        {cat.name.replace('智能体', '')}
                     </span>
                  </button>
                );
             })}
           </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-200/50 mx-6 mb-3 shrink-0" />

        {/* Filters */}
        <div className="px-4 pb-3 sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === option 
                  ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-28 scrollbar-hide">
          <div className="space-y-3">
             <AnimatePresence mode="popLayout">
               {filteredAgents.map((agent, index) => (
                  <motion.div 
                    key={agent.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-3 group active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:bg-cyan-50 transition-colors">
                      {agent.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="font-bold text-slate-800 text-sm truncate pr-2">{agent.name}</h3>
                        <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">
                           <Star size={10} className="text-yellow-500 fill-yellow-500" />
                           <span className="text-[10px] font-bold text-yellow-700">4.9</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-400 mb-2 line-clamp-1">{agent.intro}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                         <div className="flex gap-1 overflow-hidden">
                            {agent.skills.slice(0, 2).map(skill => (
                              <span key={skill} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                                {skill}
                              </span>
                            ))}
                         </div>
                         <button className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-cyan-500 hover:scale-105 transition-all">
                            <MessageCircle size={14} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
               ))}
             </AnimatePresence>
             {filteredAgents.length === 0 && (
                <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <Star size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm">没有找到匹配的智能体</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCategoryList;

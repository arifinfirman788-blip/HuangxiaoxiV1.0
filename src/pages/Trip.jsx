import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Users, Clock, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Trip = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'may', label: '5.1-5.3' },
    { id: 'jun', label: '6.15-6.18' },
    { id: 'aug', label: '8.10-8.15' },
  ];

  const myTrips = [
    {
      id: 1,
      title: "梵净山：天空之城",
      date: "5.1-5.3",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      days: 3,
      distance: "5km",
      rating: "9.8",
      status: "upcoming"
    },
    {
      id: 2,
      title: "遵义红色之旅",
      date: "6.15-6.18",
      image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      days: 4,
      distance: "120km",
      rating: "9.5",
      status: "planned"
    }
  ];

  const filteredTrips = activeTab === 'all' 
    ? myTrips 
    : myTrips.filter(t => activeTab === 'may' ? t.date === '5.1-5.3' : activeTab === 'jun' ? t.date === '6.15-6.18' : false);

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide pb-24 px-6 pt-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-tight">精选线路</h1>
        <p className="text-sm text-slate-500 font-medium mt-1 tracking-wide">EXPLORE GUIZHOU</p>
      </header>

      {/* Featured Routes (Horizontal Scroll) */}
      <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 mb-10 flex gap-4">
        <HorizontalTripCard 
          country="中国·贵州"
          title="黄果树瀑布深度游"
          date="05/01 - 05/03"
          users={['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60']}
          extraUsers={22}
          bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          icon="🌊"
        />
        <HorizontalTripCard 
          country="中国·贵州"
          title="西江千户苗寨"
          date="05/04 - 05/06"
          users={['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60']}
          extraUsers={15}
          bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          icon="🏮"
        />
      </div>

      {/* My Trips Section */}
      <section>
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800 whitespace-nowrap mr-4">我的行程</h2>
          {/* Date Tabs */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide w-full pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#052216] text-white shadow-lg scale-105' : 'bg-white text-slate-800 border border-slate-100'}`}
              >
                <Calendar size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-40'} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trip List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </AnimatePresence>
          {filteredTrips.length === 0 && (
            <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-3xl border border-slate-100">
              <Calendar size={48} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">该时段暂无行程</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const HorizontalTripCard = ({ country, title, date, users, extraUsers, bgImage, icon }) => (
  <div className="flex-shrink-0 w-[85%] h-64 rounded-[2.5rem] p-6 text-white relative overflow-hidden group">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={bgImage} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
    </div>

    <div className="absolute top-0 right-0 p-6 z-10">
       <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
         <ArrowUpRight size={16} />
       </button>
    </div>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-4 h-3 bg-cyan-500 rounded-sm" /> 
           <span className="text-[10px] font-bold tracking-widest uppercase opacity-90 text-shadow">{country}</span>
        </div>
        <h3 className="text-2xl font-bold leading-tight mb-2 text-shadow-sm">{title}</h3>
        <div className="flex items-center gap-2 text-xs opacity-80 font-medium">
          <Calendar size={12} />
          <span>{date}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-3">
          {users.map((u, i) => (
            <img key={i} src={u} alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
          ))}
          <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
            +{extraUsers}
          </div>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  </div>
);

const TripCard = ({ trip }) => (
  <motion.div 
    layout
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -20, opacity: 0 }}
    className="w-full h-[320px] rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-sm"
  >
    <img 
      src={trip.image} 
      alt={trip.title} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
    
    <div className="absolute top-5 left-5">
       <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
         {trip.status === 'upcoming' ? '即将开始' : '计划中'}
       </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="mb-4">
        <h3 className="text-white text-2xl font-bold leading-tight mb-1">
          {trip.title}
        </h3>
        <p className="text-white/60 text-xs font-medium">{trip.date}</p>
      </div>
      
      <div className="flex items-center gap-4 text-white/80 text-xs font-medium">
         <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
           <Clock size={12} />
           <span>{trip.days}天</span>
         </div>
         <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
           <MapPin size={12} />
           <span>{trip.distance}</span>
         </div>
         <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
           <Users size={12} />
           <span>{trip.rating}分</span>
         </div>
      </div>
    </div>
  </motion.div>
);

export default Trip;

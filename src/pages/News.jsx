import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlaceholder } from '../utils/imageUtils';

const News = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'alerts'

  // Mock News Data
  const newsList = [
    {
      id: 1,
      title: '贵州文旅优惠季开启，百家景区半价游',
      summary: '为促进冬季旅游消费，贵州省文化和旅游厅宣布启动“冬游贵州”优惠活动，全省100多家A级景区门票半价...',
      image: getPlaceholder(800, 400, 'News 1'),
      time: '2026-01-21'
    },
    {
      id: 2,
      title: '黄果树瀑布迎来最佳观赏期',
      summary: '近期降雨充沛，黄果树瀑布水量大增，气势磅礴，吸引了大量游客前往观赏。建议游客错峰出行...',
      image: getPlaceholder(800, 400, 'Waterfall'),
      time: '2026-01-20'
    },
    {
      id: 3,
      title: '苗年非遗体验活动火热进行中',
      summary: '在雷山县西江千户苗寨，一年一度的苗年庆祝活动正在如火如荼地进行，游客可亲身体验苗族非遗文化...',
      image: getPlaceholder(800, 400, 'Culture'),
      time: '2026-01-19'
    }
  ];

  // Mock Alerts Data (matching the user's screenshot style)
  const alertsList = [
    {
      id: 1,
      area: '红花岗区',
      level: '低温凝冻黄色预警[III/较大]',
      content: '预计未来24小时我区海龙、金鼎等镇街高海拔地段气温仍将低于0℃以下并维持，并伴有冻雨或雨夹雪，部分路段有凝冻或道路结冰，对交通有一定影响，请注意防范。',
      time: '2026-01-21 09:10 发布',
      city: '遵义市'
    },
    {
      id: 2,
      area: '正安县',
      level: '大雾黄色预警[III/较大]',
      content: '预计未来12小时我县桴焉、班竹、凤仪等镇（街）部分路段仍将出现能见度小于500米的大雾天气，请注意交通安全。',
      time: '2026-01-21 01:05 发布',
      city: '遵义市'
    },
    {
      id: 3,
      area: '湄潭县',
      level: '大雾黄色预警[III/较大]',
      content: '预计未来12小时我县湄江、鱼泉、茅坪、新南等镇街部分路段将出现能见度小于500米的雨雾天气，请注意交通安全。',
      time: '2026-01-21 00:33 发布',
      city: '遵义市'
    },
    {
      id: 4,
      area: '仁怀市',
      level: '大雾黄色预警[III/较大]',
      content: '未来12小时我市苍龙、喜头、学孔、大坝、长岗、坛厂、火石、后山、中枢、盐津等乡镇（街道）及遵赤高速、仁遵高速、金仁桐高速部分路段仍将出现能见度小于500米的雨雾天气，对交通运输有一定影响，请注意防范！',
      time: '2026-01-21 00:27 发布',
      city: '遵义市'
    }
  ];

  return (
    <div className="h-full w-full bg-slate-50 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 active:bg-slate-200"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">资讯与预警</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Tabs */}
      <div className="px-6 py-4 shrink-0">
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          <TabButton 
            active={activeTab === 'news'} 
            onClick={() => setActiveTab('news')} 
            label="最新资讯"
          />
          <TabButton 
            active={activeTab === 'alerts'} 
            onClick={() => setActiveTab('alerts')} 
            label="官方预警"
            hasAlert
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'news' ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {newsList.map(item => (
                <NewsCard key={item.id} data={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-2">遵义市</h2>
              {alertsList.map(item => (
                <AlertCard key={item.id} data={item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, hasAlert }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all relative ${
      active ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
    {hasAlert && (
      <span className="absolute top-3 right-8 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
    )}
  </button>
);

const NewsCard = ({ data }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-98 transition-transform">
    <div className="h-40 w-full relative">
      <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute bottom-3 right-3 text-[10px] text-white/90 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {data.time}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-1">{data.title}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{data.summary}</p>
    </div>
  </div>
);

const AlertCard = ({ data }) => (
  <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
    <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-1">
      黄
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{data.area}</h3>
          <p className="font-bold text-slate-800 text-sm">{data.level}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">{data.time.split(' ')[0]}</p>
          <p className="text-xs text-slate-400">{data.time.split(' ')[1]} 发布</p>
        </div>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mt-2 text-justify">
        {data.content}
      </p>
    </div>
  </div>
);

export default News;

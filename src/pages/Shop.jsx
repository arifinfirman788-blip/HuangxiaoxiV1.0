import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Star, ArrowRight, Sparkles, Clock, Tag } from 'lucide-react';
import { getPlaceholder } from '../utils/imageUtils';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '甄选好物', '非遗文创', '地道美食', '精品线路'];

  const products = [
    {
      id: 1,
      image: getPlaceholder(800, 800, 'Tea Gift'),
      title: "遵义红茶特级礼盒",
      subtitle: "来自湄潭的高原茶香",
      price: "299",
      tag: "甄选",
      rating: "4.9"
    },
    {
      id: 2,
      image: getPlaceholder(800, 800, 'Silver Jewelry'),
      title: "苗族银饰手工手镯",
      subtitle: "非遗传承人纯手工打造",
      price: "599",
      tag: "非遗",
      rating: "4.8"
    },
    {
      id: 3,
      image: getPlaceholder(800, 800, 'Hotel'),
      title: "贵阳大十字亚朵酒店",
      subtitle: "城市中心的静谧居所",
      price: "450",
      tag: "酒店",
      rating: "4.7"
    },
    {
      id: 4,
      image: getPlaceholder(800, 800, 'Food'),
      title: "酸汤鱼双人套餐",
      subtitle: "地道凯里风味",
      price: "128",
      tag: "美食",
      rating: "4.6"
    }
  ];

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide bg-white pb-24">
      {/* Immersive Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100/50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-slate-900 tracking-tight">SHOP.</span>
        </div>
        <div className="flex gap-4">
          <button className="text-slate-900 hover:text-cyan-600 transition-colors">
            <Search size={22} strokeWidth={2} />
          </button>
          <button className="text-slate-900 hover:text-cyan-600 transition-colors relative">
            <ShoppingBag size={22} strokeWidth={2} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* Hero / Marketing Section */}
      <section className="px-6 pt-6 pb-8">
        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl mb-6 group cursor-pointer">
          <img 
            src={getPlaceholder(1000, 1250, 'Summer Collection')}
            alt="Summer Collection" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-cyan-400 text-black text-xs font-bold px-2 py-1 rounded-full">NEW ARRIVAL</span>
              <span className="text-white/90 text-xs font-medium tracking-wider">SUMMER 2026</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-none mb-2">黔东南<br/>村超联名款</h2>
            <p className="text-white/80 text-sm mb-6 max-w-[80%]">感受热血与文化的碰撞，限量发售中。</p>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-500 transition-colors">
              立即选购 <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Marketing Tiles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F5F5F7] rounded-[1.5rem] p-5 relative overflow-hidden h-48 group cursor-pointer">
            <div className="absolute top-0 right-0 p-4">
               <Sparkles className="text-yellow-500" size={24} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 leading-tight">黄小西<br/>甄选榜单</h3>
                <p className="text-xs text-slate-500 mt-1">本周最受欢迎</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-[1.5rem] p-5 relative overflow-hidden h-48 group cursor-pointer">
             <div className="absolute top-0 right-0 p-4">
               <Clock className="text-cyan-400" size={24} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">限时<br/>特惠专区</h3>
                <div className="flex gap-1 mt-2">
                   <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-50%</span>
                   <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">仅剩2天</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-6 py-2">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg scale-105' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-900">为您推荐</h3>
          <button className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wide">View All</button>
        </div>

        <div className="columns-2 gap-4 space-y-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="break-inside-avoid relative group cursor-pointer"
  >
    <div className="relative rounded-2xl overflow-hidden mb-3 bg-slate-100">
      <img src={product.image} alt={product.title} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-900">
        {product.tag}
      </div>
      <button className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
        <Star size={14} />
      </button>
    </div>
    
    <div>
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-slate-900 text-sm leading-tight flex-1 pr-2">{product.title}</h4>
        <span className="font-black text-slate-900 text-sm">¥{product.price}</span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-1 mb-2">{product.subtitle}</p>
      <div className="flex items-center gap-1">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill="currentColor" className={i < Math.floor(product.rating) ? "" : "text-slate-200"} />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
      </div>
    </div>
  </motion.div>
);

export default Shop;

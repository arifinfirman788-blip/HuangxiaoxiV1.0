import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Save, FileText, GitBranch } from 'lucide-react';

const defaultMindMapMarkdown = `# 📱 智游黔境 (Huang Xiaoxi V3.0) 功能脑图

## 1. 🏠 首页 (Home Page) /
- **顶部导航**
  - [按钮] 语言切换: 切换界面语言 (目前仅视觉)
  - [按钮] 消息中心: 跳转至 **消息页面**
- **资讯跑马灯**
  - [按钮] 滚动资讯: 点击跳转至 **资讯页面**
- **核心功能区**
  - [显示] 打字机欢迎语: 动态问候
  - **功能智能体入口**:
    - [按钮] 行程规划: 快速进入规划助手
    - [按钮] 帮我写游记: 快速进入写作助手
    - [按钮] AI伴游: 快速进入伴游助手
  - **对话输入框**:
    - [按钮] 角色切换: 切换智能体人设 (黄小西/酒店助手/导游等)
    - [输入] 文本输入: 提问互动
    - [按钮] 语音输入: 语音转文字 (视觉)
- **服务智能体广场**
  - [卡片] 智能体分类卡片: 瀑布流展示 (如景区向导、美食专家)。点击跳转 **分类列表页**

## 2. 📰 资讯页面 (News Page) /news
- **顶部导航**
  - [按钮] 返回: 返回上一页
  - [标题] 资讯与预警
- **内容标签页**
  - [按钮] 最新资讯: 展示图文资讯列表
  - [按钮] 官方预警: 展示预警信息列表 (带红点提醒)
- **列表内容**
  - [卡片] 资讯卡片: 图片 + 标题 + 摘要 + 时间
  - [列表] 预警条目: 预警等级图标 + 地区 + 详情 + 发布时间

## 3. 💬 消息页面 (Message Page) /message
- **顶部导航**
  - [按钮] 返回: 返回上一页
  - [标题] 消息中心
  - [按钮] 全部已读: 清除红点
- **消息标签页**
  - [按钮] 对话消息: 智能体历史对话 (带未读数)
  - [按钮] 系统通知: 系统推送 (带未读数)
- **搜索栏**
  - [输入] 搜索消息: 过滤关键词
- **消息列表**
  - [列表项] 消息卡片: 头像 + 名称 + 最新内容摘要 + 时间 + 未读气泡。点击跳转 **消息详情页**

## 4. 🗨️ 消息详情页 (Message Detail) /message/:id
- **顶部导航**
  - [按钮] 返回: 返回消息列表
  - [标题] 对方名称 + 在线状态
  - [按钮] 更多: 更多操作
- **聊天区域**
  - [显示] 消息气泡: 区分发送者 (用户右侧/智能体左侧)
- **输入区域**
  - [按钮] 语音: 语音输入
  - [输入] 文本框: 输入消息
  - [按钮] 发送: 发送消息

## 5. 🗺️ 行程页面 (Trip Page) /trip
- **顶部标题**
  - [标题] 精选线路
- **精选推荐**
  - [卡片] 横向滚动卡片: 热门路线推荐 (图片 + 标题 + 参与人数)
- **我的行程**
  - **日期筛选**:
    - [按钮] 全部 / 5.1假期 / 6.15假期等
  - **行程列表**:
    - [卡片] 行程卡片: 标题 + 日期 + 封面 + 状态 (即将开始/规划中)

## 6. 🛍️ 优选页面 (Shop Page) /shop
- **顶部导航 (吸顶)**
  - [标题] SHOP.
  - [按钮] 搜索: 搜索商品
  - [按钮] 购物车: 查看购物车 (带数量角标)
- **营销海报**
  - [卡片] 大图Banner: 促销活动入口
- **推荐榜单**
  - [卡片] 营销方块: 甄选榜单、新品推荐等
- **商品列表**
  - [卡片] 商品卡片: 图片 + 标题 + 价格 + 标签 (非遗/美食/酒店)

## 7. 👤 个人中心 (Profile Page) /profile
- **顶部导航**
  - [按钮] 设置: 进入设置页
- **智能名片**
  - **未登录态**:
    - [按钮] 立即登录: 触发登录
  - **登录态**:
    - [显示] 头像 & 昵称 & ID
    - [按钮] 编辑资料: 修改个人信息
    - [显示] 用户标签: 兴趣Tag
- **我的订单**
  - [九宫格] 订单入口: 线路 / 景区 / 酒店 / 活动 / 出行 / 零售
- **常用功能**
  - [列表] 常用证件信息
  - [列表] 协议规则
  - [列表] 客服电话
- **底部信息**
  - [显示] 备案号 & ICP号

## 8. 🧭 全局导航 (Bottom Nav)
- [按钮] 首页 (Home)
- [按钮] 行程 (Trip)
- [按钮] + (发布/创建): 唤起功能菜单 (创建行程/加入行程)
- [按钮] 优选 (Shop)
- [按钮] 我的 (Profile)

## 9. 🤖 智能体分类页 (Agent List) /category/:id
- **顶部导航 (悬浮)**
  - [按钮] 返回: 返回首页
  - [按钮] 更多: 筛选或其他
- **地图模式**
  - [地图] 交互地图: 显示智能体分布点
- **筛选栏**
  - [按钮] 筛选标签: 全部 / 在线 / 技能筛选
- **智能体列表**
  - [卡片] 智能体简介: 头像 + 名称 + 状态 + 技能标签
`;

const ProjectMindMap = ({ isOpen, onClose }) => {
  const [markdown, setMarkdown] = useState(defaultMindMapMarkdown);
  const [isEditing, setIsEditing] = useState(false);

  // Simple Markdown Parser to Tree Structure
  const parseMarkdown = (md) => {
    const lines = md.split('\n');
    const root = { title: 'Root', children: [] };
    const stack = [{ level: 0, node: root }];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      let level = 0;
      let title = '';
      let type = 'text';

      if (trimmed.startsWith('# ')) { level = 1; title = trimmed.replace('# ', ''); type = 'h1'; }
      else if (trimmed.startsWith('## ')) { level = 2; title = trimmed.replace('## ', ''); type = 'h2'; }
      else if (trimmed.startsWith('- ')) { 
        level = 3; // Base list level
        // Check indentation of original line to guess nested lists roughly
        const leadingSpaces = line.match(/^\s*/)[0].length;
        if (leadingSpaces >= 2) level = 4;
        if (leadingSpaces >= 4) level = 5;
        title = trimmed.replace('- ', ''); 
        type = 'list';
      } else {
        return; // Skip unknown lines for now
      }

      const newNode = { title, type, children: [] };

      // Find parent
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      
      const parent = stack[stack.length - 1].node;
      parent.children.push(newNode);
      stack.push({ level, node: newNode });
    });

    return root.children;
  };

  const treeData = parseMarkdown(markdown);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
              <GitBranch size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">项目功能脑图 (Functional Mind Map)</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-colors ${isEditing ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {isEditing ? <><FileText size={16} /> 预览模式</> : <><Edit2 size={16} /> 编辑源文件</>}
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {isEditing ? (
            <textarea 
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-full p-6 font-mono text-sm text-slate-700 resize-none outline-none bg-slate-50"
              spellCheck={false}
            />
          ) : (
            <div className="w-full h-full overflow-y-auto p-6 bg-slate-50/50">
              <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {treeData.map((node, index) => (
                  <MindMapNode key={index} node={node} />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const MindMapNode = ({ node }) => {
  if (node.type === 'h1') {
    return (
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 mb-4">{node.title}</h1>
        <div className="pl-4 border-l-2 border-slate-200 space-y-2">
          {node.children.map((child, i) => <MindMapNode key={i} node={child} />)}
        </div>
      </div>
    );
  }

  if (node.type === 'h2') {
    return (
      <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-cyan-500 rounded-full inline-block"></span>
          {node.title}
        </h2>
        <div className="space-y-1">
          {node.children.map((child, i) => <MindMapNode key={i} node={child} />)}
        </div>
      </div>
    );
  }

  // List Items
  return (
    <div className="ml-4 relative">
      <div className="flex items-start gap-3 py-1">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
        <div className="flex-1">
          <p className="text-sm text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ 
            __html: node.title
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\[(.*?)\]/g, '<span class="text-xs font-bold text-white bg-slate-400 px-1.5 py-0.5 rounded mr-1">$1</span>') 
          }} />
          {node.children.length > 0 && (
            <div className="mt-1 border-l border-slate-200 pl-4 space-y-1">
              {node.children.map((child, i) => <MindMapNode key={i} node={child} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectMindMap;

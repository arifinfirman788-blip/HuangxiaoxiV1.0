import { getPlaceholder } from '../utils/imageUtils';

export const categories = {
  scenic: {
    id: 'scenic',
    name: '景区智能体',
    icon: 'Landmark',
    description: '山水风光，智慧导览',
    image: getPlaceholder(800, 800, 'Scenic Agent'), // Travel/Scenic
  },
  hotel: {
    id: 'hotel',
    name: '酒店智能体',
    icon: 'Building',
    description: '舒适住宿，贴心服务',
    image: getPlaceholder(800, 800, 'Hotel Agent'), // Hotel
  },
  dining: {
    id: 'dining',
    name: '餐饮智能体',
    icon: 'Coffee',
    description: '地道美食，寻味贵州',
    image: getPlaceholder(800, 800, 'Dining Agent'), // Food
  },
  gov: {
    id: 'gov',
    name: '政府智能体',
    icon: 'User',
    description: '便民服务，即刻响应',
    image: getPlaceholder(800, 800, 'Gov Agent'), // Modern Building/Service
  },
  living: {
    id: 'living',
    name: '旅居智能体',
    icon: 'Home',
    description: '诗意栖居，深度体验',
    image: getPlaceholder(800, 800, 'Living Agent'), // Cabin/Living
  }
};

export const agents = [
  // 景区
  {
    id: 'scenic-1',
    category: 'scenic',
    name: '黄果树瀑布智能体',
    avatar: '🌊',
    status: 'online',
    skills: ['路线规划', '人流播报', '最佳拍摄点'],
    location: [25.9906, 105.6672],
    intro: '我是黄果树瀑布的智慧分身，今天水量充沛，建议您上午前往大瀑布。'
  },
  {
    id: 'scenic-2',
    category: 'scenic',
    name: '小七孔景区智能体',
    avatar: '🌿',
    status: 'busy',
    skills: ['景点讲解', '漂流预约', '交通指引'],
    location: [25.2667, 107.7500],
    intro: '欢迎来到地球腰带上的绿宝石，今日卧龙潭游客较多，建议错峰。'
  },
  {
    id: 'scenic-3',
    category: 'scenic',
    name: '西江千户苗寨智能体',
    avatar: '🏮',
    status: 'online',
    skills: ['民俗体验', '长桌宴预订', '夜景推荐'],
    location: [26.4944, 108.1722],
    intro: '苗年将至，今晚有大型芦笙舞表演，不要错过哦。'
  },
  // 酒店
  {
    id: 'hotel-1',
    category: 'hotel',
    name: '贵阳大十字亚朵酒店',
    avatar: '🛏️',
    status: 'online',
    skills: ['房型咨询', '延迟退房', '早餐推荐'],
    location: [26.5786, 106.7139],
    intro: '为您提供深夜暖粥，就在市中心，交通便利。'
  },
  {
    id: 'hotel-2',
    category: 'hotel',
    name: '安顺万象旅游城如家',
    avatar: '🏠',
    status: 'offline',
    skills: ['性价比高', '停车方便'],
    location: [26.2500, 105.9333],
    intro: '如家般的温暖，期待您的光临。'
  },
  // 餐饮
  {
    id: 'dining-1',
    category: 'dining',
    name: '老凯俚酸汤鱼智能体',
    avatar: '🍲',
    status: 'busy',
    skills: ['排号查询', '菜品推荐', '口味定制'],
    location: [26.5800, 106.7200],
    intro: '酸爽开胃，非遗美味，现在前面还有5桌排队。'
  },
  // 旅居 (New)
  {
    id: 'living-1',
    category: 'living',
    name: '万峰林依山民宿智能体',
    avatar: '🏡',
    status: 'online',
    skills: ['长租优惠', '周边探索', '管家服务'],
    location: [25.0333, 104.9000],
    intro: '在山水间安个家，体验最地道的布依族生活。'
  },
  // 政府 (New)
  {
    id: 'gov-0',
    category: 'gov',
    name: '贵州省文旅厅政务智能体',
    avatar: '🇨🇳',
    status: 'online',
    skills: ['政策解读', '投诉受理', '全省调度'],
    location: [26.6470, 106.6302],
    intro: '我是贵州省文旅厅智慧分身，为您提供全省旅游政务服务。'
  },
  {
    id: 'gov-1',
    category: 'gov',
    name: '贵阳市文旅局智能体',
    avatar: '🏢',
    status: 'online',
    skills: ['筑城服务', '避暑指南'],
    location: [26.5783, 106.7135],
    intro: '爽爽贵阳欢迎您，竭诚为您解决在筑旅游问题。'
  },
  {
    id: 'gov-2',
    category: 'gov',
    name: '遵义市文旅局智能体',
    avatar: '🚩',
    status: 'online',
    skills: ['红色旅游', '酱酒文化'],
    location: [27.6925, 106.9272],
    intro: '转折之城，会议之都，遵义文旅为您服务。'
  },
  {
    id: 'gov-3',
    category: 'gov',
    name: '安顺市文旅局智能体',
    avatar: '🌊',
    status: 'online',
    skills: ['瀑乡服务', '屯堡文化'],
    location: [26.2530, 105.9476],
    intro: '平安顺意，康养安顺，随时响应您的需求。'
  },
  {
    id: 'gov-4',
    category: 'gov',
    name: '六盘水市文旅局智能体',
    avatar: '❄️',
    status: 'online',
    skills: ['凉都服务', '滑雪指引'],
    location: [26.5927, 104.8303],
    intro: '中国凉都，19度的夏天，六盘水为您服务。'
  },
  {
    id: 'gov-5',
    category: 'gov',
    name: '毕节市文旅局智能体',
    avatar: '🌺',
    status: 'online',
    skills: ['花海服务', '洞天探秘'],
    location: [27.2974, 105.2917],
    intro: '洞天福地，花海毕节，期待为您排忧解难。'
  },
  {
    id: 'gov-6',
    category: 'gov',
    name: '铜仁市文旅局智能体',
    avatar: '⛰️',
    status: 'online',
    skills: ['梵天净土', '桃源服务'],
    location: [27.7172, 109.1897],
    intro: '梵天净土，桃源铜仁，智慧文旅伴您同行。'
  },
  {
    id: 'gov-7',
    category: 'gov',
    name: '黔东南州文旅局智能体',
    avatar: '🏮',
    status: 'online',
    skills: ['民族风情', '非遗体验'],
    location: [26.5833, 107.9774],
    intro: '民族原生态，锦绣黔东南，为您提供特色服务。'
  },
  {
    id: 'gov-8',
    category: 'gov',
    name: '黔南州文旅局智能体',
    avatar: '🔭',
    status: 'online',
    skills: ['天眼科普', '世遗服务'],
    location: [26.2587, 107.5186],
    intro: '山水之南，生态之州，黔南文旅为您护航。'
  },
  {
    id: 'gov-9',
    category: 'gov',
    name: '黔西南州文旅局智能体',
    avatar: '🌄',
    status: 'online',
    skills: ['山地旅游', '康养服务'],
    location: [25.0879, 104.8972],
    intro: '万峰成林，户外胜地，黔西南欢迎您。'
  }
];

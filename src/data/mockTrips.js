import { Cloud, Plane, Car, Utensils, Hotel, Camera, Info } from 'lucide-react';

export const mockTrips = [
  {
    id: 'trip-001',
    title: "贵阳市经典路线3日游",
    status: 'ongoing', // ongoing, upcoming, completed
    date: "12/11 - 12/13",
    days: 3,
    country: "中国·贵州",
    users: [],
    itinerary: [
      {
        date: "12月11日",
        dayLabel: "Day 1",
        tag: "抵达日",
        weather: { temp: "12°C - 18°C", desc: "多云转晴", icon: 'Cloud' },
        highlights: "抵达贵阳 — 特色早餐 — 文昌阁 — 甲秀楼夜景",
        tips: "为您监控到今日进港航班流量较大，建议下机后直接使用下方「一键叫车」服务。",
        timeline: [
          {
            id: 'node-1',
            time: "08:00",
            title: "航班抵达",
            type: "flight",
            status: "completed",
            tips: "建议提前2小时到达机场，凭身份证办理值机。",
            details: {
              flightNo: "CZ3685",
              dep: "北京大兴",
              arr: "龙洞堡T2",
              depTime: "06:00",
              arrTime: "08:10",
              status: "飞行中",
              desc: "预计提前10分钟抵达"
            }
          },
          {
            id: 'node-2',
            time: "14:00",
            title: "入住·贵阳大十字亚朵酒店",
            type: "hotel",
            status: "ongoing", // 当前进行中的节点
            tips: "已为您确认，酒店提供24小时管家服务。今日贵阳降温，建议向通过管家预订「暖心姜茶」送至客房。",
            agentId: 'hotel-1', // 关联 agents.js 中的 id
            details: {
              checkIn: "14:00后",
              roomType: "几木大床房",
              facilities: ["健身房", "洗衣房", "深夜粥到"],
              luggage: "提供行李寄存及运送服务",
              address: "贵阳市南明区大十字广场",
              phone: "0851-88888888"
            }
          },
          {
            id: 'node-3',
            time: "18:00",
            title: "晚餐·老凯俚酸汤鱼",
            type: "food",
            status: "upcoming",
            tips: "该店排队较多，建议使用下方「排队取号」功能提前拿号。",
            agentId: 'dining-1',
            details: {
              recommend: "招牌酸汤鱼、苗家糯米酒",
              avgPrice: "¥98/人",
              distance: "距酒店 1.2km"
            }
          }
        ]
      },
      {
        date: "12月12日",
        dayLabel: "Day 2",
        tag: "游玩日",
        weather: { temp: "10°C - 15°C", desc: "小雨", icon: 'CloudRain' },
        highlights: "黄果树瀑布一日游",
        tips: "今日有雨，建议携带雨具，瀑布水量充沛，观赏效果极佳。",
        timeline: [
            {
                id: 'node-4',
                time: "09:00",
                title: "游览·黄果树瀑布",
                type: "scenic",
                status: "upcoming",
                tips: "大瀑布景点人流较多，建议先前往天星桥景区。",
                agentId: 'scenic-1',
                details: {
                    ticket: "已预约 09:00-10:00 入园",
                    guide: "全程电子导览已开启",
                    route: "陡坡塘 -> 天星桥 -> 大瀑布"
                }
            }
        ]
      }
    ]
  }
];

// 福州景点数据
const spotsData = [
  {
    id: 1,
    name: '三坊七巷',
    description: [
      '三坊七巷是中国十大历史文化名街之一，被誉为"中国城市里坊制度活化石"和"中国明清建筑博物馆"。',
      '这里保存了大量明清古建筑，街区总面积约40公顷，由南后街、安民巷、黄巷、塔巷、杨桥巷、郎官巷、衣锦坊、光禄坊、宫巷、塔巷五坊等组成。',
      '三坊七巷是福州市的历史文化街区，也是国家5A级旅游景区，拥有众多名人故居和历史建筑。'
    ],
    rating: 4.7,
    reviewsCount: 3854,
    price: 0,
    openingHours: '全天开放',
    address: '福建省福州市鼓楼区南后街道',
    phone: '0591-83758800',
    website: 'http://www.sfqx.com/',
    coordinates: {
      lat: 26.0812,
      lng: 119.2955
    },
    tags: ['历史古迹', '文化街区', '免费景点', '网红打卡地'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐5路、11路、22路、旅游专线1号线等公交车到三坊七巷站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到茶亭站下车，从2号出口出站，步行约10分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"三坊七巷景区"，可将车辆停放在附近的停车场。'
      }
    ],
    features: [
      {
        title: '古建筑群',
        icon: 'House',
        description: '保存完好的明清建筑群，具有典型的闽南建筑特色。'
      },
      {
        title: '名人故居',
        icon: 'User',
        description: '林则徐、严复等历史名人故居，了解福州历史文化名人。'
      },
      {
        title: '特色小吃',
        icon: 'Food',
        description: '街区内有众多福州特色小吃店，如鼓楼沙县小吃、佳味小吃等。'
      }
    ],
    nearbySpots: [
      {
        id: 2,
        name: '福州西湖公园',
        distance: '1.5公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 3,
        name: '烟台山',
        distance: '2.3公里',
        rating: 4.3,
        imageUrl: '/images/spots/3.jpg'
      },
      {
        id: 4,
        name: '鼓山',
        distance: '5.8公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      }
    ]
  },
  {
    id: 2,
    name: '福州西湖公园',
    description: [
      '福州西湖公园是福州市区内最大的综合性公园，始建于1911年，总面积约42.7公顷。',
      '公园内湖光山色，景色秀丽，是福州市民休闲娱乐的重要场所。',
      '西湖公园以湖为主景，园内有"十景"，分别是"平湖秋月"、"湖心春晓"、"湖山胜概"、"曲水流觞"、"荷风送香"、"柳浪闻莺"、"梅雪争春"、"松涛迎客"、"竹韵幽情"和"菊岛秋容"。'
    ],
    rating: 4.5,
    reviewsCount: 2156,
    price: 0,
    openingHours: '06:00-22:00',
    address: '福建省福州市鼓楼区湖滨路68号',
    phone: '0591-83321813',
    website: 'http://www.fzxihu.com/',
    coordinates: {
      lat: 26.0835,
      lng: 119.2927
    },
    tags: ['公园', '湖泊', '免费景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐1路、5路、9路、16路、29路、54路、66路、72路、80路、106路、111路、115路、118路、133路、旅游专线1号线等公交车到西湖公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到西湖公园站下车，从1号出口出站即可。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州西湖公园"，可将车辆停放在公园周边的停车场。'
      }
    ],
    features: [
      {
        title: '湖泊景观',
        icon: 'Sunny',
        description: '湖面开阔，水质清澈，是欣赏湖光山色的绝佳去处。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '园内设有各类休闲设施，如亭台楼阁、游船码头等。'
      },
      {
        title: '文化活动',
        icon: 'Calendar',
        description: '经常举办各类文化活动和展览，丰富市民文化生活。'
      }
    ],
    nearbySpots: [
      {
        id: 1,
        name: '三坊七巷',
        distance: '1.5公里',
        rating: 4.7,
        imageUrl: '/images/spots/1.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '8.2公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 6,
        name: '左海公园',
        distance: '2.1公里',
        rating: 4.3,
        imageUrl: '/images/spots/6.jpg'
      }
    ]
  },
  {
    id: 3,
    name: '烟台山',
    description: [
      '烟台山是福州市区内的一座小山，海拔57米，因山顶曾设有烟墩台而得名。',
      '烟台山是福州近代对外开放的重要见证，山上保存有大量的西式建筑和历史遗迹，是中国近代史的重要组成部分。',
      '现在的烟台山已经成为福州市的重要文化旅游景点，山上有烟台山历史风貌区、福州外国语学校等。'
    ],
    rating: 4.3,
    reviewsCount: 1876,
    price: 0,
    openingHours: '全天开放',
    address: '福建省福州市鼓楼区烟台山路',
    phone: '0591-83321234',
    website: 'http://www.fzyts.org/',
    tags: ['历史古迹', '文化景点', '免费景点', '城市公园'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐9路、11路、18路、54路、66路、72路、101路、111路、116路、311路等公交车到烟台山站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到烟台山站下车，从2号出口出站，步行约5分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"烟台山公园"，可将车辆停放在山脚下的停车场。'
      }
    ],
    features: [
      {
        title: '历史建筑',
        icon: 'House',
        description: '保存有大量的西式建筑和领事馆旧址，是中西文化交流的见证。'
      },
      {
        title: '城市风光',
        icon: 'View',
        description: '山顶可俯瞰福州市区全景，是观赏城市风光的绝佳地点。'
      },
      {
        title: '文化活动',
        icon: 'Calendar',
        description: '经常举办各类文化展览和活动，展示福州近代历史文化。'
      }
    ],
    nearbySpots: [
      {
        id: 1,
        name: '三坊七巷',
        distance: '2.3公里',
        rating: 4.7,
        imageUrl: '/images/spots/1.jpg'
      },
      {
        id: 2,
        name: '福州西湖公园',
        distance: '3.5公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 6,
        name: '左海公园',
        distance: '1.8公里',
        rating: 4.3,
        imageUrl: '/images/spots/6.jpg'
      }
    ]
  },
  {
    id: 4,
    name: '鼓山',
    description: [
      '鼓山位于福州市区东北部，海拔925米，是福州市的最高峰，也是福建省著名的佛教圣地。',
      '鼓山上的涌泉寺始建于梁武帝天监年间（公元502-519年），距今已有1500多年历史，是福建省规模最大、保存最完整的古刹之一。',
      '鼓山风景区内自然风光与人文景观交相辉映，有"鼓山36奇景"之称，是福州市民登高望远、休闲娱乐的好去处。'
    ],
    rating: 4.6,
    reviewsCount: 2543,
    price: 50,
    openingHours: '07:30-17:30',
    address: '福建省福州市晋安区鼓山镇',
    phone: '0591-83845955',
    website: 'http://www.fzgs.com.cn/',
    tags: ['自然风光', '佛教圣地', '登山', '文化景点'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐旅游专线3号线、51路、70路、76路、311路等公交车到鼓山风景区站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达三叉街站，转乘51路公交车到鼓山风景区站下车。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"鼓山风景区"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '涌泉寺',
        icon: 'House',
        description: '福建省规模最大、保存最完整的古刹之一，有"闽中第一禅林"之称。'
      },
      {
        title: '自然风光',
        icon: 'Sunny',
        description: '山势雄伟，林木葱茏，有"鼓山36奇景"之称。'
      },
      {
        title: '石刻艺术',
        icon: 'Picture',
        description: '保存有大量的历代石刻，是研究中国书法艺术的重要场所。'
      }
    ],
    nearbySpots: [
      {
        id: 8,
        name: '金山寺',
        distance: '5.2公里',
        rating: 4.2,
        imageUrl: '/images/spots/8.jpg'
      },
      {
        id: 9,
        name: '福州森林公园',
        distance: '7.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      },
      {
        id: 10,
        name: '青云山',
        distance: '12.3公里',
        rating: 4.1,
        imageUrl: '/images/spots/10.jpg'
      }
    ]
  },
  {
    id: 5,
    name: '福州国家森林公园',
    description: [
      '福州国家森林公园位于福州市区北郊，总面积约860公顷，是福州市最大的森林公园。',
      '公园内森林覆盖率高达95%以上，是福州市的"绿肺"，也是市民休闲娱乐的好去处。',
      '公园内有多个景区，如百花园、竹海、樱花园、杜鹃园等，四季景色各异，是亲近自然的好地方。'
    ],
    rating: 4.4,
    reviewsCount: 1987,
    price: 30,
    openingHours: '08:00-17:30',
    address: '福建省福州市晋安区连江北路',
    phone: '0591-83845123',
    website: 'http://www.fzslgy.com/',
    tags: ['自然风光', '森林公园', '休闲娱乐', '亲子游'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐14路、70路、115路、119路、311路等公交车到森林公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州国家森林公园"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '森林景观',
        icon: 'Tree',
        description: '森林覆盖率高达95%以上，是福州市的"绿肺"。'
      },
      {
        title: '主题园区',
        icon: 'Flower',
        description: '设有百花园、竹海、樱花园、杜鹃园等多个主题园区。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '配套有餐厅、茶室、休息亭等休闲设施，满足游客需求。'
      }
    ],
    nearbySpots: [
      {
        id: 4,
        name: '鼓山',
        distance: '8.5公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      },
      {
        id: 9,
        name: '福州森林公园',
        distance: '12.3公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      },
      {
        id: 10,
        name: '青云山',
        distance: '15.6公里',
        rating: 4.1,
        imageUrl: '/images/spots/10.jpg'
      }
    ]
  },
  {
    id: 6,
    name: '左海公园',
    description: [
      '左海公园位于福州市区中心，是一个以湖泊为主的城市公园，总面积约88公顷。',
      '左海原名"瓮头埕"，因位于西湖以东，故称"左海"，是福州市民休闲娱乐的好去处。',
      '公园内有湖泊、亭台楼阁、花坛草坪等景观，环境优美，是福州市区内重要的生态景观和休闲场所。'
    ],
    rating: 4.3,
    reviewsCount: 1765,
    price: 0,
    openingHours: '全天开放',
    address: '福建省福州市鼓楼区杨桥中路',
    phone: '0591-83345678',
    website: 'http://www.fzzh.org/',
    tags: ['公园', '湖泊', '免费景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐1路、5路、9路、16路、27路、54路、66路、72路、80路、106路、111路、115路、118路等公交车到左海公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到杨桥路站下车，从2号出口出站，步行约10分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"左海公园"，可将车辆停放在公园周边的停车场。'
      }
    ],
    features: [
      {
        title: '湖泊景观',
        icon: 'Sunny',
        description: '湖面开阔，水质清澈，是欣赏湖光山色的绝佳去处。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '园内设有各类休闲设施，如亭台楼阁、健身步道等。'
      },
      {
        title: '文化活动',
        icon: 'Calendar',
        description: '经常举办各类文化活动和展览，丰富市民文化生活。'
      }
    ],
    nearbySpots: [
      {
        id: 2,
        name: '福州西湖公园',
        distance: '2.1公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 3,
        name: '烟台山',
        distance: '1.8公里',
        rating: 4.3,
        imageUrl: '/images/spots/3.jpg'
      },
      {
        id: 7,
        name: '福州文化宫',
        distance: '1.2公里',
        rating: 4.0,
        imageUrl: '/images/spots/7.jpg'
      }
    ]
  },
  {
    id: 7,
    name: '福州文化宫',
    description: [
      '福州文化宫位于福州市区中心，是一座集文化、艺术、娱乐、休闲于一体的综合性文化场所。',
      '文化宫建于1953年，是福州市最早的文化活动中心之一，经过多次改造，现已成为福州市重要的文化地标。',
      '文化宫内设有剧场、展览馆、图书馆、文化活动室等多个功能区，是市民参与文化活动的重要场所。'
    ],
    rating: 4.0,
    reviewsCount: 1235,
    price: 0,
    openingHours: '09:00-21:00',
    address: '福建省福州市鼓楼区八一七北路',
    phone: '0591-83356789',
    website: 'http://www.fzwhg.org/',
    tags: ['文化场所', '艺术展览', '免费景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐1路、2路、5路、7路、11路、20路、27路、54路、66路、72路、80路等公交车到文化宫站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到东街口站下车，从1号出口出站，步行约15分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州文化宫"，可将车辆停放在附近的停车场。'
      }
    ],
    features: [
      {
        title: '文化展览',
        icon: 'Picture',
        description: '定期举办各类文化艺术展览，展示福州传统文化和现代艺术。'
      },
      {
        title: '艺术表演',
        icon: 'Microphone',
        description: '剧场内经常举办各类文艺演出，如闽剧、歌舞表演等。'
      },
      {
        title: '文化活动',
        icon: 'Calendar',
        description: '组织各类文化活动和培训班，如书法、绘画、舞蹈等。'
      }
    ],
    nearbySpots: [
      {
        id: 1,
        name: '三坊七巷',
        distance: '1.8公里',
        rating: 4.7,
        imageUrl: '/images/spots/1.jpg'
      },
      {
        id: 6,
        name: '左海公园',
        distance: '1.2公里',
        rating: 4.3,
        imageUrl: '/images/spots/6.jpg'
      },
      {
        id: 3,
        name: '烟台山',
        distance: '2.5公里',
        rating: 4.3,
        imageUrl: '/images/spots/3.jpg'
      }
    ]
  },
  {
    id: 8,
    name: '金山寺',
    description: [
      '金山寺位于福州市晋安区鼓山镇，是福建省著名的佛教寺庙，始建于唐代，距今已有1200多年历史。',
      '金山寺依山而建，殿宇宏伟，环境幽静，是福州市重要的宗教文化遗产和旅游景点。',
      '寺内保存有大量的历代文物和佛教艺术品，如佛像、经书、石刻等，具有很高的历史和艺术价值。'
    ],
    rating: 4.2,
    reviewsCount: 1432,
    price: 20,
    openingHours: '08:00-17:00',
    address: '福建省福州市晋安区鼓山镇金山路',
    phone: '0591-83678901',
    website: 'http://www.fzjs.org/',
    tags: ['寺庙', '佛教圣地', '历史古迹', '文化景点'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐76路、311路等公交车到金山寺站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达三叉街站，转乘76路公交车到金山寺站下车。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"金山寺"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '古建筑群',
        icon: 'House',
        description: '保存完好的古代建筑群，包括大雄宝殿、天王殿、藏经阁等。'
      },
      {
        title: '佛教文化',
        icon: 'Reading',
        description: '浓厚的佛教文化氛围，是了解中国传统佛教文化的好去处。'
      },
      {
        title: '自然风光',
        icon: 'Sunny',
        description: '依山而建，环境幽静，可俯瞰福州市区风光。'
      }
    ],
    nearbySpots: [
      {
        id: 4,
        name: '鼓山',
        distance: '5.2公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '7.8公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 9,
        name: '福州森林公园',
        distance: '6.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      }
    ]
  },
  {
    id: 9,
    name: '福州森林公园',
    description: [
      '福州森林公园位于福州市晋安区，总面积约1068公顷，是福州市重要的生态公园和休闲场所。',
      '公园内森林资源丰富，植被茂密，空气清新，是市民亲近自然、休闲娱乐的好去处。',
      '公园内设有多个景区，如百花园、竹林、观景台等，还有各类休闲娱乐设施，如游乐场、餐厅等。'
    ],
    rating: 4.4,
    reviewsCount: 1876,
    price: 0,
    openingHours: '06:00-18:00',
    address: '福建省福州市晋安区岳峰镇',
    phone: '0591-83789012',
    website: 'http://www.fzslgy.com/',
    tags: ['森林公园', '自然风光', '免费景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐35路、65路、102路、116路等公交车到森林公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州森林公园"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '森林景观',
        icon: 'Tree',
        description: '森林覆盖率高，植被茂密，是城市中的"绿肺"。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '设有各类休闲设施，如健身步道、休息亭、儿童游乐场等。'
      },
      {
        title: '生态教育',
        icon: 'Reading',
        description: '设有生态教育基地，开展自然教育活动，普及生态环保知识。'
      }
    ],
    nearbySpots: [
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '8.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 8,
        name: '金山寺',
        distance: '6.5公里',
        rating: 4.2,
        imageUrl: '/images/spots/8.jpg'
      },
      {
        id: 10,
        name: '青云山',
        distance: '10.2公里',
        rating: 4.1,
        imageUrl: '/images/spots/10.jpg'
      }
    ]
  },
  {
    id: 10,
    name: '青云山',
    description: [
      '青云山位于福州市晋安区东北部，海拔约700米，是福州市区周边的一座著名山峰。',
      '青云山自然风光优美，植被茂密，山势起伏，有"小武夷"之称，是福州市民登山健身、休闲娱乐的好去处。',
      '山上有青云寺、青云亭等人文景观，还有观景台、瀑布等自然景观，景色宜人，四季各有特色。'
    ],
    rating: 4.1,
    reviewsCount: 1345,
    price: 15,
    openingHours: '07:00-18:00',
    address: '福建省福州市晋安区青云山风景区',
    phone: '0591-83890123',
    website: 'http://www.fzqys.com/',
    tags: ['自然风光', '登山', '文化景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐58路、116路、311路等公交车到青云山站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"青云山风景区"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '自然风光',
        icon: 'Sunny',
        description: '山势起伏，植被茂密，有"小武夷"之称，景色宜人。'
      },
      {
        title: '人文景观',
        icon: 'House',
        description: '山上有青云寺、青云亭等历史人文景观，文化底蕴深厚。'
      },
      {
        title: '登山健身',
        icon: 'Bicycle',
        description: '设有完善的登山步道，是登山健身、亲近自然的好去处。'
      }
    ],
    nearbySpots: [
      {
        id: 9,
        name: '福州森林公园',
        distance: '10.2公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '15.6公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 4,
        name: '鼓山',
        distance: '12.3公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      }
    ]
  },
  {
    id: 11,
    name: '福州温泉公园',
    description: [
      '福州温泉公园位于福州市晋安区鼓山脚下，是一处以温泉为主题的综合性公园，总面积约60公顷。',
      '公园内有多处温泉泉眼，水质清澈，富含多种矿物质，具有很高的医疗保健价值。',
      '除了温泉资源外，公园内还有花园、湖泊、亭台楼阁等景观，环境优美，是休闲度假的好去处。'
    ],
    rating: 4.3,
    reviewsCount: 1567,
    price: 40,
    openingHours: '09:00-22:00',
    address: '福建省福州市晋安区温泉路88号',
    phone: '0591-83901234',
    website: 'http://www.fzwqgy.com/',
    tags: ['温泉', '休闲度假', '自然风光', '健康养生'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐51路、76路、311路等公交车到温泉公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达三叉街站，转乘51路公交车到温泉公园站下车。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州温泉公园"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '温泉资源',
        icon: 'WaterCup',
        description: '拥有多处温泉泉眼，水质清澈，富含多种矿物质，具有很高的医疗保健价值。'
      },
      {
        title: '园林景观',
        icon: 'Tree',
        description: '公园内有花园、湖泊、亭台楼阁等景观，环境优美，四季如春。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '配套有餐厅、茶室、休息亭、温泉浴池等休闲设施，满足游客需求。'
      }
    ],
    nearbySpots: [
      {
        id: 4,
        name: '鼓山',
        distance: '3.5公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      },
      {
        id: 8,
        name: '金山寺',
        distance: '5.8公里',
        rating: 4.2,
        imageUrl: '/images/spots/8.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '7.2公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      }
    ]
  },
  {
    id: 12,
    name: '福州海峡文化艺术中心',
    description: [
      '福州海峡文化艺术中心位于福州市台江区，是一座集演艺、展览、会议、培训等功能于一体的大型文化设施。',
      '中心建筑造型独特，外形如同一朵盛开的茉莉花，是福州市的标志性建筑之一。',
      '中心内设有大剧院、音乐厅、美术馆、博物馆等多个场馆，经常举办各类文化艺术活动，是福州市重要的文化地标。'
    ],
    rating: 4.5,
    reviewsCount: 1876,
    price: 0,
    openingHours: '09:00-21:00（演出时间另行安排）',
    address: '福建省福州市台江区茶亭街道鳌峰路1号',
    phone: '0591-83912345',
    website: 'http://www.fzhxwhyszx.com/',
    tags: ['文化场所', '艺术展览', '演出场地', '现代建筑'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐5路、11路、18路、54路、66路、72路、101路、111路、116路等公交车到海峡文化艺术中心站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到茶亭站下车，从1号出口出站，步行约10分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州海峡文化艺术中心"，可将车辆停放在中心地下停车场。'
      }
    ],
    features: [
      {
        title: '建筑设计',
        icon: 'House',
        description: '建筑造型独特，外形如同一朵盛开的茉莉花，是福州市的标志性建筑之一。'
      },
      {
        title: '文化演出',
        icon: 'Microphone',
        description: '经常举办各类文化艺术演出，如音乐会、戏剧、舞蹈等。'
      },
      {
        title: '艺术展览',
        icon: 'Picture',
        description: '定期举办各类艺术展览，展示中外优秀艺术作品。'
      }
    ],
    nearbySpots: [
      {
        id: 1,
        name: '三坊七巷',
        distance: '2.5公里',
        rating: 4.7,
        imageUrl: '/images/spots/1.jpg'
      },
      {
        id: 2,
        name: '福州西湖公园',
        distance: '1.8公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 6,
        name: '左海公园',
        distance: '3.2公里',
        rating: 4.3,
        imageUrl: '/images/spots/6.jpg'
      }
    ]
  },
  {
    id: 13,
    name: '福州国家湿地公园',
    description: [
      '福州国家湿地公园位于福州市闽侯县，是一处以湿地生态系统保护和展示为主题的国家级湿地公园。',
      '公园总面积约1500公顷，包括湿地、水域、森林等多种生态系统，是福州市重要的生态保护区和科普教育基地。',
      '公园内栖息着众多珍稀鸟类和水生动植物，是观鸟、科普、休闲的理想场所，也是福州市民亲近自然的好去处。'
    ],
    rating: 4.2,
    reviewsCount: 1245,
    price: 20,
    openingHours: '08:30-17:30',
    address: '福建省福州市闽侯县南通镇',
    phone: '0591-83923456',
    website: 'http://www.fzsdgy.com/',
    tags: ['湿地公园', '自然风光', '生态旅游', '科普教育'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐专线公交到福州国家湿地公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州国家湿地公园"，可将车辆停放在景区停车场。'
      }
    ],
    features: [
      {
        title: '湿地生态',
        icon: 'WaterCup',
        description: '保存完好的湿地生态系统，是福州市重要的生态保护区。'
      },
      {
        title: '观鸟胜地',
        icon: 'View',
        description: '栖息着众多珍稀鸟类，是观鸟爱好者的天堂。'
      },
      {
        title: '科普教育',
        icon: 'Reading',
        description: '设有湿地科普馆，开展各类生态科普教育活动。'
      }
    ],
    nearbySpots: [
      {
        id: 14,
        name: '福州大学',
        distance: '5.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/14.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '12.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 9,
        name: '福州森林公园',
        distance: '15.2公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      }
    ]
  },
  {
    id: 14,
    name: '福州大学',
    description: [
      '福州大学创建于1958年，是福建省重点建设的高水平大学，也是国家"双一流"建设高校。',
      '学校位于福州市闽侯县，校园占地面积约2700亩，环境优美，是福州市著名的人文景观和教育基地。',
      '校园内有旗山、铜盘湖等自然景观，以及图书馆、体育馆、博物馆等建筑，是参观学习和休闲游览的好去处。'
    ],
    rating: 4.4,
    reviewsCount: 1678,
    price: 0,
    openingHours: '08:00-22:00（需要办理参观证）',
    address: '福建省福州市闽侯县上街镇福州大学城',
    phone: '0591-83934567',
    website: 'http://www.fzu.edu.cn/',
    tags: ['高等学府', '人文景观', '免费景点', '教育基地'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐专线公交、136路、186路等公交车到福州大学站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州大学"，可将车辆停放在校园停车场（需办理临时通行证）。'
      }
    ],
    features: [
      {
        title: '校园风光',
        icon: 'Tree',
        description: '校园环境优美，有旗山、铜盘湖等自然景观，四季景色宜人。'
      },
      {
        title: '人文景观',
        icon: 'House',
        description: '校园内有图书馆、体育馆、博物馆等建筑，展示了现代教育风貌。'
      },
      {
        title: '科教资源',
        icon: 'Reading',
        description: '作为福建省重点大学，拥有丰富的科教资源和人文底蕴。'
      }
    ],
    nearbySpots: [
      {
        id: 13,
        name: '福州国家湿地公园',
        distance: '5.5公里',
        rating: 4.2,
        imageUrl: '/images/spots/13.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '15.8公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      },
      {
        id: 9,
        name: '福州森林公园',
        distance: '18.5公里',
        rating: 4.4,
        imageUrl: '/images/spots/9.jpg'
      }
    ]
  },
  {
    id: 15,
    name: '福建博物院',
    description: [
      '福建博物院是福建省规模最大、藏品最丰富的综合性博物馆，位于福州市晋安区。',
      '博物院建筑面积约5.3万平方米，馆藏文物17万余件，其中一级文物170余件，是了解福建历史文化的重要场所。',
      '博物院分为历史馆、革命馆、自然馆、艺术馆等多个展区，展示了福建丰富的历史文化和自然资源。'
    ],
    rating: 4.6,
    reviewsCount: 2134,
    price: 0,
    openingHours: '09:00-17:00（周一闭馆）',
    address: '福建省福州市晋安区鼓山路96号',
    phone: '0591-83945678',
    website: 'http://www.fjbwy.org/',
    tags: ['博物馆', '文化场所', '免费景点', '历史古迹'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐5路、16路、27路、51路、76路、123路、311路等公交车到福建博物院站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达达道站，从2号出口出站，步行约15分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福建博物院"，可将车辆停放在博物院停车场。'
      }
    ],
    features: [
      {
        title: '丰富藏品',
        icon: 'Collection',
        description: '馆藏文物17万余件，包括陶瓷、青铜、书画、玉器等多种类型。'
      },
      {
        title: '精美展陈',
        icon: 'Picture',
        description: '展陈设计精美，运用现代科技手段，生动展示福建历史文化。'
      },
      {
        title: '文化活动',
        icon: 'Calendar',
        description: '定期举办各类文化讲座、展览和教育活动，丰富市民文化生活。'
      }
    ],
    nearbySpots: [
      {
        id: 4,
        name: '鼓山',
        distance: '3.2公里',
        rating: 4.6,
        imageUrl: '/images/spots/4.jpg'
      },
      {
        id: 11,
        name: '福州温泉公园',
        distance: '4.5公里',
        rating: 4.3,
        imageUrl: '/images/spots/11.jpg'
      },
      {
        id: 8,
        name: '金山寺',
        distance: '5.8公里',
        rating: 4.2,
        imageUrl: '/images/spots/8.jpg'
      }
    ]
  },
  {
    id: 16,
    name: '福州海滨公园',
    description: [
      '福州海滨公园位于福州市长乐区，是一处集海滨休闲、观光、娱乐为一体的综合性海滨公园。',
      '公园总面积约200公顷，拥有长达5公里的优质沙滩，是福州市民亲近大海、休闲娱乐的好去处。',
      '公园内设有沙滩浴场、海滨栈道、观景平台等设施，可以欣赏到壮阔的海景和美丽的日出日落。'
    ],
    rating: 4.3,
    reviewsCount: 1567,
    price: 0,
    openingHours: '全天开放',
    address: '福建省福州市长乐区环海路',
    phone: '0591-83956789',
    website: 'http://www.fzhbgy.com/',
    tags: ['海滨公园', '自然风光', '免费景点', '休闲娱乐'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐长乐区内公交车到海滨公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州海滨公园"，可将车辆停放在公园停车场。'
      }
    ],
    features: [
      {
        title: '海滨风光',
        icon: 'Sunny',
        description: '拥有长达5公里的优质沙滩，可以欣赏到壮阔的海景和美丽的日出日落。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '设有沙滩浴场、海滨栈道、观景平台等设施，满足游客休闲娱乐需求。'
      },
      {
        title: '海滨活动',
        icon: 'Calendar',
        description: '可以开展沙滩排球、海钓、帆船等海滨活动，体验海滨乐趣。'
      }
    ],
    nearbySpots: [
      {
        id: 17,
        name: '福州滨海新城',
        distance: '8.5公里',
        rating: 4.1,
        imageUrl: '/images/spots/17.jpg'
      },
      {
        id: 18,
        name: '长乐国际机场',
        distance: '15.2公里',
        rating: 4.0,
        imageUrl: '/images/spots/18.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '35.8公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      }
    ]
  },
  {
    id: 17,
    name: '福州滨海新城',
    description: [
      '福州滨海新城位于福州市长乐区，是福州市重点打造的现代化滨海新城区。',
      '新城规划面积约189平方公里，以"滨海生态、智慧创新、宜居宜业"为特色，集商务、居住、休闲、旅游等功能于一体。',
      '新城内有滨海大道、滨海公园、商业中心等设施，是福州市新兴的城市地标和旅游观光地。'
    ],
    rating: 4.1,
    reviewsCount: 1234,
    price: 0,
    openingHours: '全天开放',
    address: '福建省福州市长乐区滨海新城',
    phone: '0591-83967890',
    website: 'http://www.fzbhxc.com/',
    tags: ['城市新区', '现代建筑', '免费景点', '城市风光'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐长乐区内公交车到滨海新城站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐公交车前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州滨海新城"，可将车辆停放在指定停车场。'
      }
    ],
    features: [
      {
        title: '城市规划',
        icon: 'House',
        description: '现代化城市规划，布局合理，建筑风格独特，展示了福州城市发展新面貌。'
      },
      {
        title: '滨海风光',
        icon: 'Sunny',
        description: '依海而建，可欣赏到壮阔的海景和现代都市景观的完美结合。'
      },
      {
        title: '休闲设施',
        icon: 'Umbrella',
        description: '设有商业中心、休闲广场、滨海公园等设施，满足游客休闲购物需求。'
      }
    ],
    nearbySpots: [
      {
        id: 16,
        name: '福州海滨公园',
        distance: '8.5公里',
        rating: 4.3,
        imageUrl: '/images/spots/16.jpg'
      },
      {
        id: 18,
        name: '长乐国际机场',
        distance: '10.5公里',
        rating: 4.0,
        imageUrl: '/images/spots/18.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '38.2公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      }
    ]
  },
  {
    id: 18,
    name: '长乐国际机场',
    description: [
      '长乐国际机场（现已更名为福州长乐国际机场）位于福州市长乐区，是福建省重要的国际航空港。',
      '机场于1997年6月开始运营，是中国东南沿海重要的航空枢纽，也是福州市对外交流的重要窗口。',
      '机场航站楼设计现代，内部设施完善，是观赏飞机起降和了解现代航空运输的好去处。'
    ],
    rating: 4.0,
    reviewsCount: 2345,
    price: 0,
    openingHours: '全天开放（根据航班时刻表）',
    address: '福建省福州市长乐区机场路',
    phone: '0591-83978901',
    website: 'http://www.fzairport.com/',
    tags: ['交通枢纽', '现代建筑', '免费景点', '城市风光'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐机场大巴或长乐区内公交车到长乐国际机场站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '目前尚无地铁直达，可乘坐机场大巴前往。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州长乐国际机场"，可将车辆停放在机场停车场。'
      }
    ],
    features: [
      {
        title: '航站楼建筑',
        icon: 'House',
        description: '航站楼设计现代，造型独特，是福州市现代建筑的代表作之一。'
      },
      {
        title: '航空观光',
        icon: 'View',
        description: '可以观赏飞机起降，了解现代航空运输，体验国际航空港的繁忙景象。'
      },
      {
        title: '服务设施',
        icon: 'Umbrella',
        description: '设有餐厅、商店、休息区等服务设施，满足旅客各种需求。'
      }
    ],
    nearbySpots: [
      {
        id: 16,
        name: '福州海滨公园',
        distance: '15.2公里',
        rating: 4.3,
        imageUrl: '/images/spots/16.jpg'
      },
      {
        id: 17,
        name: '福州滨海新城',
        distance: '10.5公里',
        rating: 4.1,
        imageUrl: '/images/spots/17.jpg'
      },
      {
        id: 5,
        name: '福州国家森林公园',
        distance: '45.6公里',
        rating: 4.4,
        imageUrl: '/images/spots/5.jpg'
      }
    ]
  },
  {
    id: 19,
    name: '福州园林公园',
    description: [
      '福州园林公园位于福州市仓山区，是一座以传统园林艺术为主题的综合性公园。',
      '公园占地面积约50公顷，园内有亭台楼阁、假山水系、花木景观等，融合了中国传统园林的精髓。',
      '公园内设有闽派盆景园、牡丹园、茶文化园等特色景区，是了解福州传统文化和休闲游览的好去处。'
    ],
    rating: 4.2,
    reviewsCount: 1432,
    price: 15,
    openingHours: '08:00-18:00',
    address: '福建省福州市仓山区金山大道',
    phone: '0591-83989012',
    website: 'http://www.fzylyuan.com/',
    tags: ['园林', '文化景点', '休闲娱乐', '自然风光'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐25路、72路、115路、118路等公交车到园林公园站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达金山站，转乘公交车或步行约20分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州园林公园"，可将车辆停放在公园停车场。'
      }
    ],
    features: [
      {
        title: '园林艺术',
        icon: 'Tree',
        description: '融合了中国传统园林的精髓，亭台楼阁、假山水系、花木景观相映成趣。'
      },
      {
        title: '闽派盆景',
        icon: 'Flower',
        description: '设有闽派盆景园，展示了福建特色的盆景艺术，形态各异，技艺精湛。'
      },
      {
        title: '茶文化',
        icon: 'WaterCup',
        description: '茶文化园内展示了福建茶文化的历史和特色，可以品尝到正宗的福建茶。'
      }
    ],
    nearbySpots: [
      {
        id: 20,
        name: '福州市博物馆',
        distance: '6.2公里',
        rating: 4.5,
        imageUrl: '/images/spots/20.jpg'
      },
      {
        id: 2,
        name: '福州西湖公园',
        distance: '8.5公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 6,
        name: '左海公园',
        distance: '9.2公里',
        rating: 4.3,
        imageUrl: '/images/spots/6.jpg'
      }
    ]
  },
  {
    id: 20,
    name: '福州市博物馆',
    description: [
      '福州市博物馆位于福州市鼓楼区，是一座以展示福州历史文化为主题的综合性博物馆。',
      '博物馆建筑面积约2万平方米，馆藏文物近5万件，包括陶瓷、书画、青铜器、玉器等多种类型。',
      '博物馆分为福州历史文化展、闽都民俗展、福州工艺美术展等多个展区，全面展示了福州悠久的历史和灿烂的文化。'
    ],
    rating: 4.5,
    reviewsCount: 1876,
    price: 0,
    openingHours: '09:00-17:00（周一闭馆）',
    address: '福建省福州市鼓楼区湖东路96号',
    phone: '0591-83990123',
    website: 'http://www.fzmuseum.com/',
    tags: ['博物馆', '文化场所', '免费景点', '历史古迹'],
    transportation: [
      {
        type: '公交',
        icon: 'Van',
        description: '乘坐5路、11路、22路、58路、72路等公交车到市博物馆站下车即可。'
      },
      {
        type: '地铁',
        icon: 'Ship',
        description: '乘坐地铁1号线到达茶亭站，步行约15分钟可到达。'
      },
      {
        type: '自驾',
        icon: 'Bicycle',
        description: '导航至"福州市博物馆"，可将车辆停放在博物馆停车场。'
      }
    ],
    features: [
      {
        title: '丰富藏品',
        icon: 'Collection',
        description: '馆藏文物近5万件，包括陶瓷、书画、青铜器、玉器等多种类型，展示了福州丰富的历史文化遗产。'
      },
      {
        title: '历史展览',
        icon: 'Reading',
        description: '福州历史文化展全面展示了福州从远古至近代的历史变迁和文化发展。'
      },
      {
        title: '民俗展示',
        icon: 'Picture',
        description: '闽都民俗展展示了福州传统民俗文化，包括节庆习俗、民间工艺、传统戏曲等。'
      }
    ],
    nearbySpots: [
      {
        id: 1,
        name: '三坊七巷',
        distance: '3.2公里',
        rating: 4.7,
        imageUrl: '/images/spots/1.jpg'
      },
      {
        id: 2,
        name: '福州西湖公园',
        distance: '2.5公里',
        rating: 4.5,
        imageUrl: '/images/spots/2.jpg'
      },
      {
        id: 19,
        name: '福州园林公园',
        distance: '6.2公里',
        rating: 4.2,
        imageUrl: '/images/spots/19.jpg'
      }
    ]
  }
];

/**
 * 根据ID获取景点详情
 * @param {string|number} id 景点ID
 * @returns {Object|null} 景点详情对象，如果未找到则返回null
 */
export function getSpotById(id) {
  // 将id转换为数字进行比较
  const numId = parseInt(id, 10);
  return spotsData.find(spot => spot.id === numId) || null;
}

/**
 * 获取所有景点列表
 * @returns {Array} 景点列表
 */
export function getAllSpots() {
  return spotsData;
}

/**
 * 根据关键词搜索景点
 * @param {string} keyword 搜索关键词
 * @returns {Array} 符合条件的景点列表
 */
export function searchSpots(keyword) {
  if (!keyword) return spotsData;
  
  const lowerKeyword = keyword.toLowerCase();
  return spotsData.filter(spot => 
    spot.name.toLowerCase().includes(lowerKeyword) || 
    spot.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)) ||
    spot.description.some(desc => desc.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 根据标签筛选景点
 * @param {string} tag 标签名称
 * @returns {Array} 符合条件的景点列表
 */
export function filterSpotsByTag(tag) {
  if (!tag) return spotsData;
  
  const lowerTag = tag.toLowerCase();
  return spotsData.filter(spot => 
    spot.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

/**
 * 获取推荐景点列表
 * @param {number} limit 限制返回数量
 * @returns {Array} 推荐景点列表
 */
export function getRecommendedSpots(limit = 4) {
  // 按评分排序，取前几个
  return [...spotsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
} 
<template>
  <div class="about-page">
    <!-- 顶部横幅 -->
    <div class="about-banner">
      <div class="banner-content">
        <h1>关于福州</h1>
        <p>千年古城，现代活力</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="about-content">
      <!-- 城市概览 -->
      <section class="section">
        <h2 class="section-title">城市概览</h2>
        <div class="overview-content">
          <div class="overview-text">
            <p>福州，简称"榕"，福建省省会，是中国东南沿海重要的中心城市、海峡西岸经济区中心城市、国家历史文化名城。福州地处闽江下游，北依余麻章、南接武夷，东临台湾海峡，是一座有着2200多年历史的文化古城。</p>
            <p>福州三面环山，一面临江，素有"山在城中，城在山中，有山皆园，无园不山"之誉。这里气候宜人，景色秀丽，四季常青，被誉为"有福之州"，是中国优秀旅游城市和国家园林城市。</p>
            <p>福州是闽文化的发祥地和集大成者，历史上曾是海上丝绸之路的重要港口城市，现今是"21世纪海上丝绸之路"核心区建设的重要城市。福州拥有丰富的自然和人文景观，是一座集历史、文化、自然风光于一体的旅游城市。</p>
          </div>
          <div class="overview-stats">
            <div class="stat-item">
              <div class="stat-value">2200+</div>
              <div class="stat-label">年历史</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">870</div>
              <div class="stat-label">万人口</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">12216</div>
              <div class="stat-label">平方公里</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">100+</div>
              <div class="stat-label">旅游景点</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 历史文化 -->
      <section class="section history-culture">
        <h2 class="section-title">历史文化</h2>
        <div class="history-content">
          <div class="history-item">
            <div class="timeline">
              <div class="year">202 BC</div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
            <div class="history-detail">
              <h3>建城之初</h3>
              <p>公元前202年，汉高祖刘邦建立汉朝，同年设闽越郡，福州初具雏形。</p>
            </div>
          </div>
          
          <div class="history-item">
            <div class="timeline">
              <div class="year">619</div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
            <div class="history-detail">
              <h3>正式建州</h3>
              <p>唐朝武德二年（619年），改东安县为福州，取"有福之州"之意，福州之名由此而来。</p>
            </div>
          </div>
          
          <div class="history-item">
            <div class="timeline">
              <div class="year">968</div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
            <div class="history-detail">
              <h3>闽文化繁荣</h3>
              <p>北宋时期，福州成为海上丝绸之路的重要港口，闽文化进入繁荣发展时期。</p>
            </div>
          </div>
          
          <div class="history-item">
            <div class="timeline">
              <div class="year">1842</div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
            <div class="history-detail">
              <h3>开埠通商</h3>
              <p>鸦片战争后，福州被迫开埠通商，逐渐发展成为中国东南沿海重要的政治、经济、文化中心。</p>
            </div>
          </div>
          
          <div class="history-item">
            <div class="timeline">
              <div class="year">1949</div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
            <div class="history-detail">
              <h3>解放新生</h3>
              <p>1949年8月17日，福州解放，翻开了福州历史的新篇章。</p>
            </div>
          </div>
          
          <div class="history-item">
            <div class="timeline">
              <div class="year">现今</div>
              <div class="dot"></div>
            </div>
            <div class="history-detail">
              <h3>现代发展</h3>
              <p>如今的福州是一座充满活力的现代化城市，在保留传统文化的同时，不断推进经济社会发展，成为海峡西岸经济区的中心城市。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 福州特色 -->
      <section class="section features">
        <h2 class="section-title">福州特色</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" v-for="(feature, index) in cityFeatures" :key="index">
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon><component :is="feature.icon" /></el-icon>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </el-col>
        </el-row>
      </section>
      
      <!-- 福州美食 -->
      <section class="section food">
        <h2 class="section-title">福州美食</h2>
        <div class="food-gallery">
          <div class="food-item" v-for="(food, index) in foods" :key="index">
            <div class="food-image" :style="{ backgroundImage: `url(${food.image})` }"></div>
            <div class="food-info">
              <h3>{{ food.name }}</h3>
              <p>{{ food.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳旅游时间 -->
      <section class="section best-time">
        <h2 class="section-title">最佳旅游时间</h2>
        <div class="weather-info">
          <div class="season-chart">
            <div v-for="(season, index) in seasons" :key="index" 
                 class="season-item" 
                 :class="{ 'recommended': season.recommended }">
              <div class="season-month">{{ season.months }}</div>
              <div class="season-weather">{{ season.weather }}</div>
              <div class="season-temp">{{ season.temperature }}</div>
              <div class="season-recommendation" v-if="season.recommended">推荐</div>
            </div>
          </div>
          <div class="weather-description">
            <p>福州属于亚热带季风气候，四季分明，全年温和湿润，年平均气温20℃左右，是一座"四季常青"的城市。</p>
            <p>3月至5月和9月至11月是福州最适宜旅游的季节。春季温暖湿润，花木繁盛；秋季天高气爽，气候宜人。</p>
            <p>6月至9月为夏季，气温较高且多雨，可能遇到台风天气；12月至2月为冬季，温度较低但不会太冷，可以避开北方的寒冷。</p>
          </div>
        </div>
      </section>

      <!-- 交通指南 -->
      <section class="section transportation">
        <h2 class="section-title">交通指南</h2>
        <div class="transport-cards">
          <div class="transport-card" v-for="(transport, index) in transportations" :key="index">
            <div class="card-header">
              <div class="transport-icon">
                <el-icon><component :is="transport.icon" /></el-icon>
              </div>
              <h3>{{ transport.title }}</h3>
            </div>
            <div class="card-content">
              <p v-for="(item, i) in transport.items" :key="i">{{ item }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 旅游贴士 -->
      <section class="section travel-tips">
        <h2 class="section-title">旅游贴士</h2>
        <el-collapse>
          <el-collapse-item v-for="(tip, index) in travelTips" :key="index" :title="tip.title" :name="index">
            <div class="tip-content">
              <p v-for="(item, i) in tip.content" :key="i">{{ item }}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </section>
    </div>
  </div>
</template>

<script setup>
import { 
  Food, 
  Cloudy, 
  Ship, 
  Van, 
  Place, 
  Money, 
  Dish, 
  Collection, 
  Reading, 
  Briefcase,
  Sunrise
} from '@element-plus/icons-vue'

// 城市特色
const cityFeatures = [
  {
    icon: 'Reading',
    title: '闽都文化',
    description: '福州是闽文化的发祥地和集大成者，拥有深厚的历史文化底蕴，孕育了众多文人雅士。'
  },
  {
    icon: 'Place',
    title: '山水城市',
    description: '福州三面环山，一水中流，素有"山在城中，城在山中"之称，自然风光优美。'
  },
  {
    icon: 'Collection',
    title: '历史古迹',
    description: '作为国家历史文化名城，福州保存了大量的历史古迹，如三坊七巷、鼓山等。'
  },
  {
    icon: 'Dish',
    title: '闽菜美食',
    description: '福州是闽菜的发源地之一，佛跳墙、鱼丸、肉燕等闽菜代表美食广受欢迎。'
  },
  {
    icon: 'Sunrise',
    title: '宜居环境',
    description: '福州气候宜人，四季常青，空气质量优良，多次被评为中国最宜居城市之一。'
  },
  {
    icon: 'Briefcase',
    title: '海丝枢纽',
    description: '福州是海上丝绸之路的重要港口城市，现为"21世纪海上丝绸之路"核心区。'
  }
]

// 福州美食
const foods = [
  {
    name: '佛跳墙',
    description: '福州最著名的传统名菜，选用数十种山珍海味制作，香气四溢，味道极佳。',
    image: '/images/food/food1.jpg'
  },
  {
    name: '福州鱼丸',
    description: '福州特色小吃，选用新鲜鱼肉制作，外皮劲道，内馅鲜美，口感独特。',
    image: '/images/food/food2.jpg'
  },
  {
    name: '肉燕',
    description: '福州传统名点，外皮薄如蝉翼，内馅鲜美多汁，常与鱼丸搭配食用。',
    image: '/images/food/food3.jpg'
  },
  {
    name: '荔枝肉',
    description: '福州名菜，选用上等里脊肉制作，色泽红亮，外酥里嫩，形似荔枝。',
    image: '/images/food/food4.jpg'
  },
  {
    name: '锅边糊',
    description: '福州特色小吃，用米浆制作，软硬适中，配以各种调料，香气扑鼻。',
    image: '/images/food/food5.jpg'
  },
  {
    name: '芋泥',
    description: '福州传统甜品，选用优质芋头制作，香甜软糯，入口即化，回味无穷。',
    image: '/images/food/food6.jpg'
  }
]

// 季节信息
const seasons = [
  { months: '3-5月', weather: '春季', temperature: '15-25℃', recommended: true },
  { months: '6-8月', weather: '夏季', temperature: '25-35℃', recommended: false },
  { months: '9-11月', weather: '秋季', temperature: '18-28℃', recommended: true },
  { months: '12-2月', weather: '冬季', temperature: '8-18℃', recommended: false }
]

// 交通信息
const transportations = [
  {
    icon: 'Ship',
    title: '飞机',
    items: [
      '福州长乐国际机场位于福州东南部长乐区，距市区约50公里。',
      '机场有直飞国内主要城市及部分国际和地区航线的航班。',
      '从机场到市区可乘坐机场大巴或出租车。'
    ]
  },
  {
    icon: 'Van',
    title: '火车',
    items: [
      '福州有福州站、福州南站两个主要火车站。',
      '福州站是普速列车站，福州南站是高铁站。',
      '高铁可直达北京、上海、广州等主要城市。'
    ]
  },
  {
    icon: 'Place',
    title: '市内交通',
    items: [
      '福州有完善的公交网络，覆盖市区主要景点和商业区。',
      '福州地铁目前有1、2号线在运营，可到达市区主要区域。',
      '出租车起步价10元/3公里，可通过滴滴等APP叫车。'
    ]
  }
]

// 旅游贴士
const travelTips = [
  {
    title: '语言交流',
    content: [
      '福州市区普通话普及度高，交流无障碍。',
      '福州方言为闽东语系，与普通话差异较大，部分老年人可能只会说方言。',
      '主要景点和酒店有英语服务。'
    ]
  },
  {
    title: '消费水平',
    content: [
      '福州消费水平中等，比北上广深等一线城市低。',
      '大多数景点门票在30-100元之间，部分景点免费。',
      '一般餐厅人均消费50-100元，高档餐厅200元以上。',
      '三星级酒店价格约300-500元/晚，四五星级酒店600元以上。'
    ]
  },
  {
    title: '注意事项',
    content: [
      '夏季气温高且多雨，请做好防晒防雨准备。',
      '福州市区潮湿，请注意防潮。',
      '台风季节（7-9月）请关注天气预报，避开恶劣天气出行。',
      '尊重当地风俗习惯，参观寺庙时着装得体。'
    ]
  },
  {
    title: '推荐行程',
    content: [
      '福州三日游：第一天游览三坊七巷、西湖公园；第二天游览鼓山、左海公园；第三天游览平潭岛。',
      '福州周边游：可安排前往武夷山、泰宁等景点，距离福州约3-4小时车程。',
      '建议在福州停留3-5天，深度体验福州文化和自然风光。'
    ]
  }
]
</script>

<style scoped>
.about-page {
  margin-top: -20px;
}

.about-banner {
  height: 400px;
  background-image: url('@/assets/banner2.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
}

.about-banner:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner-content h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-content p {
  font-size: 24px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #303133;
  position: relative;
  padding-left: 15px;
}

.section-title:before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 5px;
  background-color: #409EFF;
  border-radius: 3px;
}

.overview-content {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
}

.overview-text {
  flex: 1;
}

.overview-text p {
  margin-bottom: 15px;
  line-height: 1.8;
  text-align: justify;
  color: #606266;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 300px;
}

.stat-item {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  color: #606266;
  font-size: 14px;
}

.history-culture {
  position: relative;
}

.history-content {
  position: relative;
  margin-left: 30px;
}

.history-item {
  display: flex;
  margin-bottom: 40px;
  position: relative;
}

.timeline {
  position: relative;
  width: 100px;
  flex-shrink: 0;
}

.year {
  font-size: 18px;
  font-weight: 600;
  color: #409EFF;
  position: absolute;
  right: 30px;
  top: 0;
}

.dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #409EFF;
  border-radius: 50%;
  right: 0;
  top: 5px;
}

.line {
  position: absolute;
  width: 2px;
  background-color: #EBEEF5;
  top: 20px;
  bottom: -40px;
  right: 7px;
}

.history-item:last-child .line {
  display: none;
}

.history-detail {
  padding-left: 30px;
  flex: 1;
}

.history-detail h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.history-detail p {
  color: #606266;
  line-height: 1.6;
}

.features {
  margin-bottom: 60px;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.feature-icon {
  font-size: 40px;
  color: #409EFF;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #303133;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
}

.food-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.food-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.food-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.food-info {
  padding: 20px;
}

.food-info h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.food-info p {
  color: #606266;
  line-height: 1.6;
}

.season-chart {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.season-item {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.season-item.recommended {
  border: 2px solid #67C23A;
}

.season-month {
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.season-weather {
  color: #606266;
  margin-bottom: 5px;
}

.season-temp {
  color: #909399;
  margin-bottom: 10px;
}

.season-recommendation {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #67C23A;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.weather-description {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.weather-description p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #606266;
}

.transport-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.transport-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.transport-icon {
  font-size: 24px;
  color: #409EFF;
  margin-right: 15px;
}

.transport-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.card-content p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #606266;
}

.tip-content p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #606266;
}

@media (max-width: 768px) {
  .overview-content {
    flex-direction: column;
  }
  
  .overview-stats {
    width: 100%;
  }
  
  .season-chart {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .season-item {
    min-width: 45%;
    margin: 0;
  }
}
</style> 
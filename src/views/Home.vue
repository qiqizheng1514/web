<template>
  <div class="home">
    <!-- 顶部横幅 -->
    <div class="banner" :style="{ backgroundImage: `url(${bannerImage})` }">
      <div class="banner-content">
        <h1>探索福州之美</h1>
        <p>发现这座千年古城的魅力与文化</p>
        <div class="search-bar">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索景点、活动或美食..."
            class="search-input"
            size="small"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>

    <!-- 轮播图 -->
    <section class="section">
      <h2 class="section-title">精选景点</h2>
      <HomeCarousel />
    </section>

    <!-- 景点分类 -->
    <section class="section categories">
      <div class="category-item" v-for="(category, index) in categories" :key="index">
        <div class="category-icon">
          <el-icon v-if="category.icon === 'LocationInformation'"><location-information /></el-icon>
          <el-icon v-else-if="category.icon === 'Sunset'"><sunset /></el-icon>
          <el-icon v-else-if="category.icon === 'PictureFilled'"><picture-filled /></el-icon>
          <el-icon v-else-if="category.icon === 'Ticket'"><ticket /></el-icon>
        </div>
        <h3>{{ category.name }}</h3>
        <p>{{ category.count }}个景点</p>
      </div>
    </section>

    <!-- 热门景点 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">热门景点</h2>
        <el-button text @click="goToScenicSpots">查看全部</el-button>
      </div>
      <SpotsGrid />
    </section>

    <!-- 旅游攻略 -->
    <section class="section travel-tips">
      <h2 class="section-title">旅游攻略</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="(tip, index) in travelTips" :key="index">
          <el-card class="tip-card">
            <div v-if="loadedTipImages[index]" class="tip-image" :style="{ backgroundImage: `url(${tip.imageUrl})` }"></div>
            <div v-else class="tip-image tip-image-skeleton"></div>
            <div class="tip-content">
              <h3>{{ tip.title }}</h3>
              <p>{{ tip.description }}</p>
              <el-button text @click="goToTravelTip(index + 1)">阅读更多</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Ticket, LocationInformation, PictureFilled, Sunset } from '@element-plus/icons-vue'
import HomeCarousel from '@/components/HomeCarousel.vue'
import SpotsGrid from '@/components/SpotsGrid.vue'
import { getAllSpots } from '@/data/spotsData'
import bannerImage from '@/assets/images/banner1.jpg'

const router = useRouter()
const searchKeyword = ref('')

// 修改提供用户信息的方式，使用App.vue中全局提供的用户信息
// 提供用户信息给子组件
const getCurrentUser = () => {
  // 从localStorage获取用户信息
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}
provide('currentUser', getCurrentUser)

// 记录已加载的攻略图片
const loadedTipImages = ref({})

// 预加载图片
const preloadImage = (url, index) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedTipImages.value[index] = true;
      resolve();
    };
    img.onerror = () => {
      // 加载失败时也标记为已加载
      loadedTipImages.value[index] = true;
      resolve();
    };
    img.src = url;
  });
};

// 景点分类 - 从spotsData.js中获取真实数据
const allSpots = ref([])
const categories = computed(() => {
  // 计算各类型景点的数量
  const historicalCount = allSpots.value.filter(spot => spot.tags.includes('历史古迹')).length
  const natureCount = allSpots.value.filter(spot => spot.tags.includes('自然风光') || spot.tags.includes('公园')).length
  const museumCount = allSpots.value.filter(spot => spot.tags.includes('博物馆') || spot.tags.includes('文化场所')).length
  
  return [
    { name: '历史古迹', icon: 'LocationInformation', count: historicalCount || 0 },
    { name: '自然风光', icon: 'Sunset', count: natureCount || 0 },
    { name: '公园博物馆', icon: 'PictureFilled', count: museumCount || 0 }
  ]
})

// 旅游攻略
const travelTips = ref([
  {
    title: '福州三日游完美攻略',
    description: '三天时间，带你领略福州的历史文化与自然风光',
    imageUrl: '/images/tips/tip1.jpg',
    content: `
      <h4>第一天：市区历史文化之旅</h4>
      <p><strong>上午</strong>：漫步<span class="highlight">三坊七巷</span>历史文化街区，穿越千年时光，感受古城韵味。在青石板路上，聆听老宅院的故事，品尝正宗鱼丸、肉燕等福州特色小吃。</p>
      <p><strong>中午</strong>：在充满烟火气息的<span class="highlight">南后街</span>，寻觅一家老字号餐厅，品尝正宗的福州传统菜肴，感受闽菜的独特魅力。</p>
      <p><strong>下午</strong>：登上<span class="highlight">于山白塔</span>，俯瞰整座城市的壮丽景色，远眺闽江蜿蜒。随后漫步<span class="highlight">西湖公园</span>，在亭台水榭间放松身心。</p>
      <p><strong>晚上</strong>：沿着灯火璀璨的<span class="highlight">闽江夜景带</span>散步，欣赏两岸灯光秀，感受现代福州的活力与魅力。</p>
      
      <h4>第二天：自然风光之旅</h4>
      <p><strong>上午</strong>：前往<span class="highlight">鼓山风景区</span>，登山揽胜，探访千年古刹<span class="highlight">涌泉寺</span>，欣赏历代名人留下的摩崖石刻，感受山林间的禅意。</p>
      <p><strong>中午</strong>：在鼓山品尝清净素斋，体验佛家饮食文化，让身心得到片刻宁静。</p>
      <p><strong>下午</strong>：畅游<span class="highlight">福州国家森林公园</span>，徜徉在绿树成荫的山林间，呼吸清新空气，远离城市喧嚣。</p>
      <p><strong>晚上</strong>：返回市区，探访热闹非凡的<span class="highlight">温泉路夜市</span>，在各色美食与烟火气中，感受福州的夜生活魅力。</p>
      
      <h4>第三天：现代福州之旅</h4>
      <p><strong>上午</strong>：参观<span class="highlight">福建博物院</span>，穿越历史长河，了解福建丰富多彩的历史文化遗产，欣赏珍贵文物与艺术品。</p>
      <p><strong>中午</strong>：在<span class="highlight">仓山万达</span>品尝各国美食，体验现代都市的休闲生活方式。</p>
      <p><strong>下午</strong>：前往<span class="highlight">福州海峡奥体中心</span>，欣赏现代建筑艺术，体验丰富的休闲娱乐活动，感受福州的现代化与活力。</p>
      <p><strong>晚上</strong>：在<span class="highlight">五四路商业街</span>购物休闲，品尝当地特色小吃，为福州之旅画上完美句号。</p>
    `
  },
  {
    title: '福州美食地图',
    description: '带你品尝福州特色小吃，感受舌尖上的闽都文化',
    imageUrl: '/images/tips/tip2.jpg',
    content: `
      <h4>传统名小吃</h4>
      <p><strong class="food-name">鱼丸</strong>：福州最负盛名的传统小吃，选用新鲜鱼肉手工制作，外皮Q弹有嚼劲，内馅鲜美多汁。每一口都能品尝到海鲜的鲜甜与厨师的匠心。<span class="recommend">推荐店铺：<span class="shop-name">施家鱼丸（三坊七巷店）</span></span></p>
      <p><strong class="food-name">肉燕</strong>：福州独特的传统美食，用上等猪肉和淀粉精心制作，薄如蝉翼，入口即化。煮熟后的肉燕晶莹剔透，口感滑嫩，汤鲜味美。<span class="recommend">推荐店铺：<span class="shop-name">老福州肉燕（台江店）</span></span></p>
      <p><strong class="food-name">芋泥</strong>：福州传统甜品，选用优质芋头蒸熟捣碎，加入细砂糖和香油精心炒制而成。香甜软糯，口感绵密，是福州人钟爱的传统小吃。<span class="recommend">推荐店铺：<span class="shop-name">旺记芋泥（达道店）</span></span></p>
      
      <h4>特色餐厅</h4>
      <p><strong class="food-name">佛跳墙</strong>：福州最负盛名的传统名菜，汇集山珍海味数十种，经过精心烹制，香气四溢，据说香气能使得佛祖跳墙而来。<span class="recommend">推荐店铺：<span class="shop-name">聚春园酒店</span></span></p>
      <p><strong class="food-name">闽菜海鲜</strong>：福州靠海，海鲜资源丰富，新鲜度极高。各式海鲜烹饪手法多样，保留原汁原味，让人回味无穷。<span class="recommend">推荐前往：<span class="shop-name">闽江路海鲜一条街</span></span></p>
      <p><strong class="food-name">茶文化</strong>：福州茶文化源远流长，品茗赏茶已成为当地人生活的重要部分。在古色古香的茶馆中，品尝一杯地道的福州茶，感受闽都茶文化的独特魅力。<span class="recommend">推荐前往：<span class="shop-name">茶亭公园附近茶馆</span></span></p>
      
      <h4>美食街区</h4>
      <p><strong class="district-name">南后街</strong>：位于三坊七巷附近的传统美食街区，汇集了众多福州传统小吃和老字号店铺，是品尝地道福州美食的最佳去处。</p>
      <p><strong class="district-name">温泉路夜市</strong>：夜幕降临后热闹非凡，各种小吃摊位林立，烟火气十足，是体验福州夜生活和品尝街头美食的绝佳选择。</p>
      <p><strong class="district-name">达道路美食街</strong>：现代与传统美食并存，从高档餐厅到平民小吃，选择丰富多样，满足各种味蕾需求和预算。</p>
    `
  },
  {
    title: '福州交通出行指南',
    description: '详细的交通信息，让你在福州畅行无阻',
    imageUrl: '/images/tips/tip3.jpg',
    content: `
      <div class="travel-section">
        <h4><i class="travel-icon">✈</i> 机场交通</h4>
        <p>福州长乐国际机场位于福州市长乐区，距离市中心约50公里，是福建省重要的航空枢纽。</p>
        <ul class="travel-list">
          <li><strong class="transport-type">机场大巴</strong>：多条线路连接机场和市区各主要区域，班次频繁，舒适便捷。<span class="price-tag">票价：25-30元</span></li>
          <li><strong class="transport-type">出租车</strong>：机场出口处有正规出租车候客，便捷直达目的地。<span class="price-tag">费用：约150-200元</span></li>
          <li><strong class="transport-type">网约车</strong>：可使用滴滴等APP在线预约，价格透明，支付便捷。<span class="price-tag">费用：比出租车略低</span></li>
        </ul>
      </div>
      
      <div class="travel-section">
        <h4><i class="travel-icon">🚇</i> 市内交通</h4>
        <ul class="travel-list">
          <li><strong class="transport-type">地铁</strong>：福州已开通1号线和2号线，覆盖主要城区和热门景点，是避开地面交通拥堵的理想选择。<span class="price-tag">票价：2-7元</span></li>
          <li><strong class="transport-type">公交车</strong>：线路网络发达，覆盖全市各个角落，是经济实惠的出行方式。<span class="price-tag">票价：1-2元</span></li>
          <li><strong class="transport-type">出租车</strong>：随处可见，方便快捷，适合短途出行。<span class="price-tag">起步价：10元/3公里，后续2.4元/公里</span></li>
          <li><strong class="transport-type">共享单车</strong>：市区内随处可见各色共享单车，适合短距离出行，环保健康。<span class="price-tag">费用：按时计费，价格低廉</span></li>
        </ul>
      </div>
      
      <div class="travel-section">
        <h4><i class="travel-icon">🚄</i> 周边出行</h4>
        <ul class="travel-list">
          <li><strong class="transport-type">火车</strong>：福州站和福州南站有高铁和普通列车通往全国各地，交通便捷。</li>
          <li><strong class="transport-type">长途汽车</strong>：福州有多个长途汽车站，可前往省内各地及邻近省份，班次丰富。</li>
          <li><strong class="transport-type">自驾</strong>：福州周边高速公路网络完善，自驾出行便捷舒适，可灵活安排行程。</li>
        </ul>
        <p class="travel-tips-note">温馨提示：出行前建议查询实时交通信息，避开高峰期，合理规划行程。</p>
      </div>
    `
  }
])

// 跳转到旅游攻略详情页
const goToTravelTip = (id) => {
  router.push(`/travel-tips/${id}`);
}

// 跳转到景点列表
const goToScenicSpots = () => {
  router.push('/spots')
}

// 处理搜索
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: '/spots',
      query: { keyword: searchKeyword.value.trim() }
    })
  }
}

// 组件挂载时预加载所有攻略图片
onMounted(() => {
  // 获取所有景点数据
  allSpots.value = getAllSpots()
  
  // 预加载攻略图片
  travelTips.value.forEach((tip, index) => {
    preloadImage(tip.imageUrl, index);
  });
});
</script>

<style scoped>
.home {
  margin-top: -20px;
}

.banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 30px;
  padding: 0;
}

.banner:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  backdrop-filter: brightness(1.1);
}

.banner-content {
  position: relative;
  z-index: 1;
  width: 500px;
  max-width: 90%;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.banner h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
}

.banner p {
  font-size: 16px;
  margin-bottom: 24px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  opacity: 0.95;
  letter-spacing: 1px;
  line-height: 1.6;
}

.search-bar {
  display: flex;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  padding: 5px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.search-bar:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.search-input {
  flex: 1;
  margin-right: 8px;
}

.search-input :deep(.el-input__inner) {
  height: 40px;
  font-size: 14px;
  padding: 0 15px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input :deep(.el-input__inner):focus {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.search-bar .el-button {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 500;
  background: #409EFF;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.search-bar .el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  background: #66b1ff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
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

.categories {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.category-item {
  flex: 1;
  min-width: 200px;
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 40px;
  margin-bottom: 15px;
  color: #409EFF;
}

.category-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #303133;
}

.category-item p {
  color: #909399;
}

.travel-tips {
  margin-bottom: 60px;
}

.tip-card {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.tip-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.tip-image-skeleton {
  background-color: #f2f2f2;
  background-image: none !important;
}

.tip-content {
  padding: 20px;
}

.tip-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.tip-content p {
  color: #606266;
  margin-bottom: 15px;
}

.tip-detail {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.tip-detail h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 15px 0 10px;
  color: #303133;
  background-color: #f5f7fa;
  padding: 8px 12px;
  border-radius: 4px;
  display: inline-block;
}

.tip-detail p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #606266;
  text-indent: 0;
}

.tip-detail strong {
  font-weight: 600;
  color: #303133;
}

.highlight {
  color: #409EFF;
  font-weight: 500;
}

.food-name, .district-name, .transport-type {
  color: #67c23a;
  font-weight: 600;
}

.recommend {
  display: block;
  margin-top: 5px;
  font-style: italic;
  color: #909399;
}

.shop-name {
  color: #e6a23c;
  font-weight: 500;
}

.travel-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fb;
  border-radius: 8px;
}

.travel-icon {
  font-style: normal;
  margin-right: 8px;
}

.travel-list {
  list-style-type: none;
  padding-left: 0;
  margin: 10px 0;
}

.travel-list li {
  padding: 8px 0;
  border-bottom: 1px dashed #ebeef5;
}

.travel-list li:last-child {
  border-bottom: none;
}

.price-tag {
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-left: 8px;
}

.travel-tips-note {
  background-color: #fdf6ec;
  color: #e6a23c;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .banner {
    height: 350px;
    padding-left: 10%;
    padding-right: 10%;
  }
  
  .banner-content {
    max-width: 100%;
    padding: 25px;
  }
  
  .banner h1 {
    font-size: 28px;
  }
  
  .banner p {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 300px;
    padding: 0 20px;
  }
  
  .banner-content {
    padding: 20px;
  }
  
  .banner h1 {
    font-size: 24px;
  }
  
  .banner p {
    font-size: 13px;
    margin-bottom: 16px;
  }
  
  .search-input :deep(.el-input__inner),
  .search-bar .el-button {
    height: 36px;
    font-size: 13px;
  }
}
</style> 
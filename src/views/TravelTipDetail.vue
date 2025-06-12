<template>
  <div class="travel-tip-detail">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else-if="!tipData" class="not-found">
      <el-empty description="未找到该攻略" />
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </div>
    
    <div v-else class="tip-container">
      <!-- 顶部固定banner图 -->
      <div class="tip-header" :style="{ backgroundImage: `url(${bannerImage})` }">
        <div class="tip-header-content">
          <h1>{{ tipData.title }}</h1>
          <p>{{ tipData.description }}</p>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="tip-content">
        <div class="content-wrapper">
          <div class="tip-detail" v-html="tipData.content"></div>
          
          <div class="tip-actions">
            <el-button type="primary" @click="goBack">返回首页</el-button>
            <el-button @click="handleShare">分享攻略</el-button>
          </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="tip-sidebar">
          <div class="sidebar-card">
            <h3>相关攻略</h3>
            <div class="related-tips">
              <router-link 
                v-for="(tip, index) in relatedTips" 
                :key="index" 
                :to="`/travel-tips/${tip.id}`" 
                class="related-tip-card"
              >
                <div class="related-tip-content">
                  <div class="related-tip-title">{{ tip.title }}</div>
                  <div class="related-tip-arrow">
                    <el-button type="primary" size="small" text>查看详情</el-button>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          
          <div class="sidebar-card">
            <h3>热门标签</h3>
            <div class="tip-tags">
              <el-tag size="small" effect="plain" type="primary">福州旅游</el-tag>
              <el-tag size="small" effect="plain" type="success">美食攻略</el-tag>
              <el-tag size="small" effect="plain" type="warning">交通指南</el-tag>
              <el-tag size="small" effect="plain" type="danger">景点推荐</el-tag>
              <el-tag size="small" effect="plain" type="info">旅行必备</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const tipData = ref(null);
const relatedTips = ref([]);
// 使用固定的banner图片
const bannerImage = ref('/images/banner/banner1.jpg');

// 模拟的攻略数据
const travelTipsData = [
  {
    id: 1,
    title: '福州三日游完美攻略',
    description: '三天时间，带你领略福州的历史文化与自然风光',
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
    id: 2,
    title: '福州美食地图',
    description: '带你品尝福州特色小吃，感受舌尖上的闽都文化',
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
    id: 3,
    title: '福州交通出行指南',
    description: '详细的交通信息，让你在福州畅行无阻',
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
];

// 根据ID获取攻略数据
const fetchTipData = (id) => {
  const tipId = parseInt(id);
  return travelTipsData.find(tip => tip.id === tipId) || null;
};

// 获取相关攻略
const getRelatedTips = (currentTipId) => {
  const tipId = parseInt(currentTipId);
  return travelTipsData
    .filter(tip => tip.id !== tipId)
    .map(tip => ({
      id: tip.id,
      title: tip.title
    }));
};

// 返回首页
const goBack = () => {
  router.push('/');
};

// 分享功能
const handleShare = () => {
  // 这里可以实现分享功能，例如复制链接到剪贴板
  ElMessage.success('攻略链接已复制到剪贴板，可以分享给朋友了！');
};

// 组件挂载时获取数据
onMounted(() => {
  const tipId = parseInt(route.params.id);
  
  // 模拟加载过程
  setTimeout(() => {
    tipData.value = fetchTipData(tipId);
    if (tipData.value) {
      relatedTips.value = getRelatedTips(tipId);
    }
    loading.value = false;
  }, 500);
});

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  loading.value = true;
  tipData.value = null;
  relatedTips.value = [];
  
  // 模拟加载过程
  setTimeout(() => {
    tipData.value = fetchTipData(newId);
    if (tipData.value) {
      relatedTips.value = getRelatedTips(newId);
    }
    loading.value = false;
  }, 500);
});
</script>

<style scoped>
.travel-tip-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-container {
  padding: 40px 0;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}

.tip-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;
}

.tip-header:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
  border-radius: 8px;
}

.tip-header-content {
  position: relative;
  z-index: 2;
  padding: 30px;
  color: white;
  width: 100%;
}

.tip-header-content h1 {
  font-size: 36px;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.tip-header-content p {
  font-size: 18px;
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.tip-content {
  display: flex;
  gap: 30px;
}

.content-wrapper {
  flex: 3;
}

.tip-sidebar {
  flex: 1;
}

.tip-detail {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.tip-detail h4 {
  font-size: 20px;
  font-weight: 600;
  margin: 25px 0 15px;
  color: #303133;
  background-color: #f5f7fa;
  padding: 10px 15px;
  border-radius: 4px;
  display: inline-block;
}

.tip-detail h4:first-child {
  margin-top: 0;
}

.tip-detail p {
  margin-bottom: 15px;
  line-height: 1.8;
  color: #606266;
}

.tip-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.sidebar-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.sidebar-card h3 {
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.related-tips {
  margin-top: 10px;
}

.related-tip-card {
  display: block;
  background-color: #fff;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.related-tip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.related-tip-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.related-tip-title {
  font-weight: 500;
  color: #303133;
  margin-right: 10px;
}

.related-tip-arrow {
  flex-shrink: 0;
}

.tip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
  margin-bottom: 25px;
  padding: 20px;
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
  margin: 15px 0;
}

.travel-list li {
  padding: 10px 0;
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
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .tip-content {
    flex-direction: column;
  }
  
  .tip-header {
    height: 300px;
  }
  
  .tip-header-content h1 {
    font-size: 28px;
  }
  
  .tip-header-content p {
    font-size: 16px;
  }
}
</style> 
<template>
  <div class="scenic-spots">
    <!-- 头部横幅 -->
    <div class="page-header">
      <h1>福州景点探索</h1>
      <p>发现福州最受欢迎的旅游景点</p>
    </div>

    <!-- 景点类型标签栏 -->
    <div class="type-tabs-container">
      <div class="type-tabs">
        <span class="type-tab-label">景点类型：</span>
        <div class="type-tabs-list">
          <div 
            class="type-tab" 
            :class="{ active: filters.type === '' }"
            @click="filters.type = ''"
          >
            全部
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'historical' }"
            @click="filters.type = 'historical'"
          >
            历史古迹
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'nature' }"
            @click="filters.type = 'nature'"
          >
            自然风光
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'cultural' }"
            @click="filters.type = 'cultural'"
          >
            文化场所
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'leisure' }"
            @click="filters.type = 'leisure'"
          >
            休闲娱乐
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'museum' }"
            @click="filters.type = 'museum'"
          >
            博物馆
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'temple' }"
            @click="filters.type = 'temple'"
          >
            寺庙
          </div>
          <div 
            class="type-tab" 
            :class="{ active: filters.type === 'lake' }"
            @click="filters.type = 'lake'"
          >
            湖泊
          </div>
        </div>
      </div>
      <div class="price-range">
        <span class="price-range-label">价格区间：</span>
        <div class="price-buttons">
          <el-button 
            size="small" 
            :type="filters.price === '' ? 'primary' : ''" 
            @click="filters.price = ''"
          >
            全部
          </el-button>
          <el-button 
            size="small" 
            :type="filters.price === 'free' ? 'primary' : ''" 
            @click="filters.price = 'free'"
          >
            免费
          </el-button>
        </div>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <div class="filter-item">
          <span class="filter-label">排序方式：</span>
          <el-select v-model="filters.sort" placeholder="排序方式" size="large">
            <el-option label="推荐排序" value="recommended"></el-option>
            <el-option label="评分从高到低" value="rating-desc"></el-option>
            <el-option label="价格从低到高" value="price-asc"></el-option>
            <el-option label="价格从高到低" value="price-desc"></el-option>
          </el-select>
        </div>

        <div class="filter-item search">
          <el-input
            v-model="filters.keyword"
            placeholder="搜索景点名称"
            clearable
            size="large"
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 左侧筛选栏 -->
      <div class="sidebar">
        <div class="filter-card">
          <h3>位置区域</h3>
          <div class="radio-group">
            <div class="radio-item">
              <label class="custom-radio">
                <input type="radio" v-model="filters.area" value="" />
                <span class="radio-circle"></span>
                <span class="radio-text">全部区域</span>
              </label>
              <span class="count">{{ allSpots.length }}</span>
            </div>
            <div v-for="area in areaOptions" :key="area.value" class="radio-item">
              <label class="custom-radio">
                <input type="radio" v-model="filters.area" :value="area.value" />
                <span class="radio-circle"></span>
                <span class="radio-text">{{ area.label }}</span>
              </label>
              <span class="count">({{ area.count }})</span>
            </div>
          </div>
        </div>

        <div class="filter-card">
          <h3>特色主题</h3>
          <div class="radio-group">
            <div class="radio-item">
              <label class="custom-radio">
                <input type="radio" v-model="filters.theme" value="" />
                <span class="radio-circle"></span>
                <span class="radio-text">全部主题</span>
              </label>
              <span class="count">{{ allSpots.length }}</span>
            </div>
            <div v-for="theme in themeOptions" :key="theme.value" class="radio-item">
              <label class="custom-radio">
                <input type="radio" v-model="filters.theme" :value="theme.value" />
                <span class="radio-circle"></span>
                <span class="radio-text">{{ theme.label }}</span>
              </label>
              <span class="count">({{ theme.count }})</span>
            </div>
          </div>
        </div>

        <div class="filter-card">
          <h3>设施服务</h3>
          <div class="checkbox-group">
            <div v-for="facility in facilityOptions" :key="facility.value" class="checkbox-item">
              <label class="custom-checkbox">
                <input type="checkbox" v-model="filters.facilities" :value="facility.value" />
                <span class="checkbox-square"></span>
                <span class="checkbox-text">{{ facility.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧景点列表 -->
      <div class="main-content">
        <div class="result-summary">
          找到 <span class="highlight">{{ filteredSpots.length }}</span> 个景点
        </div>

        <!-- 替换为动态的自定义SpotsGrid -->
        <div class="spots-grid">
          <el-row :gutter="20">
            <el-col v-for="spot in filteredSpots" :key="spot.id" :xs="24" :sm="12" :md="8" :lg="6">
              <el-card class="spot-card" :body-style="{ padding: '0px' }" shadow="hover">
                <div class="spot-image" :style="{ backgroundImage: `url(${spot.imageUrl})` }">
                  <div class="spot-badge" v-if="spot.badge">{{ spot.badge }}</div>
                </div>
                <div class="spot-info">
                  <h3 class="spot-name">{{ spot.name }}</h3>
                  <div class="spot-rating">
                    <el-rate
                      v-model="spot.rating"
                      disabled
                      text-color="#ff9900"
                    />
                    <span class="rating-value">{{ spot.rating }}</span>
                    <span class="reviews-count">({{ spot.reviewsCount }}条评价)</span>
                  </div>
                  <p class="spot-description">{{ spot.description }}</p>
                  <div class="spot-footer">
                    <span class="spot-price">¥{{ spot.price }} <small v-if="spot.price > 0">起</small></span>
                    <el-button type="primary" size="small" @click="goToDetail(spot.id)">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 无结果提示 -->
        <div class="no-result" v-if="filteredSpots.length === 0">
          <el-empty description="没有找到符合条件的景点" :image-size="200">
            <template #description>
              <p>没有找到符合条件的景点，请尝试修改筛选条件</p>
            </template>
            <el-button @click="resetFilters">重置筛选条件</el-button>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllSpots } from '@/data/spotsData'

const router = useRouter()
const route = useRoute()

// 筛选条件
const filters = ref({
  type: '',
  price: '',
  sort: 'recommended',
  keyword: '',
  area: '',
  theme: '',
  facilities: []
})

// 区域选项
const areaOptions = computed(() => {
  const counts = getAreaCounts()
  return [
    { label: '鼓楼区', value: 'gulou', count: counts['gulou'] || 0 },
    { label: '台江区', value: 'taijiang', count: counts['taijiang'] || 0 },
    { label: '仓山区', value: 'cangshan', count: counts['cangshan'] || 0 },
    { label: '晋安区', value: 'jinan', count: counts['jinan'] || 0 },
    { label: '马尾区', value: 'mawei', count: counts['mawei'] || 0 },
    { label: '闽侯县', value: 'minhou', count: counts['minhou'] || 0 },
    { label: '平潭县', value: 'pingtan', count: counts['pingtan'] || 0 }
  ].filter(area => area.count > 0) // 过滤掉没有景点的区域
})

// 主题选项
const themeOptions = computed(() => {
  const themeCounts = getThemeCounts()
  const themes = [
    { label: '亲子游', value: 'family', count: themeCounts['family'] || 0 },
    { label: '文化探索', value: 'culture', count: themeCounts['culture'] || 0 },
    { label: '自然探索', value: 'nature', count: themeCounts['nature'] || 0 },
    { label: '摄影胜地', value: 'photography', count: themeCounts['photography'] || 0 },
    { label: '美食之旅', value: 'food', count: themeCounts['food'] || 0 },
    { label: '情侣约会', value: 'dating', count: themeCounts['dating'] || 0 },
    { label: '休闲娱乐', value: 'leisure', count: themeCounts['leisure'] || 0 }
  ]
  return themes.filter(theme => theme.count > 0) // 过滤掉没有景点的主题
})

// 设施服务选项
const facilityOptions = computed(() => {
  const facilityCounts = getFacilityCounts()
  const facilities = [
    { label: '餐饮服务', value: 'dining', count: facilityCounts['dining'] || 0 },
    { label: '停车场', value: 'parking', count: facilityCounts['parking'] || 0 },
    { label: '导游服务', value: 'guide', count: facilityCounts['guide'] || 0 },
    { label: '洗手间', value: 'restroom', count: facilityCounts['restroom'] || 0 },
    { label: '无障碍设施', value: 'accessibility', count: facilityCounts['accessibility'] || 0 },
    { label: 'WiFi覆盖', value: 'wifi', count: facilityCounts['wifi'] || 0 }
  ]
  return facilities.filter(facility => facility.count > 0) // 过滤掉没有景点的设施
})

// 获取所有景点数据
const allSpots = ref([])

// 在组件挂载时加载数据
onMounted(() => {
  // 从spotsData.js获取所有景点数据
  const spots = getAllSpots()
  
  // 转换数据格式以适应当前组件
  allSpots.value = spots.map(spot => ({
    id: spot.id,
    name: spot.name,
    imageUrl: `/images/spots/${spot.id}.jpg`,
    description: Array.isArray(spot.description) ? spot.description[0] : spot.description,
    rating: spot.rating,
    reviewsCount: spot.reviewsCount,
    price: spot.price,
    badge: spot.price === 0 ? '免费' : null,
    area: getAreaCode(spot.address),
    types: getTypeFromTags(spot.tags),
    themes: getThemesFromTags(spot.tags),
    facilities: getFacilitiesFromFeatures(spot.features)
  }))
})

// 辅助函数：从地址中提取区域代码
function getAreaCode(address) {
  if (address.includes('鼓楼区')) return 'gulou'
  if (address.includes('台江区')) return 'taijiang'
  if (address.includes('仓山区')) return 'cangshan'
  if (address.includes('晋安区')) return 'jinan'
  if (address.includes('马尾区')) return 'mawei'
  if (address.includes('闽侯')) return 'minhou'
  if (address.includes('平潭')) return 'pingtan'
  return 'gulou' // 默认值
}

// 辅助函数：从标签中提取类型
function getTypeFromTags(tags) {
  const types = []
  if (tags.includes('历史古迹')) types.push('historical')
  if (tags.includes('自然风光')) types.push('nature')
  if (tags.includes('公园')) types.push('nature')
  if (tags.includes('文化场所')) types.push('cultural')
  if (tags.includes('休闲娱乐')) types.push('leisure')
  
  // 添加更多类型标签
  if (tags.includes('博物馆')) types.push('museum')
  if (tags.includes('寺庙')) types.push('temple')
  if (tags.includes('古建筑')) types.push('historical')
  if (tags.includes('湖泊')) types.push('lake')
  if (tags.includes('海滨')) types.push('seaside')
  if (tags.includes('商业街')) types.push('shopping')
  if (tags.includes('主题公园')) types.push('theme-park')
  
  return types.length ? types : ['nature'] // 至少返回一个类型
}

// 辅助函数：从标签中提取主题
function getThemesFromTags(tags) {
  const themes = []
  // 亲子游
  if (tags.includes('亲子游') || tags.includes('主题公园') || tags.includes('适合儿童') || 
      tags.includes('游乐设施') || tags.includes('科普教育')) {
    themes.push('family')
  }
  
  // 文化探索
  if (tags.includes('文化景点') || tags.includes('历史古迹') || tags.includes('博物馆') || 
      tags.includes('古建筑') || tags.includes('寺庙') || tags.includes('文物古迹') || 
      tags.includes('非物质文化遗产')) {
    themes.push('culture')
  }
  
  // 自然探索
  if (tags.includes('自然风光') || tags.includes('公园') || tags.includes('山岳') || 
      tags.includes('湖泊') || tags.includes('海滨') || tags.includes('森林') || 
      tags.includes('地质奇观') || tags.includes('生态旅游')) {
    themes.push('nature')
  }
  
  // 摄影胜地
  if (tags.includes('网红打卡地') || tags.includes('景色优美') || tags.includes('日落景观') || 
      tags.includes('观景台') || tags.includes('摄影点')) {
    themes.push('photography')
  }
  
  // 美食之旅
  if (tags.includes('美食之旅') || tags.includes('商业街') || tags.includes('特色小吃') || 
      tags.includes('美食街') || tags.includes('夜市')) {
    themes.push('food')
  }
  
  // 情侣约会
  if (tags.includes('情侣约会') || tags.includes('浪漫') || tags.includes('夜景') || 
      tags.includes('观景平台') || tags.includes('休闲场所')) {
    themes.push('dating')
  }
  
  // 休闲娱乐
  if (tags.includes('休闲娱乐') || tags.includes('购物') || tags.includes('温泉') || 
      tags.includes('水上活动') || tags.includes('户外运动')) {
    themes.push('leisure')
  }
  
  // 确保没有重复的主题
  return [...new Set(themes)].length ? [...new Set(themes)] : ['nature'] // 至少返回一个主题
}

// 辅助函数：从特色中提取设施
function getFacilitiesFromFeatures(features) {
  const facilities = []
  
  // 餐饮服务
  if (features.some(f => f.title.includes('餐') || f.description.includes('餐') || 
                         f.title.includes('美食') || f.description.includes('美食') || 
                         f.title.includes('小吃') || f.description.includes('小吃'))) {
    facilities.push('dining')
  }
  
  // 停车场
  if (features.some(f => f.title.includes('停车') || f.description.includes('停车') || 
                         f.title.includes('泊车') || f.description.includes('泊车'))) {
    facilities.push('parking')
  }
  
  // 导游服务
  if (features.some(f => f.title.includes('导游') || f.description.includes('导游') || 
                         f.title.includes('讲解') || f.description.includes('讲解'))) {
    facilities.push('guide')
  }
  
  // 洗手间
  if (features.some(f => f.title.includes('卫生间') || f.description.includes('卫生间') || 
                         f.title.includes('洗手间') || f.description.includes('洗手间') || 
                         f.title.includes('厕所') || f.description.includes('厕所'))) {
    facilities.push('restroom')
  }
  
  // 无障碍设施
  if (features.some(f => f.title.includes('无障碍') || f.description.includes('无障碍') || 
                         f.title.includes('轮椅') || f.description.includes('轮椅'))) {
    facilities.push('accessibility')
  }
  
  // WiFi覆盖
  if (features.some(f => f.title.includes('WiFi') || f.description.includes('WiFi') || 
                         f.title.includes('网络') || f.description.includes('网络'))) {
    facilities.push('wifi')
  }
  
  return facilities.length ? facilities : ['restroom'] // 至少返回一个设施
}

// 计算每个区域的景点数量
const getAreaCounts = () => {
  const counts = {}
  allSpots.value.forEach(spot => {
    counts[spot.area] = (counts[spot.area] || 0) + 1
  })
  return counts
}

// 计算每个类型的景点数量
const getTypeCounts = () => {
  const counts = {}
  allSpots.value.forEach(spot => {
    spot.types.forEach(type => {
      counts[type] = (counts[type] || 0) + 1
    })
  })
  return counts
}

// 计算每个主题的景点数量
const getThemeCounts = () => {
  const counts = {}
  allSpots.value.forEach(spot => {
    spot.themes.forEach(theme => {
      counts[theme] = (counts[theme] || 0) + 1
    })
  })
  return counts
}

// 计算每个设施的景点数量
const getFacilityCounts = () => {
  const counts = {}
  allSpots.value.forEach(spot => {
    spot.facilities.forEach(facility => {
      counts[facility] = (counts[facility] || 0) + 1
    })
  })
  return counts
}

// 根据URL参数设置初始筛选条件
onMounted(() => {
  if (route.query.keyword) {
    filters.value.keyword = route.query.keyword
  }
})

// 过滤后的景点数据
const filteredSpots = computed(() => {
  let result = [...allSpots.value]
  
  // 按关键词筛选
  if (filters.value.keyword) {
    const keyword = filters.value.keyword.toLowerCase()
    result = result.filter(spot => 
      spot.name.toLowerCase().includes(keyword) || 
      spot.description.toLowerCase().includes(keyword)
    )
  }
  
  // 按类型筛选
  if (filters.value.type) {
    result = result.filter(spot => spot.types.includes(filters.value.type))
  }
  
  // 按价格筛选
  if (filters.value.price) {
    switch (filters.value.price) {
      case 'free':
        result = result.filter(spot => spot.price === 0)
        break
      case 'low':
        result = result.filter(spot => spot.price > 0 && spot.price <= 50)
        break
      case 'medium':
        result = result.filter(spot => spot.price > 50 && spot.price <= 100)
        break
      case 'high':
        result = result.filter(spot => spot.price > 100)
        break
    }
  }
  
  // 按区域筛选
  if (filters.value.area) {
    result = result.filter(spot => spot.area === filters.value.area)
  }
  
  // 按主题筛选
  if (filters.value.theme) {
    result = result.filter(spot => 
      spot.themes.includes(filters.value.theme)
    )
  }
  
  // 按设施筛选
  if (filters.value.facilities.length > 0) {
    result = result.filter(spot => 
      filters.value.facilities.every(facility => spot.facilities.includes(facility))
    )
  }
  
  // 排序
  switch (filters.value.sort) {
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    // 默认是推荐排序，不需要额外处理
  }
  
  return result
})

// 跳转到景点详情
const goToDetail = (id) => {
  router.push(`/spot/${id}`)
}

// 处理搜索
const handleSearch = () => {
  // 搜索功能通过computed filteredSpots自动实现
}

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    type: '',
    price: '',
    sort: 'recommended',
    keyword: '',
    area: '',
    theme: '',
    facilities: []
  }
}
</script>

<style scoped>
.scenic-spots {
  margin-top: 0;
}

.page-header {
  background-color: #1E90FF;
  color: white;
  padding: 30px 0;
  text-align: center;
  margin-bottom: 25px;
  width: 100%;
  position: relative;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header p {
  font-size: 14px;
  opacity: 0.9;
}

.filter-container {
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-label {
  font-weight: 600;
  margin-right: 10px;
  white-space: nowrap;
}

.filter-item.search {
  flex: 1;
  min-width: 200px;
}

.content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 260px;
  flex-shrink: 0;
}

.filter-card {
  background-color: white;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.radio-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-radio, .custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #dcdfe6;
  display: inline-block;
  position: relative;
  margin-right: 10px;
  background-color: #fff;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio input:checked ~ .radio-circle {
  border-color: #409EFF;
}

.custom-radio input:checked ~ .radio-circle:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #409EFF;
}

.radio-text, .checkbox-text {
  font-size: 14px;
  color: #333;
}

.count {
  color: #999;
  font-size: 14px;
  font-weight: normal;
}

.checkbox-square {
  width: 18px;
  height: 18px;
  border: 1.5px solid #dcdfe6;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin-right: 10px;
  background-color: #fff;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox input:checked ~ .checkbox-square {
  background-color: #409EFF;
  border-color: #409EFF;
}

.custom-checkbox input:checked ~ .checkbox-square:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.main-content {
  flex: 1;
}

.result-summary {
  margin-bottom: 20px;
  font-size: 16px;
  color: #606266;
}

.highlight {
  color: #409EFF;
  font-weight: 600;
}

.spots-grid {
  margin-bottom: 30px;
}

.spot-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.spot-card:hover {
  transform: translateY(-5px);
}

.spot-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.spot-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff9900;
  color: white;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
  font-weight: bold;
}

.spot-info {
  padding: 15px;
}

.spot-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #303133;
}

.spot-rating {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.rating-value {
  margin: 0 5px;
  font-weight: 600;
  color: #ff9900;
}

.reviews-count {
  font-size: 12px;
  color: #909399;
}

.spot-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.spot-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spot-price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: 600;
}

.spot-price small {
  font-size: 12px;
  font-weight: normal;
}

.no-result {
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
}

.type-tabs-container {
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-tabs {
  display: flex;
  align-items: center;
  flex: 1;
}

.type-tab-label {
  font-weight: 600;
  margin-right: 10px;
  white-space: nowrap;
  color: #333;
}

.type-tabs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-tab {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  color: #606266;
  background-color: #f5f7fa;
}

.type-tab.active {
  background-color: #409EFF;
  color: white;
}

.price-range {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.price-range-label {
  font-weight: 600;
  margin-right: 10px;
  white-space: nowrap;
  color: #333;
}

.price-buttons {
  display: flex;
  gap: 10px;
}

.price-buttons .el-button {
  padding: 8px 16px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
}

.tag-item {
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  background-color: #f5f7fa;
  color: #606266;
  transition: all 0.3s;
}

.tag-item.active {
  background-color: #409EFF;
  color: white;
}

.tag-count {
  font-size: 12px;
  margin-left: 2px;
  color: inherit;
}
</style> 
<template>
  <div class="spot-detail" v-if="spot">
    <!-- 景点主图 - 替换原轮播图为单张图片 -->
    <div class="spot-gallery">
      <div class="single-image-container">
        <img 
          :src="`/images/spots/${spot.id}.jpg`" 
          :alt="spot.name" 
          class="main-image" 
          @error="handleMainImageError" 
        />
      </div>
    </div>

    <!-- 景点基本信息 -->
    <div class="spot-info-container">
      <div class="spot-header">
        <div class="spot-title">
          <h1>{{ spot.name }}</h1>
          <div class="spot-rating">
            <el-rate v-model="spot.rating" disabled show-score text-color="#ff9900" />
            <span class="rating-value">{{ spot.rating }}</span>
            <span class="reviews-count">({{ spot.reviewsCount }}条评价)</span>
          </div>
        </div>
        <div class="spot-actions">
          <el-button type="primary" size="large" @click="toggleFavorite" :loading="favoriteLoading">
            <el-icon><StarFilled v-if="isFavorite" /><Star v-else /></el-icon>{{ isFavorite ? '已收藏' : '收藏' }}
          </el-button>
        </div>
      </div>

      <el-divider />

      <div class="spot-content">
        <!-- 左侧内容 -->
        <div class="spot-main">
          <div class="spot-tags">
            <el-tag v-for="tag in spot.tags" :key="tag" size="large" effect="plain" class="tag">{{ tag }}</el-tag>
          </div>

          <div class="info-section">
            <h2>景点介绍</h2>
            <div class="spot-description">
              <p v-for="(paragraph, index) in spot.description" :key="index">{{ paragraph }}</p>
            </div>
          </div>

          <div class="info-section">
            <h2>交通指南</h2>
            <div class="transportation">
              <div v-for="(transport, index) in spot.transportation" :key="index" class="transport-item">
                <h3>
                  <el-icon><component :is="transport.icon" /></el-icon>
                  {{ transport.type }}
                </h3>
                <p>{{ transport.description }}</p>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2>景点特色</h2>
            <div class="features">
              <div v-for="(feature, index) in spot.features" :key="index" class="feature-item">
                <el-icon><component :is="feature.icon" /></el-icon>
                <div class="feature-content">
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 位置地图（所有景点都显示） -->
          <div class="info-section" id="map-section">
            <h2>位置地图</h2>
            <div class="location-map-container" ref="mapContainer">
              <iframe 
                v-if="showMap"
                :src="`https://map.baidu.com/search/${encodeURIComponent(spot.name)}/@${spot.coordinates?.lng || 119.2955},${spot.coordinates?.lat || 26.0812},16z?querytype=s&da_src=shareurl&wd=${encodeURIComponent(spot.name)}&c=300`"
                width="100%" 
                height="450" 
                frameborder="0" 
                scrolling="no">
              </iframe>
              <div v-else class="map-placeholder" @click="loadMap">
                <el-icon class="map-icon"><Location /></el-icon>
                <span>点击加载地图</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2>景点评价</h2>
            <SpotRating :spot-id="spotId" />
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="spot-sidebar">
          <div class="sidebar-card">
            <h3>基本信息</h3>
            <ul class="info-list">
              <li>
                <el-icon><Ticket /></el-icon>
                <span class="label">门票：</span>
                <span class="value">{{ spot.price === 0 ? '免费' : `¥${spot.price}` }}</span>
              </li>
              <li>
                <el-icon><Clock /></el-icon>
                <span class="label">开放时间：</span>
                <span class="value">{{ spot.openingHours }}</span>
              </li>
              <li>
                <el-icon><Location /></el-icon>
                <span class="label">地址：</span>
                <span class="value">{{ spot.address }}</span>
              </li>
              <li>
                <el-icon><Phone /></el-icon>
                <span class="label">电话：</span>
                <span class="value">{{ spot.phone }}</span>
              </li>
              <li>
                <el-icon><Link /></el-icon>
                <span class="label">网址：</span>
                <a :href="spot.website" target="_blank" class="value link">官方网站</a>
              </li>
            </ul>
          </div>

          <div class="sidebar-card">
            <h3>附近景点</h3>
            <div class="nearby-spots">
              <template v-if="imagesLoaded">
                <div v-for="(nearby, index) in spot.nearbySpots" :key="index" class="nearby-spot">
                  <img :src="nearby.imageUrl" :alt="nearby.name" class="nearby-image" @error="handleNearbyImageError($event, nearby)" />
                  <div class="nearby-info">
                    <h4>{{ nearby.name }}</h4>
                    <p>距离 {{ nearby.distance }}</p>
                    <div class="rating-wrapper">
                      <el-rate v-model="nearby.rating" disabled size="small" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-for="i in 4" :key="i" class="nearby-spot">
                  <div class="nearby-image-skeleton"></div>
                  <div class="nearby-info">
                    <el-skeleton :rows="3" animated />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <el-skeleton :rows="10" animated />
  </div>
</template>

<script setup>
import { ref, onMounted, provide, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StarFilled, Star, Ticket, Clock, Location, Phone, Link } from '@element-plus/icons-vue'
import SpotRating from '@/components/SpotRating.vue'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'
import { ElMessage } from 'element-plus'
import { getSpotById } from '@/data/spotsData'

const route = useRoute()
const router = useRouter()
const spotId = route.params.id

// 景点数据
const spot = ref(null)
const imagesLoaded = ref(false)

// 用户信息
const user = ref(null)

// 收藏相关
const isFavorite = ref(false)
const favoriteLoading = ref(false)

// 地图相关
const showMap = ref(false)
const mapContainer = ref(null)

// 提供用户信息给子组件
const getCurrentUser = () => {
  return user.value
}
provide('currentUser', getCurrentUser)

// 检查收藏状态
const checkFavoriteStatus = async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      return
    }
    
    user.value = JSON.parse(storedUser)
    const response = await fetch(`/api/favorites/check/${user.value.id}/${spotId}`, {
      headers: {
        'Authorization': `Bearer ${user.value.token}`
      }
    })
    const result = await response.json()
    
    if (result.code === 200) {
      isFavorite.value = result.data
    }
  } catch (error) {
    console.error('检查收藏状态失败:', error)
  }
}

// 切换收藏状态
const toggleFavorite = async () => {
  try {
    if (!user.value) {
      ElMessage.warning('请先登录')
      router.push('/login')
      return
    }

    favoriteLoading.value = true
    
    if (isFavorite.value) {
      // 取消收藏
      const response = await fetch(`/api/favorites/${user.value.id}/${spotId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.value.token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('取消收藏失败')
      }
      
      const result = await response.json()
      if (result.code === 200) {
        isFavorite.value = false
        ElMessage.success('取消收藏成功')
      } else {
        throw new Error(result.message || '取消收藏失败')
      }
    } else {
      // 添加收藏
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.value.token}`
        },
        body: JSON.stringify({
          userId: user.value.id,
          spotId: parseInt(spotId),
          spotName: spot.value.name,
          spotImage: `/images/spots/${spotId}.jpg`
        })
      })
      
      if (!response.ok) {
        throw new Error('添加收藏失败')
      }
      
      const result = await response.json()
      if (result.code === 200) {
        isFavorite.value = true
        ElMessage.success('收藏成功')
      } else {
        throw new Error(result.message || '添加收藏失败')
      }
    }
  } catch (error) {
    console.error('操作收藏失败:', error)
    ElMessage.error(error.message || '操作失败，请稍后重试')
  } finally {
    favoriteLoading.value = false
  }
}

// 加载景点数据
const loadSpotData = async () => {
  try {
    spot.value = await getSpotById(spotId)
    if (!spot.value) {
      router.push('/404')
      return
    }
    await checkFavoriteStatus()
  } catch (error) {
    console.error('加载景点数据失败:', error)
    ElMessage.error('加载数据失败，请稍后重试')
  }
}

// 处理主图加载错误
const handleMainImageError = (e) => {
  e.target.src = '/images/placeholder.jpg'
}

// 处理附近景点图片加载错误
const handleNearbyImageError = (e, nearby) => {
  e.target.src = '/images/placeholder-small.jpg'
}

// 加载地图
const loadMap = () => {
  showMap.value = true
}

onMounted(async () => {
  await loadSpotData()
  imagesLoaded.value = true
})

onUnmounted(() => {
  showMap.value = false
})
</script>

<style scoped>
.spot-detail {
  margin-top: -20px;
}

.spot-gallery {
  margin-bottom: 30px;
}

.single-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

.spot-info-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 40px;
}

.spot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.spot-title h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #303133;
}

.spot-rating {
  display: flex;
  align-items: center;
}

.rating-value {
  margin: 0 5px;
  font-weight: 600;
  color: #ff9900;
}

.reviews-count {
  color: #909399;
}

.spot-actions {
  display: flex;
  gap: 10px;
}

.spot-content {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.spot-main {
  flex: 1;
}

.spot-tags {
  margin-bottom: 20px;
}

.tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

.info-section {
  margin-bottom: 40px;
}

.info-section h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #303133;
  position: relative;
  padding-left: 12px;
}

.info-section h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 4px;
  background-color: #409EFF;
  border-radius: 2px;
}

.spot-description p {
  margin-bottom: 15px;
  line-height: 1.8;
  text-align: justify;
  color: #606266;
}

.transportation {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.transport-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.transport-item h3 {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.transport-item h3 .el-icon {
  margin-right: 10px;
  color: #409EFF;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.feature-item .el-icon {
  font-size: 24px;
  color: #409EFF;
  margin-right: 15px;
  margin-top: 5px;
}

.feature-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #303133;
}

.feature-content p {
  color: #606266;
  line-height: 1.6;
}

.spot-sidebar {
  width: 350px;
  flex-shrink: 0;
}

.sidebar-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.sidebar-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  color: #606266;
}

.info-list .el-icon {
  color: #409EFF;
  margin-right: 10px;
  margin-top: 3px;
}

.info-list .label {
  font-weight: 600;
  width: 80px;
}

.info-list .value {
  flex: 1;
}

.info-list .link {
  color: #409EFF;
  text-decoration: none;
}

.info-list .link:hover {
  text-decoration: underline;
}

.map-container {
  text-align: center;
}

.map-image-container {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-actions {
  display: flex;
  justify-content: center;
}

.nearby-spots {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nearby-spot {
  display: flex;
  align-items: center;
  height: 80px;
}

.nearby-image {
  width: 80px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 15px;
  flex-shrink: 0;
}

.nearby-info {
  flex: 1;
}

.nearby-info h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #303133;
}

.nearby-info p {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.rating-wrapper {
  height: 20px;
  display: flex;
  align-items: center;
}

/* 添加评分组件固定高度 */
.nearby-info .el-rate {
  height: 20px;
  line-height: 1;
  display: flex;
}

.loading {
  padding: 40px;
}

@media (max-width: 992px) {
  .spot-content {
    flex-direction: column;
  }
  
  .spot-sidebar {
    width: 100%;
  }
}

.nearby-image-skeleton {
  width: 80px;
  height: 60px;
  background-color: #f2f2f2;
  border-radius: 4px;
  margin-right: 15px;
  flex-shrink: 0;
}

.map-image-skeleton {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 8px;
}

.location-map-container {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.map-placeholder {
  width: 100%;
  height: 450px;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.map-placeholder:hover {
  background-color: #e4e7ed;
}

.map-icon {
  font-size: 48px;
  color: #909399;
  margin-bottom: 16px;
}

.map-placeholder span {
  color: #909399;
  font-size: 16px;
}
</style> 
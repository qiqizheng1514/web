<template>
  <div class="carousel-container">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
        <div class="carousel-content" :style="{ backgroundImage: `url(/images/banner/banner${getBannerUrl(item.id)}.jpg)` }">
          <div v-if="loadErrors[index]" class="error-overlay">
            <el-icon class="error-icon"><Warning /></el-icon>
            <span>图片加载失败</span>
          </div>
          <div class="carousel-caption">
            <h2>{{ item.name }}</h2>
            <p>{{ Array.isArray(item.description) ? item.description[0] : item.description }}</p>
            <el-button type="primary" @click="navigateTo(`/spot/${item.id}`)">查看详情</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Warning } from '@element-plus/icons-vue'
import { getRecommendedSpots } from '@/data/spotsData'

const router = useRouter()

// 轮播图数据
const carouselImages = ref([])
// 记录加载错误
const loadErrors = ref({})

// banner图片映射关系
const bannerMap = ref({
  1: 1,  // 三坊七巷
  2: 4,  // 福州西湖公园
  3: 3,  // 烟台山
  4: 2,  // 鼓山
  5: 5,  // 国家森林公园
  6: 1,  // 左海公园
  7: 2,  // 乌山风景区
  8: 3,  // 金牛山公园
  9: 4,  // 闽江公园
  10: 5, // 温泉公园
  11: 1, // 福州动物园
  12: 5, // 海峡文化艺术中心
  13: 3, // 福州大学
  14: 3, // 福建博物院
  15: 3, // 福州规划展览馆
  16: 1, // 福州科技馆
  17: 2, // 海峡青年交流营地
  18: 3, // 福州海洋世界
  19: 4, // 福州园林公园
  20: 5  // 福州市博物馆
})

// 获取景点对应的banner图片URL
const getBannerUrl = (spotId) => {
  const bannerId = bannerMap.value[spotId] || (spotId % 5) + 1
  console.log(`Spot ${spotId} is mapped to banner${bannerId}.jpg`)
  return bannerId
}

// 预加载图片并验证是否存在
const preloadImage = (index, id) => {
  return new Promise((resolve) => {
    const img = new Image()
    const bannerId = getBannerUrl(id)
    const imgUrl = `/images/banner/banner${bannerId}.jpg`
    console.log(`Attempting to load ${imgUrl} for spot ${id}`)
    
    img.onload = () => {
      loadErrors.value[index] = false
      console.log(`Successfully loaded ${imgUrl} for spot ${id}`)
      resolve(true)
    }
    
    img.onerror = (error) => {
      loadErrors.value[index] = true
      console.error(`Failed to load ${imgUrl} for spot ${id}:`, error)
      resolve(false)
    }
    
    img.src = imgUrl
  })
}

// 导航到详情页
const navigateTo = (path) => {
  router.push(path)
}

// 组件挂载时获取数据
onMounted(async () => {
  console.log('Component mounted, getting recommended spots...')
  // 获取推荐景点（评分最高的5个）
  carouselImages.value = getRecommendedSpots(5)
  console.log('Recommended spots:', carouselImages.value)
  
  // 预加载所有图片
  carouselImages.value.forEach((item, index) => {
    console.log(`Processing spot ${item.id} (${item.name})`)
    preloadImage(index, item.id)
  })
})
</script>

<style scoped>
.carousel-container {
  margin: 30px 0;
}

.carousel-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background-color: #f5f7fa;
}

.carousel-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-icon {
  font-size: 32px;
  color: #409EFF;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  padding: 30px;
  text-align: left;
}

.carousel-caption h2 {
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
}

.carousel-caption p {
  font-size: 16px;
  margin-bottom: 15px;
  opacity: 0.9;
}

.el-carousel__item {
  border-radius: 8px;
  overflow: hidden;
}

.error-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f56c6c;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
</style> 
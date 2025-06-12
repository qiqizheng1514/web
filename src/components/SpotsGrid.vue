<template>
  <div class="spots-grid">
    <el-row :gutter="20">
      <el-col v-for="spot in spots" :key="spot.id" :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="spot-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="spot-image-container">
            <div v-if="loadedImages[spot.id]" class="spot-image" :style="{ backgroundImage: `url(/images/spots/${spot.id}.jpg)` }">
              <div class="spot-badge" v-if="spot.price === 0">免费</div>
              <div class="spot-badge" v-else-if="spot.rating >= 4.6">热门</div>
            </div>
            <div v-else class="spot-image-skeleton">
              <div class="spot-badge" v-if="spot.price === 0">免费</div>
              <div class="spot-badge" v-else-if="spot.rating >= 4.6">热门</div>
            </div>
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
            <p class="spot-description">{{ Array.isArray(spot.description) ? spot.description[0] : spot.description }}</p>
            <div class="spot-footer">
              <span class="spot-price">¥{{ spot.price }} <small v-if="spot.price > 0">起</small></span>
              <el-button type="primary" size="small" @click="goToDetail(spot.id)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecommendedSpots } from '@/data/spotsData'

const router = useRouter()

// 记录已加载的图片
const loadedImages = ref({})

// 从spotsData.js获取推荐景点数据
const spots = ref([])

// 预加载图片
const preloadImage = (spotId) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedImages.value[spotId] = true;
      resolve();
    };
    img.onerror = () => {
      // 加载失败时也标记为已加载，使用默认图片
      loadedImages.value[spotId] = true;
      resolve();
    };
    img.src = `/images/spots/${spotId}.jpg`;
  });
};

// 跳转到景点详情
const goToDetail = (id) => {
  router.push(`/spot/${id}`)
}

// 组件挂载时获取数据并预加载图片
onMounted(() => {
  // 获取推荐景点（评分最高的8个）
  spots.value = getRecommendedSpots(8);
  
  // 预加载图片
  spots.value.forEach(spot => {
    preloadImage(spot.id);
  });
});
</script>

<style scoped>
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

.spot-image-container {
  height: 200px;
  position: relative;
}

.spot-image {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.spot-image-skeleton {
  height: 100%;
  width: 100%;
  background-color: #f2f2f2;
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
</style> 
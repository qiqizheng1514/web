<template>
  <div class="rating-container">
    <h3 class="rating-title">景点评价</h3>
    
    <!-- 评分统计 -->
    <div class="rating-summary">
      <div class="rating-score">
        <span class="score">{{ stats.averageScore }}</span>
        <div class="stars">
          <el-rate
            v-model="stats.averageScore"
            disabled
            show-score
            text-color="#ff9900"
          />
        </div>
        <span class="total-reviews">{{ stats.totalCount }}条评价</span>
      </div>
      <div class="rating-distribution">
        <div v-for="i in 5" :key="i" class="rating-bar">
          <span class="stars-label">{{ 6 - i }}星</span>
          <el-progress 
            :percentage="getScorePercentage(6 - i)" 
            :stroke-width="15" 
            :color="ratingColors[6 - i - 1]"
          />
          <span class="count">{{ getScoreCount(6 - i) }}</span>
        </div>
      </div>
    </div>
    
    <!-- 用户评价表单 -->
    <div class="rating-form">
      <h4>发表您的评价</h4>
      <div v-if="!currentUser" class="login-notice">
        <el-alert
          title="请先登录后再发表评价"
          type="info"
          :closable="false"
          show-icon
        >
          <template #default>
            您需要 <el-button type="primary" link @click="redirectToLogin">登录</el-button> 后才能发表评价
          </template>
        </el-alert>
      </div>
      <template v-else>
        <div class="form-item">
          <span class="label">您的评分：</span>
          <el-rate
            v-model="userRating.score"
            allow-half
            :colors="ratingColors"
          />
        </div>
        <div class="form-item">
          <el-input
            v-model="userRating.title"
            placeholder="标题（选填）"
            maxlength="50"
            show-word-limit
          />
        </div>
        <div class="form-item">
          <el-input
            v-model="userRating.content"
            type="textarea"
            placeholder="分享您的旅游体验..."
            :rows="4"
            maxlength="200"
            show-word-limit
          />
        </div>
        <div class="form-actions">
          <el-button type="primary" @click="submitReview" :loading="submitLoading">提交评价</el-button>
        </div>
      </template>
    </div>
    
    <!-- 评价列表 -->
    <div class="reviews-list">
      <h4>用户评价 ({{ reviews.length }})</h4>
      <el-empty v-if="!reviews || reviews.length === 0" description="暂无评价"></el-empty>
      <div v-else class="review-items">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <div class="reviewer-info">
              <el-avatar :size="40" :src="review.avatar || '/images/avatar/default-avatar.png'">
                <ImagePlaceholder :width="40" :height="40" :text="review.username ? review.username.charAt(0) : '?' " :border-radius="20" />
              </el-avatar>
              <div class="reviewer-name">
                <span>{{ review.username }}</span>
                <el-rate
                  v-model="review.rating"
                  disabled
                  :colors="ratingColors"
                />
              </div>
            </div>
            <div class="review-date">{{ formatDate(review.createTime) }}</div>
          </div>
          <div class="review-content">
            <h5 v-if="review.title">{{ review.title }}</h5>
            <p>{{ review.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'

const router = useRouter()

const props = defineProps({
  spotId: {
    type: [String, Number],
    required: true
  }
})

// 从父组件注入当前用户信息
const currentUserGetter = inject('currentUser', () => null)
const currentUser = computed(() => currentUserGetter())

// 颜色配置
const ratingColors = ['#F56C6C', '#F56C6C', '#E6A23C', '#67C23A', '#67C23A']

// 加载状态
const submitLoading = ref(false)

// 用户评价
const userRating = ref({
  spotId: Number(props.spotId),
  score: 5,
  title: '',
  content: ''
})

// 评价列表
const reviews = ref([])

// 评价统计数据
const stats = ref({
  averageScore: 0,
  totalCount: 0,
  scoreDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }
})

// 重定向到登录页面
const redirectToLogin = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  ElMessage.info('请在页面顶部登录后再发表评价')
}

// 获取评价统计数据
const fetchReviewStats = async () => {
  try {
    const response = await fetch(`/api/reviews/stats/${props.spotId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.code === 200) {
      stats.value = {
        averageScore: Number(result.data.averageRating || 0).toFixed(1),
        totalCount: result.data.totalCount || 0,
        scoreDistribution: result.data.ratingDistribution || {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      }
    } else {
      console.error('获取评价统计数据失败:', result.message)
      throw new Error(result.message || '获取评价统计数据失败')
    }
  } catch (error) {
    console.error('获取评价统计数据出错:', error)
    stats.value = {
      averageScore: 0,
      totalCount: 0,
      scoreDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }
}

// 获取评价列表
const fetchReviews = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: '加载评价中...',
    background: 'rgba(255, 255, 255, 0.7)'
  })
  
  try {
    console.log('开始获取景点评价列表, spotId:', props.spotId)
    const response = await fetch(`/api/reviews/spot/${props.spotId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('获取到评价数据:', result)
    
    if (result.code === 200 && Array.isArray(result.data)) {
      reviews.value = result.data.map(review => {
        if (!review || typeof review !== 'object') {
          console.error('无效的评价数据:', review)
          return null
        }
        return {
          id: review.id,
          username: review.username || '匿名用户',
          avatar: review.avatar,
          rating: review.rating || 0,
          title: review.title || '',
          content: review.content || '暂无评价内容',
          createTime: review.createTime
        }
      }).filter(Boolean)
    } else {
      console.error('获取评价数据失败:', result.message)
      reviews.value = []
    }
  } catch (error) {
    console.error('获取评价数据出错:', error)
    reviews.value = []
  } finally {
    loading.close()
  }
}

// 组件挂载时加载数据
onMounted(() => {
  fetchReviewStats()
  fetchReviews()
})

// 获取各评分等级的百分比
const getScorePercentage = (score) => {
  if (!stats.value.scoreDistribution) return 0
  
  const count = stats.value.scoreDistribution[score] || 0
  return stats.value.totalCount > 0 
    ? Math.round((count / stats.value.totalCount) * 100) 
    : 0
}

// 获取各评分等级的数量
const getScoreCount = (score) => {
  if (!stats.value.scoreDistribution) return 0
  return stats.value.scoreDistribution[score] || 0
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 提交评价
const submitReview = async () => {
  // 检查用户是否登录
  if (!currentUser.value) {
    ElMessage.warning('请先登录后再发表评价')
    redirectToLogin()
    return
  }

  if (userRating.value.score === 0) {
    ElMessage.warning('请先给出您的评分')
    return
  }
  
  if (!userRating.value.content.trim()) {
    ElMessage.warning('请填写评价内容')
    return
  }
  
  if (userRating.value.content.length < 5) {
    ElMessage.warning('评价内容至少需要5个字符')
    return
  }
  
  submitLoading.value = true
  
  try {
    console.log('准备提交评价:', {
      spotId: Number(props.spotId),
      userId: currentUser.value.id,
      rating: userRating.value.score,
      content: userRating.value.content,
      title: userRating.value.title
    })
    
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.value.token}`
      },
      body: JSON.stringify({
        spotId: Number(props.spotId),
        userId: currentUser.value.id,
        rating: userRating.value.score,
        content: userRating.value.content,
        title: userRating.value.title || null
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('评价提交结果:', result)
    
    if (result.code === 200) {
      ElMessage.success('评价提交成功！')
      
      // 将新评价直接添加到列表开头
      const newReview = {
        id: result.data.id,
        username: currentUser.value.username,
        avatar: currentUser.value.avatar,
        rating: userRating.value.score,
        title: userRating.value.title,
        content: userRating.value.content,
        createTime: new Date().toISOString()
      }
      reviews.value.unshift(newReview)
      
      // 重置表单
      userRating.value = {
        spotId: Number(props.spotId),
        score: 5,
        title: '',
        content: ''
      }
      
      // 后台更新统计数据
      fetchReviewStats()
    } else {
      throw new Error(result.message || '评价提交失败')
    }
  } catch (error) {
    console.error('提交评价出错:', error)
    ElMessage.error(error.message || '评价提交失败，请稍后再试')
  } finally {
    submitLoading.value = false
  }
}
</script>

<style scoped>
.rating-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
}

.rating-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #303133;
  font-weight: 600;
}

.rating-summary {
  display: flex;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 30px;
}

.rating-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  border-right: 1px solid #e4e7ed;
  margin-right: 30px;
  min-width: 150px;
}

.score {
  font-size: 48px;
  font-weight: bold;
  color: #ff9900;
}

.stars {
  margin: 10px 0;
}

.total-reviews {
  color: #909399;
  font-size: 14px;
}

.rating-distribution {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rating-bar {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stars-label {
  width: 40px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color: #606266;
}

.count {
  margin-left: 10px;
  font-size: 14px;
  color: #909399;
  width: 30px;
}

.rating-form {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.login-notice {
  margin: 20px 0;
}

.rating-form h4 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #303133;
  font-weight: 600;
}

.form-item {
  margin-bottom: 20px;
}

.form-item .label {
  display: inline-block;
  margin-bottom: 10px;
  color: #606266;
}

.form-actions {
  text-align: right;
}

.reviews-list {
  margin-top: 30px;
}

.reviews-list h4 {
  margin-bottom: 20px;
  color: #303133;
  font-weight: 600;
}

.review-items {
  margin-top: 20px;
}

.review-item {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  align-items: center;
}

.reviewer-name {
  margin-left: 15px;
}

.reviewer-name span {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.review-date {
  color: #909399;
  font-size: 14px;
}

.review-content h5 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #303133;
  font-weight: 600;
}

.review-content p {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 0;
}
</style> 
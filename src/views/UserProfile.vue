<template>
  <div class="user-profile">
    <div class="profile-header">
      <div class="profile-avatar">
        <el-avatar :size="80" :src="user?.avatar || '/images/avatar/default-avatar.png'" />
      </div>
      <div class="profile-info">
        <h1>{{ user?.nickname || user?.username }}</h1>
        <p class="join-date">加入时间：{{ formatDate(user?.createTime) }}</p>
      </div>
    </div>

    <el-tabs v-model="activeTab" class="profile-tabs">
      <el-tab-pane label="我的收藏" name="favorites">
        <div class="favorites-container" v-loading="loading">
          <template v-if="favorites.length > 0">
            <div class="favorites-grid">
              <el-card v-for="favorite in favorites" :key="favorite.id" class="favorite-card" shadow="hover">
                <div class="favorite-image">
                  <img 
                    :src="favorite.spotImage" 
                    :alt="favorite.spotName" 
                    @error="handleImageError"
                    class="spot-image"
                  />
                </div>
                <div class="favorite-content">
                  <h3>{{ favorite.spotName }}</h3>
                  <p>收藏于 {{ formatDate(favorite.createTime) }}</p>
                  <div class="favorite-actions">
                    <el-button type="primary" size="small" @click="viewSpot(favorite.spotId)">查看详情</el-button>
                    <el-button type="danger" size="small" @click="removeFavorite(favorite)">取消收藏</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </template>
          <el-empty v-else description="暂无收藏" />
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="个人信息" name="info">
        <div class="user-info-container">
          <el-form :model="userInfo" label-width="100px">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.username" disabled />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userInfo.nickname" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo" :loading="updating">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const router = useRouter()
const user = ref(null)
const activeTab = ref('favorites')
const favorites = ref([])
const loading = ref(false)
const updating = ref(false)

// 用户信息表单
const userInfo = reactive({
  username: '',
  nickname: ''
})

onMounted(() => {
  // 从本地存储加载用户信息
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
      // 填充用户信息表单
      userInfo.username = user.value.username || ''
      userInfo.nickname = user.value.nickname || ''
      
      // 加载用户收藏
      loadUserFavorites()
    } catch (e) {
      localStorage.removeItem('user')
      router.push('/login')
    }
  } else {
    // 未登录，跳转到登录页
    ElMessage.warning('请先登录')
    router.push('/login')
  }
})

// 加载用户收藏
async function loadUserFavorites() {
  if (!user.value || !user.value.id) {
    console.error('无法加载收藏：用户ID不存在')
    return
  }
  
  try {
    loading.value = true
    console.log('开始加载用户收藏，用户ID:', user.value.id)
    
    const response = await fetch(`/api/favorites/user/${user.value.id}`, {
      headers: {
        'Authorization': `Bearer ${user.value.token}`
      }
    })
    console.log('收藏API响应状态:', response.status)
    
    if (!response.ok) {
      if (response.status === 401) {
        ElMessage.error('登录已过期，请重新登录')
        localStorage.removeItem('user')
        router.push('/login')
        return
      }
      const errorText = await response.text()
      console.error('获取收藏列表失败，服务器响应:', errorText)
      throw new Error('获取收藏列表失败')
    }
    
    const data = await response.json()
    console.log('收藏数据:', data)
    favorites.value = data.data || []
    console.log(`成功加载 ${favorites.value.length} 个收藏项目`)
    
    loading.value = false
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    ElMessage.error('获取收藏列表失败，请稍后重试')
    loading.value = false
  }
}

// 查看景点详情
function viewSpot(spotId) {
  router.push(`/spot/${spotId}`)
}

// 取消收藏
function removeFavorite(favorite) {
  ElMessageBox.confirm(`确定要取消收藏"${favorite.spotName}"吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await fetch(`/api/favorites/${user.value.id}/${favorite.spotId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.value.token}`
        }
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          ElMessage.error('登录已过期，请重新登录')
          localStorage.removeItem('user')
          router.push('/login')
          return
        }
        throw new Error('取消收藏失败')
      }
      
      // 从列表中移除
      favorites.value = favorites.value.filter(item => item.id !== favorite.id)
      ElMessage.success('取消收藏成功')
    } catch (error) {
      console.error('取消收藏失败:', error)
      ElMessage.error('取消收藏失败，请稍后重试')
    }
  }).catch(() => {})
}

// 更新用户信息
async function updateUserInfo() {
  if (!user.value || !user.value.id) return
  
  try {
    updating.value = true
    
    const response = await fetch(`/api/users/${user.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: userInfo.nickname
      })
    })
    
    if (!response.ok) {
      throw new Error('更新用户信息失败')
    }
    
    const data = await response.json()
    
    // 更新本地存储的用户信息
    user.value = {
      ...user.value,
      nickname: userInfo.nickname
    }
    localStorage.setItem('user', JSON.stringify(user.value))
    
    ElMessage.success('个人信息更新成功')
  } catch (error) {
    console.error('更新用户信息失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  } finally {
    updating.value = false
  }
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '未知'
  
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 图片加载错误处理
function handleImageError(event) {
  event.target.src = '/images/spots/default-spot.jpg'
}
</script>

<style scoped>
.user-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  margin-right: 20px;
}

.profile-info h1 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.join-date {
  margin: 5px 0 0;
  color: #909399;
}

.favorites-container {
  min-height: 200px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.favorite-card {
  transition: transform 0.3s;
}

.favorite-card:hover {
  transform: translateY(-5px);
}

.favorite-image {
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 15px;
}

.spot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.spot-image:hover {
  transform: scale(1.05);
}

.favorite-content h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #303133;
}

.favorite-content p {
  margin: 0 0 15px;
  color: #909399;
  font-size: 14px;
}

.favorite-actions {
  display: flex;
  gap: 10px;
}

.user-info-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.profile-tabs {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    margin: 0 0 15px;
  }
}
</style> 
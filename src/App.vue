<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">
        <img src="./assets/images/logo.svg" alt="福州旅游" class="logo-img" />
        <h1>福州旅游指南</h1>
      </div>
      <nav class="nav">
        <el-menu mode="horizontal" router :ellipsis="false" class="nav-menu">
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>首页
          </el-menu-item>
          <el-menu-item index="/spots">
            <el-icon><Place /></el-icon>景点探索
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>关于福州
          </el-menu-item>
          <el-sub-menu index="user" v-if="isLoggedIn">
            <template #title>
              <el-icon><User /></el-icon>{{ user?.nickname || user?.username || '个人中心' }}
            </template>
            <el-menu-item index="/profile">
              <el-icon><Setting /></el-icon>个人中心
            </el-menu-item>
            <el-menu-item @click="logout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else index="/login">
            <el-icon><User /></el-icon>登录
          </el-menu-item>
        </el-menu>
      </nav>
    </header>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <p>© 2025 福州旅游指南 | 联系我们 | 隐私政策</p>
    </footer>
  </div>
</template>

<script setup>
import { HomeFilled, Place, InfoFilled, User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { provide, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isLoggedIn = ref(false)
const user = ref(null)

// 全局图片预加载管理器
const imagePreloader = reactive({
  cache: new Map(),
  preload(url) {
    if (!url || this.cache.has(url)) return Promise.resolve(url);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, true);
        resolve(url);
      };
      img.onerror = () => {
        this.cache.set(url, false);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });
  },
  isLoaded(url) {
    return this.cache.has(url) && this.cache.get(url) === true;
  }
});

// 提供给所有组件使用
provide('imagePreloader', imagePreloader);

// 验证用户登录状态
const validateUserSession = async () => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) {
    return false;
  }
  
  try {
    // 解析用户数据
    const userData = JSON.parse(savedUser);
    
    // 验证用户会话是否有效
    const response = await fetch('/api/auth/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token || 'invalid-token'}`
      }
    }).catch(error => {
      console.error('验证会话时出错:', error);
      return { ok: false };
    });
    
    if (!response.ok) {
      console.log('用户会话已过期或无效');
      localStorage.removeItem('user');
      return false;
    }
    
    // 解析响应
    const result = await response.json();
    if (!result.success) {
      console.log('会话验证失败:', result.message);
      localStorage.removeItem('user');
      return false;
    }
    
    // 会话有效
    return userData;
  } catch (e) {
    console.error('解析用户信息失败:', e);
    localStorage.removeItem('user');
    return false;
  }
};

// 提供用户状态给子组件
provide('currentUser', {
  user: user,
  isLoggedIn: isLoggedIn,
  updateUser: (newUser) => {
    user.value = newUser;
    isLoggedIn.value = !!newUser;
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  },
  logout: () => {
    localStorage.removeItem('user');
    user.value = null;
    isLoggedIn.value = false;
    ElMessage.success('退出登录成功');
    router.push('/');
  }
});

// 在onMounted中添加加载用户信息的代码
onMounted(async () => {
  // 验证并加载用户信息
  const validUser = await validateUserSession();
  
  if (validUser) {
    user.value = validUser;
    isLoggedIn.value = true;
    console.log('用户已登录且会话有效:', user.value.username);
  } else {
    console.log('用户未登录或会话已过期');
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('user');
  }
});

// 退出登录
function logout() {
  // 使用提供的logout方法
  const currentUser = {
    user: user,
    isLoggedIn: isLoggedIn,
    updateUser: (newUser) => {
      user.value = newUser;
      isLoggedIn.value = !!newUser;
      localStorage.setItem('user', JSON.stringify(newUser));
    },
    logout: () => {
      localStorage.removeItem('user');
      user.value = null;
      isLoggedIn.value = false;
      ElMessage.success('退出登录成功');
      router.push('/');
    }
  };
  
  currentUser.logout();
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  color: #333;
  background-color: #f5f7fa;
}

/* 全局图片加载样式 */
img {
  transition: opacity 0.5s ease, filter 0.5s ease;
  will-change: opacity, filter;
}

img.loading {
  opacity: 0;
  filter: blur(10px);
}

/* 骨架屏通用样式 */
.skeleton-bg {
  background-color: #f2f2f2;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  will-change: background-position;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 图片容器通用样式 */
.image-container {
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  z-index: 1;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.image-loaded .image-placeholder {
  opacity: 0;
  z-index: -1;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 22px;
  color: #409EFF;
  font-weight: 600;
}

.nav-menu {
  border-bottom: none;
}

.main-content {
  flex: 1;
  padding: 20px 50px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
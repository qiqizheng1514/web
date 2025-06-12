<template>
  <div class="login-container">
    <div class="login-box">
      <h2>用户登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%;">登录</el-button>
        </el-form-item>
        <div class="register-link">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const loginFormRef = ref(null)
const loading = ref(false)
const userState = inject('currentUser')

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    
    try {
      loading.value = true
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      })
      
      // 解析JSON响应
      const result = await response.json()
      
      // 检查响应状态和业务状态码
      if (!response.ok || result.code !== 200) {
        const errorMessage = result.message || '用户名或密码错误'
        throw new Error(errorMessage)
      }
      
      // 检查返回的数据是否有效
      if (!result.data || !result.data.id || !result.data.username) {
        throw new Error('登录失败：无效的用户数据')
      }
      
      // 登录成功，保存用户信息
      localStorage.setItem('user', JSON.stringify(result.data))
      
      // 更新全局状态
      if (userState) {
        userState.updateUser(result.data)
      }
      
      ElMessage.success('登录成功')
      
      // 使用路由跳转到个人中心页面
      router.push('/profile')
    } catch (error) {
      console.error('登录失败:', error)
      ElMessage.error(error.message || '登录失败，请稍后重试')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: #f5f7fa;
}

.login-box {
  width: 400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  color: #606266;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style> 
<template>
  <div class="register-container">
    <div class="register-box">
      <h2>用户注册</h2>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" :loading="loading" style="width: 100%;">注册</el-button>
        </el-form-item>
        <div class="login-link">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const registerFormRef = ref(null)
const loading = ref(false)

// 注册表单数据
const registerForm = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

// 验证密码是否一致
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' },
    { 
      validator: async (rule, value, callback) => {
        if (value && value.length >= 3) {
          try {
            // 检查用户名是否已存在
            const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(value)}`);
            const result = await response.json();
            
            if (result.data === true) {
              callback(new Error('用户名已存在'));
            } else {
              callback();
            }
          } catch (error) {
            console.error('检查用户名失败:', error);
            callback();
          }
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度应为2-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}

// 处理注册
const handleRegister = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) return
    
    try {
      loading.value = true
      
      // 发送注册请求
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: registerForm.username,
          nickname: registerForm.nickname,
          password: registerForm.password
        })
      })
      
      // 解析JSON响应
      const result = await response.json();
      
      // 检查是否成功
      if (!response.ok || result.code !== 200) {
        const errorMessage = result.message || '注册失败，请稍后再试';
        
        // 特别处理用户名已存在的情况
        if (errorMessage.includes('用户名已存在')) {
          registerFormRef.value.fields.find(field => field.prop === 'username').validateState = 'error';
          registerFormRef.value.fields.find(field => field.prop === 'username').validateMessage = '用户名已存在';
          throw new Error('用户名已存在，请更换其他用户名');
        }
        
        throw new Error(errorMessage);
      }
      
      ElMessage.success('注册成功，请登录');
      router.push('/login');
    } catch (error) {
      console.error('注册失败:', error);
      ElMessage.error(error.message || '注册失败，请稍后重试');
    } finally {
      loading.value = false;
    }
  });
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: #f5f7fa;
}

.register-box {
  width: 500px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.register-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.login-link a {
  color: #409EFF;
  text-decoration: none;
}

.login-link a:hover {
  color: #66b1ff;
}
</style> 
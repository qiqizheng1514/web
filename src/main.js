import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

// 添加全局图片加载指令
app.directive('img-loader', {
  mounted(el) {
    // 添加loading类，初始不显示
    el.classList.add('loading');
    
    // 创建一个新的图片对象来预加载
    const img = new Image();
    img.onload = () => {
      // 图片加载完成后移除loading类
      el.classList.remove('loading');
    };
    img.onerror = () => {
      // 图片加载错误时也移除loading类，显示替代图片
      el.classList.remove('loading');
      // 可以设置默认图片
      if (el.getAttribute('data-fallback')) {
        el.src = el.getAttribute('data-fallback');
      }
    };
    // 开始加载
    img.src = el.src;
  }
});

app.mount('#app') 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 根据环境变量确定API基础路径
  define: {
    // 将API基础URL注入为全局变量
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://cpp.openeee.cn/api'
        : 'http://localhost:58010'
    )
  },
  // 开发环境代理配置
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:58010',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

<template>
  <div>
    <div class="mb-6 flex items-center">
      <router-link to="/home" class="text-primary-500 hover:text-primary-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回图元列表
      </router-link>
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <strong class="font-bold">错误：</strong>
      <span class="block sm:inline">{{ error }}</span>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="card">
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">加载中...</span>
      </div>
    </div>
    
    <div v-else-if="shape" class="card">
      <div class="flex flex-col md:flex-row md:space-x-8">
        <!-- Shape preview -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 flex justify-center items-center" style="height: 250px;">
            <ShapePreview :shape="shape" :size="220" :interactive="true" />
          </div>
        </div>
        
        <!-- Shape details -->
        <div class="w-full md:w-2/3">
          <div class="flex justify-between items-start mb-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ shape.name }}</h1>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                  :class="typeClass">
              {{ typeTranslations[shape.type] || shape.type }}
            </span>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">详细信息</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span class="text-sm text-gray-500 dark:text-gray-400">ID</span>
                <p class="font-medium text-gray-900 dark:text-white">{{ shape.id }}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span class="text-sm text-gray-500 dark:text-gray-400">图形类型</span>
                <p class="font-medium text-gray-900 dark:text-white">{{ typeTranslations[shape.type] || shape.type }}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span class="text-sm text-gray-500 dark:text-gray-400">颜色</span>
                <div class="flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: shape.color }"></div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ shape.color }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span class="text-sm text-gray-500 dark:text-gray-400">位置</span>
                <p class="font-medium text-gray-900 dark:text-white">
                  x: {{ shape.position.x }}, y: {{ shape.position.y }}, z: {{ shape.position.z }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">属性</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(value, key) in (shape.properties || {})" :key="key" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ propertyTranslations[key] || key }}</span>
                <p class="font-medium text-gray-900 dark:text-white">{{ value }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4">
            <router-link :to="`/shapes/${shape.id}/edit`" class="btn btn-accent">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                编辑图元
              </span>
            </router-link>
            <button @click="confirmDelete" class="btn btn-danger">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                删除图元
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading or not found -->
    <div v-else class="card p-8 text-center">
      <div class="flex flex-col items-center justify-center py-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">未找到图元</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          您查找的图元不存在或已被删除。
        </p>
        <router-link to="/home" class="btn btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useShapeStore } from '../stores/shapes';
import ShapePreview from '../components/shapes/ShapePreview.vue';

const route = useRoute();
const router = useRouter();
const shapeStore = useShapeStore();

const shapeId = computed(() => route.params.id);
const shape = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch shape data on mount
onMounted(async () => {
  try {
    shape.value = await shapeStore.fetchShapeById(shapeId.value);
  } catch (err) {
    error.value = '获取图元数据失败';
    console.error('Failed to fetch shape:', err);
  } finally {
    loading.value = false;
  }
});

const typeTranslations = {
  'Rectangle': '矩形',
  'Circle': '圆形',
  'Cuboid': '立方体',
  'Cylinder': '圆柱体'
};



const propertyTranslations = {
  'width': '宽度',
  'height': '高度',
  'radius': '半径',
  'depth': '深度'
};

const typeClass = computed(() => {
  if (!shape.value) return '';
  
  const classes = {
    Rectangle: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Circle: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Cuboid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Cylinder: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };
  
  return classes[shape.value.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
});

const confirmDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除"${shape.value.name}"吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    await shapeStore.deleteShape(shape.value.id);
    router.push('/');
  } catch {
    // 用户取消删除
  }
};
</script>